import { GameEntity } from "../../entities/game.entity";
import { GameRepository } from "../../repositories/game.repository";

export class GetGameUsecase {

  constructor(
    private readonly repository: GameRepository
  ) {}

  execute(gameId: string): GameEntity {
    return this.repository.getGame(gameId)
  }
}