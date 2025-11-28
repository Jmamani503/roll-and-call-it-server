import { RoomEntity } from "../../entities/room.entity";
import { RoomRepository } from "../../repositories/room.repository";

export class LeaveRoomUsecase {

  constructor (
    private readonly repository: RoomRepository
  ) {}

  execute (roomId: string, userId: string): RoomEntity {
    const room = this.repository.findRoom(roomId)
    room.removePlayer(userId)
    if(room.players.length === 0){
      this.repository.removeRoom(roomId)
    }
    return room
  }
}