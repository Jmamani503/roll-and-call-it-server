import { DiceEntity } from "../entities/dice.entity";
import { PlayCategory } from "../entities/play-category.enum";


export class ScoreCalculator {

  static calculate(dice: number[], selectedPlay: string): number {
    switch (selectedPlay) {
      case PlayCategory.BULLETS:
      case PlayCategory.DUMMIES:
      case PlayCategory.TRIPLETS:
      case PlayCategory.QUADS:
      case PlayCategory.FIVES:
      case PlayCategory.SIXES:
        const value = Object.values(PlayCategory).indexOf(selectedPlay) + 1;
        return dice.filter(d => d === value).reduce((a, b) => a + b, 0);

      case PlayCategory.STRAIGHT:
        const sorted = [...dice].sort();
        if (JSON.stringify(sorted) === JSON.stringify([1,2,3,4,5]) ||
            JSON.stringify(sorted) === JSON.stringify([2,3,4,5,6])) {
          return 20;
        }
        return 0;

      case PlayCategory.FULL:
        return this.isFullHouse(dice) ? 30 : 0;

      case PlayCategory.POKER:
        return this.hasNOfAKind(dice, 4) ? 40 : 0;
      case PlayCategory.GRAND_1:
      case PlayCategory.GRAND_2:
        return this.hasNOfAKind(dice, 5) ? 50 : 0;
      case PlayCategory.SKIP:
        return 0;
      default:
        return 0; //tirar error
    }
  }

  private static hasNOfAKind(dice: number[], n: number): boolean {
    const counts = this.countDice(dice);
    return Object.values(counts).some(c => c >= n);
  }

  private static isFullHouse(dice: number[]): boolean {
    const counts = Object.values(this.countDice(dice));
    return counts.includes(3) && counts.includes(2);
  }

  private static countDice(dice: number[]): Record<number, number> {
    return dice.reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);
  }
}