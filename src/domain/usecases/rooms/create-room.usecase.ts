import { CreateRoomDto } from "../../dtos/rooms/create-room.dto";
import { RoomEntity } from "../../entities/room.entity";
import { RoomRepository } from "../../repositories/room.repository";

export class CreateRoomUsecase {

  constructor(
    private readonly repository: RoomRepository
  ) {}

  execute(createRoomDto: CreateRoomDto): RoomEntity {
    return this.repository.createRoom(createRoomDto)
  }
}