export class CreateRoomDto {

  private constructor(
    public id: string,
    public name: string
  ) {}

  static create(object: {[key: string]: any}): [string? , CreateRoomDto?]  {
    const { id, name } = object

    return [
      undefined, 
      new CreateRoomDto(
        id, name
      )
    ]
  }
}