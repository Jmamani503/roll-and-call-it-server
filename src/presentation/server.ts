import express, { Application, Router } from 'express'
import http from 'http'
import cors from 'cors'
import { SocketServer } from './socket';

interface Options {
  port: number,
  routes: Router
}

export class ExpressServer {

  private readonly app: Application;
  private readonly port: number;
  private readonly routes: Router;
  private readonly server: http.Server;
  private readonly socketServer: SocketServer;

  constructor(options: Options) {
    this.app = express();
    this.port = options.port;
    this.routes = options.routes;
    this.server = http.createServer(this.app);

    this.middlewareConf();
    this.routesConf();

    this.socketServer = new SocketServer(this.server);
    this.socketServer.start();
  }

  middlewareConf() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routesConf() {
    this.app.use(this.routes);
  }

  async start() {
    this.server.listen(this.port, () => {
      console.log(`Server running on port: ${this.port}`);
    })
  }
}