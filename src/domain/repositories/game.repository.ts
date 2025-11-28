import { GameEntity } from "../entities/game.entity";
import { PlayerEntity } from "../entities/player.entity";

export abstract class GameRepository {

  abstract createGame(roomId: string, players: PlayerEntity[]): GameEntity;
  abstract getGame(gameId: string): GameEntity;
  abstract resetGame(gameId: string): GameEntity;

}