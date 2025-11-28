import { Router } from "express";
import { RoomRoutes } from "./routes/room.routes";
import { GameRoutes } from "./routes/game.routes";

export class AppRoutes {

  static get routes(): Router {
    const router = Router();
    //here goes all the main routes of the app
    router.use('/api/room', RoomRoutes.routes);
    router.use('/api/game', GameRoutes.routes)

    return router;
  }
}