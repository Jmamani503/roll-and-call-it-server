import { GameEntity } from "../../entities/game.entity";
import { RoomEntity } from "../../entities/room.entity";
import { GameRepository } from "../../repositories/game.repository";
import { RoomRepository } from "../../repositories/room.repository";

export class RestartGameUsecase {

  constructor(
    private readonly repository: RoomRepository
  ){}

  execute(roomId: string): RoomEntity {
    const room = this.repository.findRoom(roomId)
    room.game?.restartGame()
    return room
    // const game = this.repository.getGame(gameId);
    // game.restartGame();
    // return game;
  }
}