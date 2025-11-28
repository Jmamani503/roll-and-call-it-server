import { Socket } from "socket.io";
import { roomRepositorySingleton } from "../../infrastrucrure/repositories/room-singleton";
import { SocketSingleton } from "../socket-singleton";

const socketUserMap = new Map<string, { userId: string; roomId: string }>();
const disconnectionTimeouts = new Map<string, NodeJS.Timeout>();

export const roomHandlers = (socket: Socket) => {

  socket.on("room:join", ({ roomId, userId }) => {
    socket.join(roomId); // El socket se une al "room"
    console.log(` (${socket.id}) joined room ${roomId}`);

    // Guardamos la relación socket.id → user y room
    socketUserMap.set(socket.id, { roomId, userId });

    // Si el user tenía un timeout de desconexión, lo cancelamos
    const existingTimeout = disconnectionTimeouts.get(userId);
    if (existingTimeout) {
      clearTimeout(existingTimeout);
      disconnectionTimeouts.delete(userId);
      console.log(`⏱️ Cancelled timeout for ${userId}`);
    }
  });

  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected`);

    const data = socketUserMap.get(socket.id);
    if (!data) return;

    const { roomId, userId } = data;
    console.log(`🔌 Socket ${socket.id} (${userId}) disconnected from ${roomId}`);

    const timeout = setTimeout(() => {
      console.log(`❌ User ${userId}-${socket.id}  did not reconnect in time. Removing from room ${roomId}`);

      // Aquí puedes hacer:
      // - room.removePlayer(userId)
      // - if (room.isEmpty()) delete room, etc.
      const room = roomRepositorySingleton.getRoomInfo(roomId)
      if(room) {
        roomRepositorySingleton.removePlayer(userId, roomId)
        if(room.players.length === 0) {
          SocketSingleton.getIO().emit('room:deleted' , {roomId})
        } else {
          SocketSingleton.getIO().to(roomId).emit('user:left', room)
        }
      }
      disconnectionTimeouts.delete(userId);
    }, 10000); // ⏳ 60 segundos

    disconnectionTimeouts.set(userId, timeout);
    socketUserMap.delete(socket.id);

  });
};


