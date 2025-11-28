import { CreateRoomDto } from "../../domain/dtos/rooms/create-room.dto";
import { JoinRoomDto } from "../../domain/dtos/rooms/join-room.dto";
import { PlayerEntity } from "../../domain/entities/player.entity";
import { RoomEntity } from "../../domain/entities/room.entity";
import { CustomError } from "../../domain/errors/custorm-error";
import { RoomRepository } from "../../domain/repositories/room.repository";


export class RoomRepositoryImpl implements RoomRepository {
  
  private readonly rooms: Map<string, RoomEntity> = new Map()

  getRooms(): RoomEntity[] {
    const rooms = Array.from(this.rooms.values());
    return rooms;
  }

  getRoom(joinRoomDto: JoinRoomDto): RoomEntity {
    const { roomId, user } = joinRoomDto;
    const room = this.rooms.get(roomId);
    if(!room) throw CustomError.notFound('room not found');
    const allow = room.hasPlayer(user.id)
    if(!allow) throw CustomError.forbidden('You are not part of this room')
    return room;
  }

  removePlayer(userId: string, roomId: string) {
    const room = this.rooms.get(roomId)
    if(room) {
      room.removePlayer(userId)
      if(room.players.length === 0){
        this.rooms.delete(roomId)
      }
    }
  }

  getRoomInfo(roomId: string): RoomEntity | undefined{
    const room = this.rooms.get(roomId)
    return room
  } 

  createRoom(createRoomDto: CreateRoomDto): RoomEntity {
    const { id, name } = createRoomDto;
    const newRoom = new RoomEntity(id, name)
    this.rooms.set(newRoom.id, newRoom);
    return newRoom;
  }

  joinRoom(joinRoomDto: JoinRoomDto): RoomEntity {
    const { roomId, user } = joinRoomDto;
    const room = this.rooms.get(roomId);
    if(!room) throw Error('room not found');
    if(room.players.length >= room.maxPlayers) throw Error('Max limit execeed')
    room.addPlayer(user);
    return room;
  }

  leaveRoom(roomId: string, userId: string): RoomEntity {
    const room = this.rooms.get(roomId)
    if(!room) throw Error('room not found');
    room.removePlayer(userId)
    if(room.players.length === 0){
      this.rooms.delete(roomId)
    }
    return room
  }

  removeRoom(roomId: string): void {
    this.rooms.delete(roomId)
  }


  removeUser(roomId: string, userId: string): RoomEntity {
    const room = this.rooms.get(roomId)
    if(!room) throw Error('room not found');
    room.removePlayer(userId)
    return room
  }

  findRoom(roomId: string): RoomEntity {
    const room = this.rooms.get(roomId)
    if (!room) throw CustomError.notFound('room not found');
    return room;
  }

  
}