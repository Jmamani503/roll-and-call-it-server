import { Request, Response } from "express";
import { GameRepository } from "../../domain/repositories/game.repository";
import { CreateGameUsecase } from "../../domain/usecases/game/create-game.usecase";
import { SocketSingleton } from "../socket-singleton";
import { GetGameUsecase } from "../../domain/usecases/game/get-game.usecase";
import { RollDiceUsecase } from "../../domain/usecases/game/roll-dice.usecase";
import { RerollDiceUsecase } from "../../domain/usecases/game/reroll-dice.usecase";
import { FlipDiceUsecase } from "../../domain/usecases/game/flip-dice.usecase";
import { CallPlayUsecase } from "../../domain/usecases/game/call-play.usecase";
import { RestartGameUsecase } from "../../domain/usecases/game/restart-game.usecase";
import { RoomRepository } from "../../domain/repositories/room.repository";

export class GameController {

  constructor(
    private readonly roomRepository: RoomRepository
  ) {}

  createGame = (req: Request, res: Response) => {
    const { roomId, players } = req.body
    const room = new CreateGameUsecase(this.roomRepository)
      .execute(roomId, players)
    SocketSingleton.getIO().to(roomId).emit(
      'game:started', room
    )
    res.status(201).json(room)
  }

  // getGame = (req: Request, res: Response) => {
  //   const { gameId } = req.params;

  //   const game = new GetGameUsecase(this.repository).execute(gameId)

  //   res.status(200).json(game)
  // }

  rollDice = (req: Request, res: Response) => {
    const { roomId } = req.body
    const room = new RollDiceUsecase(this.roomRepository)
      .execute(roomId)
    SocketSingleton.getIO().to(room.id).emit('game:update', {game: room.game})
    res.status(200).json(room.game)
  }

  rerollDice = (req: Request, res: Response) => {
    const { gameId, selectedDice } = req.body 
    const room = new RerollDiceUsecase(this.roomRepository)
      .execute(gameId, selectedDice)
    SocketSingleton.getIO().to(room.id).emit('game:update', {game: room.game})
    res.status(200).json(room.game)
  }

  flipDice = (req: Request, res: Response) => {
    const { gameId, selectedDice } = req.body 
    const room = new FlipDiceUsecase(this.roomRepository)
      .execute(gameId, selectedDice)
    SocketSingleton.getIO().to(room.id).emit('game:update', {game: room.game})
    res.status(200).json(room.game)
  }

  callPlay = (req: Request, res: Response) => {
    const { gameId, selectedPlay, playerId } = req.body;
    const room = new CallPlayUsecase(this.roomRepository)
      .execute(gameId, selectedPlay, playerId)
    SocketSingleton.getIO().to(room.id).emit('game:update', {game: room.game})
    res.status(200).json(room.game)
  }

  restart = (req: Request, res: Response) => {
    const { gameId } = req.body
    const room = new RestartGameUsecase(this.roomRepository)
      .execute(gameId)
    SocketSingleton.getIO().to(room.id).emit('game:restarted', {game: room.game})
    res.status(200).json(room.game)
  }
}