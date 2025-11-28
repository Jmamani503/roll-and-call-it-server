import { CreateRoomDto } from "../dtos/rooms/create-room.dto";
import { JoinRoomDto } from "../dtos/rooms/join-room.dto";
import { PlayerEntity } from "../entities/player.entity";
import { RoomEntity } from "../entities/room.entity";

export abstract class RoomRepository {

  abstract getRooms(): RoomEntity[];
  abstract getRoom(joinRoomDto: JoinRoomDto): RoomEntity;
  abstract createRoom(createRoomDto: CreateRoomDto): RoomEntity;
  abstract joinRoom(joinRoomDto: JoinRoomDto): RoomEntity;
  abstract leaveRoom(roomId: string, userId: string): RoomEntity;
  abstract removeUser(roomId: string, userId: string): RoomEntity;
  abstract findRoom(roomId: string): RoomEntity
  abstract removeRoom(roomId: string): void
}