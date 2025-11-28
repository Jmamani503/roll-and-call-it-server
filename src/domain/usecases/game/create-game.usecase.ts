import { GameEntity } from "../../entities/game.entity";
import { PlayerEntity } from "../../entities/player.entity";
import { RoomEntity } from "../../entities/room.entity";
import { GameRepository } from "../../repositories/game.repository";
import { RoomRepository } from "../../repositories/room.repository";

export class CreateGameUsecase {

  constructor(
    private readonly repository: RoomRepository
  ) { }

  execute(roomId: string, players: PlayerEntity[]): RoomEntity {
    const room = this.repository.findRoom(roomId)
    room.startGame()
    return room
    
    // return this.repository.createGame(roomId, players);
  }
}