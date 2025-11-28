import { RoomEntity } from "../../entities/room.entity";
import { RoomRepository } from "../../repositories/room.repository";

export class RemoveUserUsecase {

  constructor(
    private readonly repository: RoomRepository
  ){}

  execute(roomId: string, userId: string): RoomEntity {
    const room = this.repository.findRoom(roomId);
    room.removePlayer(userId);
    return room;
  }
}

    //validate if the request user is the host
