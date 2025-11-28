import { AppRoutes } from "./presentation/routes";
import { ExpressServer } from "./presentation/server";

(() => {
  main();
}) ()

async function main() {

  new ExpressServer({
    port: 3000,
    routes: AppRoutes.routes
  }).start()
}