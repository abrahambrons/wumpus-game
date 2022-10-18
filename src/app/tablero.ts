import { Celda } from "./celda";

export class Tablero {
    celdas: Celda[][] = [];

    constructor(values: Object = {}){
        Object.assign(this, values);
    }
}
