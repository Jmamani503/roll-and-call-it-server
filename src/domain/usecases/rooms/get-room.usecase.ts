import { JoinRoomDto } from "../../dtos/rooms/join-room.dto";
import { RoomEntity } from "../../entities/room.entity";
import { RoomRepository } from "../../repositories/room.repository";

export class GetRoomUsecase {

  constructor(
    private readonly repository: RoomRepository
  ) {}

  execute(joinRoomDto: JoinRoomDto): RoomEntity {
    return this.repository.getRoom(joinRoomDto);
  }

}