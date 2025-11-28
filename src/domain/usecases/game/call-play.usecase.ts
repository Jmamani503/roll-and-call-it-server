import { GameEntity } from "../../entities/game.entity";
import { RoomEntity } from "../../entities/room.entity";
import { GameRepository } from "../../repositories/game.repository";
import { RoomRepository } from "../../repositories/room.repository";

export class CallPlayUsecase {

  constructor(
    private readonly roomRepository: RoomRepository
  ){}

  execute(roomId: string, selectedPlay: string, playerId: string): RoomEntity {
    const room = this.roomRepository.findRoom(roomId);
    room.game?.callPlay(selectedPlay, playerId)
    return room
    // game.callPlay(selectedPlay, playerId)
    // return game;
  }
}