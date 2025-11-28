import { ScoreCalculator } from "../logic/score-calculator";
import { DiceEntity } from "./dice.entity";
import { Phase } from "./phase.enum";
import { PlayerScoreEntity } from "./player-score.entity";
import { PlayerEntity } from "./player.entity";

export class GameEntity {
  
  public scores: PlayerScoreEntity[]
  public dice: DiceEntity[]
  public round: number
  public turn: number
  public phase: Phase
  public winner: {names: string[], score: number} | null
  public hasFinished: boolean

  constructor(
    public id: string,
    public players: PlayerEntity[],
  ) {
    this.scores = this.setPlayers()
    this.dice = this.setDice()
    this.round = 0
    this.turn = 0
    this.phase = Phase.ROLL
    this.winner = null
    this.hasFinished = false
  }

  private setPlayers(): PlayerScoreEntity[] {
    return this.players.map(
      (player) => new PlayerScoreEntity(player.id, player.name)
    )
  }

  public removePlayer(playerId: string): void {
    this.scores = this.scores.filter((score) => score.id !== playerId)
    if(this.scores.length < 2) {
      this.geWinners()
    }
  }

  private setDice(): DiceEntity[] {
    return Array.from({ length: 5 }, (_, index) => new DiceEntity(index + 1));
  }

  public rollDice(): void {
    this.dice.forEach(dice => dice.roll());
    this.phase = Phase.REROLL;
  }

  public rerollDice(index: number[]): void {
    index.forEach((index) => this.dice[index-1].roll());
    this.phase = Phase.FLIP;
  }

  public flipDice(index: number[]): void {
    index.forEach((index) => this.dice[index-1].flip());
    this.phase = Phase.CALL_IT;
  }

  public callPlay(selectedPlay: string, playerId: string): void {
    const diceValues = this.dice.map(d => d.value);
    const score = ScoreCalculator.calculate(diceValues, selectedPlay)
    const player = this.scores.find(p => p.id === playerId)
    player?.updateScore(score, selectedPlay);
    this.nextTurn();
  }

  private nextTurn(): void {
    if(this.turn < this.scores.length-1) {
      this.turn += 1;
    } else {
      this.turn = 0;
      this.round += 1;
      if(this.round > 10){
        this.geWinners();
      }
    }
    this.resetDice();
    this.phase = Phase.ROLL;
  }

  private geWinners(): void {
    const maxScore = Math.max(...this.scores.map(s => s.totalScore))
    const winnerName = this.scores
      .filter(player => player.totalScore === maxScore)
      .map(p => p.name)
    this.winner = {names: winnerName, score: maxScore}
    this.hasFinished = true;
  }

  private resetDice(): void {
    this.dice = this.setDice();
  }

  public restartGame(): void {
    this.scores.forEach(score => score.resetScore())
    this.dice = this.setDice()
    this.round = 0
    this.turn = 0
    this.phase = Phase.ROLL
    this.winner = null
    this.hasFinished = false;
  }
}