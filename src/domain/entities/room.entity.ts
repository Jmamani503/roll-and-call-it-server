import { CustomError } from "../errors/custorm-error";
import { GameEntity } from "./game.entity";
import { PlayerEntity } from "./player.entity";
import { RoomStatusEnum } from "./room.enum";

export class RoomEntity {
  
  public id: string;
  public status: RoomStatusEnum; 
  public players: PlayerEntity[] = [];
  public maxPlayers: number
  public host: PlayerEntity
  public game: GameEntity | null = null;
  constructor(
    public hostId: string,
    public hostName: string
  ) {
    this.id = crypto.randomUUID()
    this.status = RoomStatusEnum.LOBBY
    this.maxPlayers = 4;
    const host = {id:hostId, name:hostName}
    this.host = host;
    this.addPlayer(host)
  }

  public startGame() {
    this.game = new GameEntity(this.id, this.players)
    this.status = RoomStatusEnum.IN_GAME
  }

  public addPlayer(player: PlayerEntity) {
    if (this.players.length >= this.maxPlayers) {
      throw CustomError.badRequest("The room is full");
    }
    if (this.hasPlayer(player.id)) {
      return;
    }
    this.players = [...this.players, player]
  }

  public removePlayer(playerId: string) {
    if(this.isHost(playerId)) {
      this.players = this.players.filter((player) => player.id !== playerId)
      this.host = this.players[0]
    } else {
      this.players = this.players.filter((player) => player.id !== playerId)
    }
    this.game?.removePlayer(playerId)
  }

  public isHost(userId: string): boolean {
    return userId === this.host.id
  }

  public hasPlayer(playerId: string): boolean {
    return this.players.some((player) => player.id === playerId);
  }

  //is empty method
}