import { Router } from "express";
import { GameController } from "../controllers/game.controller";
import { GameSingleton } from "../../infrastrucrure/repositories/game-singleton";
import { roomRepositorySingleton } from "../../infrastrucrure/repositories/room-singleton";

export class GameRoutes {

  static get routes(): Router {
    const router = Router()
    const controller = new GameController(roomRepositorySingleton)

    router.post('/create', controller.createGame)
    // router.get('/:gameId', controller.getGame)
    router.post('/roll', controller.rollDice)
    router.post('/reroll', controller.rerollDice)
    router.post('/flip', controller.flipDice)
    router.post('/call-play', controller.callPlay)
    router.post('/restart', controller.restart)
    return router;
  }
}