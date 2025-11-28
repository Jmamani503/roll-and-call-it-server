import { PlayCategory } from "./play-category.enum";

export class PlayEntity {

  constructor(
    public name: PlayCategory,
    public value: number,
    public bonus: number,
  ) {}

  public setValue(newValue: number): void {
    this.value = newValue;
  }
}