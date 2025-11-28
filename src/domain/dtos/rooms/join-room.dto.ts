export class JoinRoomDto {

  constructor(
    public roomId: string,
    public user: {id: string, name: string},
  ) {}

  static create(object: {[key: string]: any}): [string?, JoinRoomDto?] {

    const { roomId, user } = object;
    // validar los datos de entrada

    return [
      undefined,
      new JoinRoomDto(
        roomId, user
      )
    ]

  }
}