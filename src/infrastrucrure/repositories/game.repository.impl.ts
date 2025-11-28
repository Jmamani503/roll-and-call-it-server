import { GameEntity } from "../../domain/entities/game.entity";
import { PlayerEntity } from "../../domain/entities/player.entity";
import { GameRepository } from "../../domain/repositories/game.repository";

export class GameRepositoryImpl implements GameRepository {
  
  private readonly games = new Map<string, GameEntity>();
  
  createGame(roomId: string, players: PlayerEntity[]): GameEntity {
    const newGame = new GameEntity(roomId, players)
    this.games.set(newGame.id, newGame)
    return newGame
  } 

  getGame(gameId: string): GameEntity {
    const game = this.games.get(gameId)
    if(!game) throw new Error('game not found')

    return game;
  }

  resetGame(gameId: string): GameEntity {
    throw new Error("Method not implemented.");
  }
}