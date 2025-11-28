import { AppRoutes } from "./presentation/routes";
import { ExpressServer } from "./presentation/server";
import * as dotenv from 'dotenv';
dotenv.config();

(() => {
  main();
}) ()

async function main() {

  new ExpressServer({
    port: +(process.env.PORT || 3000),
    routes: AppRoutes.routes
  }).start()
}