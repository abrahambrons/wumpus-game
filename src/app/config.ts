export class Config {
    tablero:number=0;
    nombre:string="abraham";
    flechas:number=0;
    pozos:number=0;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

}
