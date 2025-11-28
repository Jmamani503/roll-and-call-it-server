import { JoinRoomDto } from "../../dtos/rooms/join-room.dto";
import { RoomEntity } from "../../entities/room.entity";
import { CustomError } from "../../errors/custorm-error";
import { RoomRepository } from "../../repositories/room.repository";

export class JoinRoomUsecase {

  constructor(
    private readonly repository: RoomRepository
  ) {}

  execute(joinRoomDto: JoinRoomDto): RoomEntity {
    const room = this.repository.findRoom(joinRoomDto.roomId)
    if(!room) throw CustomError.notFound('Room not found');
    room.addPlayer(joinRoomDto.user)
    return room
  }
}