import { Request, Response } from "express";
import { RoomRepository } from "../../domain/repositories/room.repository";
import { CreateRoomDto } from "../../domain/dtos/rooms/create-room.dto";
import { CreateRoomUsecase } from "../../domain/usecases/rooms/create-room.usecase";
import { SocketSingleton } from "../socket-singleton";
import { GetRoomsUsecase } from "../../domain/usecases/rooms/get-rooms.usecase";
import { JoinRoomDto } from "../../domain/dtos/rooms/join-room.dto";
import { JoinRoomUsecase } from "../../domain/usecases/rooms/join-room.usecase";
import { GetRoomUsecase } from "../../domain/usecases/rooms/get-room.usecase";
import { LeaveRoomUsecase } from "../../domain/usecases/rooms/leave-room.usecase";
import { RemoveUserUsecase } from "../../domain/usecases/rooms/remove-user.usecase";
import { handlerError } from "../middlewares/handle-error";
import { CustomError } from "../../domain/errors/custorm-error";

export class RoomController {

  constructor(
    private readonly repository: RoomRepository
  ) { }

  getRooms = (req: Request, res: Response): void => {
    const rooms = new GetRoomsUsecase(this.repository)
      .execute();
    res.status(200).json(rooms);
  }

  getRoom = (req: Request, res: Response): void => {
    try {
      const { roomId } = req.params;
      const { id, name } = req.query;
      const user = { id, name }
      const [error, joinRoomDto] = JoinRoomDto.create({ roomId, user })
      if (error) console.log(error);
      const room = new GetRoomUsecase(this.repository).execute(joinRoomDto!)
      res.status(200).json(room)
    } catch (error) {
      handlerError(error, res)
    }
  }

  createRoom = (req: Request, res: Response): void => {
    try {
      const [error, createRoomDto] = CreateRoomDto.create(req.body);
      if (error) throw CustomError.badRequest(error)
      const room = new CreateRoomUsecase(this.repository)
        .execute(createRoomDto!)
      // SocketSingleton.getIO().emit('room:created', room)
      res.status(201).json(room);
    } catch (error) {
      handlerError(error, res)
    }
  };

  joinRoom = (req: Request, res: Response): void => {
    try {
      const { roomId } = req.body;
      const [error, joinRoomDto] = JoinRoomDto.create(req.body);
      if(error) throw CustomError.badRequest(error);
      const room = new JoinRoomUsecase(this.repository)
        .execute(joinRoomDto!)
      const newUser = room.players[room.players.length - 1]
      SocketSingleton.getIO().emit('room:userJoined', { roomId: roomId, user: newUser })
      res.status(200).json(room);
    } catch (error) {
      handlerError(error, res)
    }
  }

  leaveRoom = (req: Request, res: Response): void => {
    try {
      const { roomId } = req.params;
      const { userId } = req.body;
      if (!roomId || !userId) throw CustomError.badRequest('Invalid input')
      const room = new LeaveRoomUsecase(this.repository)
        .execute(roomId, userId);
      if (room.players.length === 0) {
        SocketSingleton.getIO().emit('room:deleted', { roomId })
      } else {
        SocketSingleton.getIO().to(roomId).emit(
          'room:player-left', room, userId
        )
      }
      res.status(204).send();
    } catch (error) {
      handlerError(error, res)
    }
  }

  removeUser = (req: Request, res: Response): void => {
    try {
      const { roomId } = req.params;
      const { userId } = req.body;
      if (!roomId || !userId) throw CustomError.badRequest('Invalid input');
      const room = new RemoveUserUsecase(this.repository).execute(roomId, userId);
      SocketSingleton.getIO().to(room.id).emit('room:player-removed', room, userId)
      res.status(200).send(room)
    } catch (error) {
      handlerError(error, res)
    }
  }
}