import { GameEntity } from "../../entities/game.entity";
import { RoomEntity } from "../../entities/room.entity";
import { GameRepository } from "../../repositories/game.repository";
import { RoomRepository } from "../../repositories/room.repository";

export class FlipDiceUsecase {

  constructor(
    private readonly repository: RoomRepository
  ){}

  execute(roomId: string, selectedDice: number[]): RoomEntity {
    const room = this.repository.findRoom(roomId)
    room.game?.flipDice(selectedDice)
    return room;
    // const game = this.repository.getGame(gameId);
    // game.flipDice(selectedDice)
    // return game;
  }
}