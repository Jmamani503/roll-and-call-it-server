import { PlayCategory } from "./play-category.enum";
import { PlayEntity } from "./play.entity";

const createDefaultScore = (): PlayEntity[] => [
  new PlayEntity(PlayCategory.BULLETS, 0, 0),
  new PlayEntity(PlayCategory.STRAIGHT, 0, 0),
  new PlayEntity(PlayCategory.QUADS, 0, 0),
  new PlayEntity(PlayCategory.DUMMIES, 0, 0),
  new PlayEntity(PlayCategory.FULL, 0, 0),
  new PlayEntity(PlayCategory.FIVES, 0, 0),
  new PlayEntity(PlayCategory.TRIPLETS, 0, 0),
  new PlayEntity(PlayCategory.POKER, 0, 0),
  new PlayEntity(PlayCategory.SIXES, 0, 0),
  new PlayEntity(PlayCategory.GRAND_1, 0, 0), 
  new PlayEntity(PlayCategory.GRAND_2, 0, 0),
  new PlayEntity(PlayCategory.SKIP, 0, 0),
];

export class PlayerScoreEntity {

  public score: PlayEntity[]
  public totalScore: number

  constructor(
    public id: string,
    public name: string,
  ) {
    this.score = createDefaultScore()
    this.totalScore = 0
  }

  public resetScore(): void {
    this.score = createDefaultScore();
    this.totalScore = 0;
  }

  public updateScore(newScore: number, playName: string): void {
    const play = this.score.find(p => p.name === playName)
    play?.setValue(newScore);
    this.totalScore += newScore;
  }
}