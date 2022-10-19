export class Celda {
    isWell: boolean = false;
    isWumpus: boolean = false;
    isSmelly: boolean = false;
    isWind: boolean = false;
    isGold: boolean = false;
    isPlayer: boolean = false;
    isExit: boolean = false;
    /**
     *
     */
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

    toString():string{
        return `isWell: ${this.isWell}, isWumpus: ${this.isWumpus}, isSmelly: ${this.isSmelly}, isWind: ${this.isWind}, isGold: ${this.isGold}, isExit: ${this.isExit}`;
    }
}
