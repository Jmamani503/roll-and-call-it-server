export class DiceEntity {
  public value: number
  
  constructor (
    public id: number
  ) {
    this.value = 0
  }

  public roll(): void {
    this.value = Math.floor(Math.random() * 6) + 1;
  }

  public flip(): void {
    this.value = 7 - this.value; 
  }

  public reset(): void {
    this.value = 0;
  }
}