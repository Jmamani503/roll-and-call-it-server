import { Server as SocketIOServer } from 'socket.io';

export class SocketSingleton {
  public static io: SocketIOServer;

  public static setIO(io: SocketIOServer) {
    this.io = io;
  }

  public static getIO(): SocketIOServer {
    if (!this.io) throw new Error('Socket.IO has not been initialized yet');
    return this.io;
  }
}