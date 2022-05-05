export class Stock{
  id: number;
  rule: number;
  max: number;
  min: number;
  have: number;
  constructor() {
    this.id=0;
    this.rule=0;
    this.max=0;
    this.min=0;
    this.have=0;
  }
}

export class Broker{
  id: number;
  name: string;
  money: number;
  constructor() {
    this.id=0;
    this.name="";
    this.money=0;
  }
}
export class Settings{
  start: string;
  end: string;
  interval: string;
  constructor() {
    this.start="00:00";
    this.end="00:00";
    this.interval="00:00";
  }
}

