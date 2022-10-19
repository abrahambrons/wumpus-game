import { Celda } from "./celda";

export class Jugador {
    starti:number = 0;
    startj:number = 0;
    posi:number = 0;
    posj:number = 0;
    rotacion:number = 0; //0arriba,1abajo,2izquierda,3derecha
    percepcion:Celda = {isWell:false, isWind:false,isWumpus:false,isGold:false,isSmelly:false,isPlayer:false};
    isWallFront:boolean = false;
    flechas:number = 0;
    percibirFlechaWumpus = false;
    isGameOver:boolean = false;
    isGoldTaken:boolean = false;
    isWon:boolean = false;
    nombre:string = "El jugador";

    constructor(values: Object = {}){
        Object.assign(this, values);
    }

    percibir():string[]{
        let log_percepcion= [];
        if(this.percepcion.isGold){
            log_percepcion.push(`${this.nombre} percibe el brillo del oro y lo agarra`);
        }
        if(this.percepcion.isSmelly){
            log_percepcion.push(`${this.nombre} percibe un olor desagradable`);
        }
        if(this.percepcion.isWind){
            log_percepcion.push(`${this.nombre} percibe una ventisca cerca`);
        }
        if(this.percepcion.isWell){
            log_percepcion.push(`${this.nombre} percibe un pozo y cae sobre el`);
            this.isGameOver = true;
        }
        if(this.percepcion.isWumpus){
            log_percepcion.push(`${this.nombre} percibe al Wumpus`);
            this.isGameOver = true;
        }
        if(this.isGoldTaken && this.starti == this.posi && this.startj && this.posj){
            log_percepcion.push(`${this.nombre} encuentra la salida y se lleva el oro consigo`);
            this.isWon = true;
        }
        return log_percepcion;
    }
}
