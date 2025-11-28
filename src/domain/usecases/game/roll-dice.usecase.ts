import { GameEntity } from "../../entities/game.entity";
import { RoomEntity } from "../../entities/room.entity";
import { GameRepository } from "../../repositories/game.repository";
import { RoomRepository } from "../../repositories/room.repository";

export class RollDiceUsecase {

  constructor(
    private readonly repository: RoomRepository
  ){}

  execute(roomId: string): RoomEntity {

    const room = this.repository.findRoom(roomId)
    room.game?.rollDice()
    return room

    // const game = this.repository.getGame(gameId);
    // game.rollDice();
    // return game;
  }
}