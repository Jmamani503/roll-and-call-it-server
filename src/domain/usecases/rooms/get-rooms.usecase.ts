import { RoomEntity } from "../../entities/room.entity";
import { RoomRepository } from "../../repositories/room.repository";

export class GetRoomsUsecase {
  
  constructor(
    private readonly repository: RoomRepository
  ) {}

  execute(): RoomEntity[] {
    return this.repository.getRooms();
  }
}