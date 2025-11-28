import { Router } from "express";
import { RoomController } from "../controllers/room.controller";
import { RoomRepositoryImpl } from "../../infrastrucrure/repositories/room.repository.impl";
import { roomRepositorySingleton } from "../../infrastrucrure/repositories/room-singleton";

export class RoomRoutes {

  static get routes(): Router {
    const controller = new RoomController(roomRepositorySingleton);
    const router = Router();
    router.get('/', controller.getRooms)
    router.get('/:roomId', controller.getRoom)
    router.post('/create', controller.createRoom)
    router.post('/join', controller.joinRoom)
    router.post('/leave/:roomId', controller.leaveRoom)
    router.post('/:roomId/remove', controller.removeUser)

    return router;
  }
}