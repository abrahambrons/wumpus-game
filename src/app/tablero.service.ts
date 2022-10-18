import { Injectable } from '@angular/core';
import { AppComponent } from './app.component';
import { Celda } from './celda';
import { Coordenada } from './coordenada';
import { Jugador } from './jugador';
import { Tablero } from './tablero';

@Injectable({
  providedIn: 'root'
})
export class TableroService {
  tablero!: Tablero;
  constructor() { }

  crearTablero(tam_celdas:number = 5,num_pozos:number = 2): TableroService{
    let celdas:Celda[][] = [];
    for(let i = 0; i < tam_celdas; i++){
      celdas[i] = [];
      for(let j = 0; j < tam_celdas; j++){
          celdas[i][j] = new Celda({valor:'vacio',pisado:false});
      }
    }
    let tempTablero = new Tablero({celdas:celdas});
    tempTablero = this.colocarPozos(tempTablero,num_pozos,tam_celdas);
    tempTablero = this.colocarWumpus(tempTablero,1,tam_celdas);
    tempTablero = this.colocarOro(tempTablero,1,tam_celdas);
    console.log(tempTablero);
    this.tablero = tempTablero;
    return this;
  }

  colocarJugador(tablero:Tablero, cantidad_jugador:number, tam_celdas:number):Coordenada{
    let jugador_restante = cantidad_jugador - 1;
    let i = Math.floor(Math.random()*tam_celdas);
    let j = Math.floor(Math.random()*tam_celdas);
    if(tablero.celdas[i][j].isPlayer){
      return new Coordenada({i, j});
    }else{
      if(tablero.celdas[i][j].isGold || tablero.celdas[i][j].isSmelly || tablero.celdas[i][j].isWind || tablero.celdas[i][j].isWell || tablero.celdas[i][j].isWumpus){
        tablero.celdas[i][j].isPlayer = true;
      }
      return new Coordenada({i:i,j:j});
    }
  }

  colocarPozos(tablero:Tablero, cantidad_pozos:number, tam_celdas:number):Tablero{
    let pozos_restantes = cantidad_pozos - 1;
    let i = Math.floor(Math.random()*tam_celdas);
    let j = Math.floor(Math.random()*tam_celdas);

    if(tablero.celdas[i][j].isWell){
      return this.colocarPozos(tablero,pozos_restantes,tam_celdas);
    }else{
      tablero.celdas[i][j].isWell = true;
      if(i>0)
        tablero.celdas[i-1][j].isWind = tablero.celdas[i-1][j].isWell?false:true;
      if(j>0)
        tablero.celdas[i][j-1].isWind = tablero.celdas[i][j-1].isWell?false:true;
      if(i<tam_celdas-1)
        tablero.celdas[i+1][j].isWind = tablero.celdas[i+1][j].isWell?false:true;
      if(j<tam_celdas-1)
        tablero.celdas[i][j+1].isWind = tablero.celdas[i][j+1].isWell?false:true;
      return tablero;
    }
  }

  colocarWumpus(tablero:Tablero, cantidad_wumpus:number,tam_celdas:number):Tablero{
    let wumpus = cantidad_wumpus - 1;
    let i = Math.floor(Math.random()*tam_celdas);
    let j = Math.floor(Math.random()*tam_celdas);

    if(tablero.celdas[i][j].isWumpus){
      return this.colocarWumpus(tablero,wumpus,tam_celdas);
    }else{
      tablero.celdas[i][j].isWumpus = true;
      if(i>0)
        tablero.celdas[i-1][j].isSmelly = true;
      if(j>0)
        tablero.celdas[i][j-1].isSmelly = true;
      if(i<tam_celdas-1)
        tablero.celdas[i+1][j].isSmelly = true;
      if(j<tam_celdas-1)
        tablero.celdas[i][j+1].isSmelly = true;
      return tablero;
    }
  }

  colocarOro(tablero:Tablero, cantidad_oro:number,tam_celdas:number):Tablero{
    let oro = cantidad_oro - 1;
    let i = Math.floor(Math.random()*tam_celdas);
    let j = Math.floor(Math.random()*tam_celdas);

    if(tablero.celdas[i][j].isGold){
      return this.colocarOro(tablero,oro,tam_celdas);
    }else{
      tablero.celdas[i][j].isGold = true;
      return tablero;
    }
  }

  getTablero():Tablero{
    return this.tablero;
  }
}
