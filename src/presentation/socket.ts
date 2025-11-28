import { Socket, Server as SocketIOServer } from 'socket.io'
import { Server as HttpServer } from 'http'
import { SocketSingleton } from './socket-singleton';
import { roomHandlers } from './socket/room.handler';
export class SocketServer {

  private readonly io: SocketIOServer;
  
  constructor(server: HttpServer) {
    this.io = new SocketIOServer(server, {
      cors: {
        origin: '*'
      }
    })
    SocketSingleton.setIO(this.io);
  }

  public start(){
    console.log('socket has initialized')

    this.io.on('connection', (socket: Socket) => { 
      console.log(`user connecter: ${socket.id}`)
      //initialize the handlers
      roomHandlers(socket)

    })
  }

  public getIO(): SocketIOServer {
    return this.io;
  }
}