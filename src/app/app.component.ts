import { Component, Input, SimpleChange, SimpleChanges } from '@angular/core';
import { TableroService } from './tablero.service';
import { Tablero } from './tablero';
import { Jugador } from './jugador';
import { Config } from './config';
import { Coordenada } from './coordenada';

@Component({
  selector: 'app-child',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TableroService]
})
export class AppComponent {
  title = 'wumpus-game';
  personaje!: Jugador;
  tam_tablero:number = 5;
  @Input() incoming_data!: Config;
  adventure_log:string[]=[];

  

  constructor(
    private tableroService: TableroService
  ){
    
  }

  ngOnChanges(changes: SimpleChanges){
    this.crearTablero(this.incoming_data.tablero,this.incoming_data.pozos);
    let coordenada:Coordenada = this.tableroService.colocarJugador(this.tableroService.getTablero(),1,this.incoming_data.tablero);
    this.personaje = new Jugador({posi:coordenada.i,posj:coordenada.j,rotacion:0,flechas:this.incoming_data.flechas});
    this.adventure_log.push(`Coordenadas Jugador: ${this.personaje.posi} y ${this.personaje.posj}`);
    this.percibir();
  }

  crearTablero(tam:number, pozos:number):AppComponent{
    this.tableroService.crearTablero(tam,pozos);
    this.adventure_log.push("Se ha creado el tablero");
    this.adventure_log.push(`Config: ${tam} DIMENSION y ${pozos} CANTIDAD_POZOS`);
    return this;
  }

  get tablero():Tablero{
    return this.tableroService.getTablero();
  }

  percibir(){
    console.log(this.incoming_data);
    this.personaje.percepcion = this.tableroService.getTablero().celdas[this.personaje.posi][this.personaje.posj];
    
    this.personaje.isWallFront = false;
    if(this.personaje.rotacion == 0){
      if(this.personaje.posi - 1 < 0)
        this.personaje.isWallFront = true;
    }
    if(this.personaje.rotacion == 1){
      if(this.personaje.posi + 1 >= this.tam_tablero)
        this.personaje.isWallFront = true;
    }
    if(this.personaje.rotacion == 2){
      if(this.personaje.posj - 1 < 0)
        this.personaje.isWallFront = true;
    }
    if(this.personaje.rotacion == 3){
      if(this.personaje.posj + 1 >= this.tam_tablero)
        this.personaje.isWallFront = true;
    }
    if(this.personaje.percibirFlechaWumpus){
      this.personaje.percibirFlechaWumpus = false;
      this.adventure_log.push(`El personaje percibe el grito del Wumpus luego de disparar su flecha`);
    }
    
    this.adventure_log = this.adventure_log.concat(this.personaje.percibir());
    this.adventure_log.push(this.personaje.isWallFront?`El personaje percibe una pared adelante`:`El camino continua adelante`);
    if(this.personaje.isGameOver){
      this.adventure_log.push(`Fin del juego`);
    }
    return;
  }

  moverAdelante(e:any):boolean{
    if(this.personaje.isWallFront){
      this.adventure_log.push(`El jugador no se puede mover mas adelante, una pared bloquea su camino`);
      return false;
    }
    if(this.personaje.rotacion == 0){
      this.personaje.posi -= 1
    }
    else if(this.personaje.rotacion == 1){
      this.personaje.posi += 1
    }
    else if(this.personaje.rotacion == 2){
      this.personaje.posj -= 1
    }
    else if(this.personaje.rotacion == 3){
      this.personaje.posj += 1
    }
    this.adventure_log.push(`El personaje se mueve hacia adelante`);
    this.percibir();
    return true;
  }

  girarIzquierda(e:any):AppComponent{
    if(this.personaje.rotacion == 0){
      this.personaje.rotacion = 2
    }
    else if(this.personaje.rotacion == 1){
      this.personaje.rotacion = 3
    }
    else if(this.personaje.rotacion == 2){
      this.personaje.rotacion = 1
    }
    else if(this.personaje.rotacion == 3){
      this.personaje.rotacion = 0
    }
    this.adventure_log.push(`El personaje gira a su izquierda`);
    this.percibir();
    return this;
  }

  girarDerecha(e:any):AppComponent{
    if(this.personaje.rotacion == 0){
      this.personaje.rotacion = 3
    }
    else if(this.personaje.rotacion == 1){
      this.personaje.rotacion = 2
    }
    else if(this.personaje.rotacion == 2){
      this.personaje.rotacion = 0
    }
    else if(this.personaje.rotacion == 3){
      this.personaje.rotacion = 1
    }
    this.adventure_log.push(`El personaje gira a su derecha`);
    this.percibir();
    return this;
  }

  dispararFlecha(e:any):AppComponent{
    if(this.personaje.flechas == 0){
      this.adventure_log.push(`El personaje no tiene mas flechas`);
      return this;
    }
    this.personaje.flechas--;
    if(this.personaje.isWallFront){
      this.personaje.percibirFlechaWumpus = false;
      this.adventure_log.push(`El personaje oye la flecha golpear contra una pared`);
      return this;
    }
      
    if(this.personaje.rotacion == 0){
      for(let i = this.tam_tablero-1; i > 0;i--){
        if(this.tablero.celdas[i][this.personaje.posj].isWumpus){
          this.personaje.percibirFlechaWumpus = true;
        }
      }
    }
    else if(this.personaje.rotacion == 1){
      for(let i = 0; i < this.tam_tablero-1;i++){
        if(this.tablero.celdas[i][this.personaje.posj].isWumpus){
          this.personaje.percibirFlechaWumpus = true;
        }
      }
    }
    else if(this.personaje.rotacion == 2){
      for(let i = this.tam_tablero-1; i > 0;i--){
        if(this.tablero.celdas[this.personaje.posi][i].isWumpus){
          this.personaje.percibirFlechaWumpus = true;
        }
      }
    }
    else if(this.personaje.rotacion == 3){
      for(let i = 0; i < this.tam_tablero-1;i++){
        if(this.tablero.celdas[this.personaje.posi][i].isWumpus){
          this.personaje.percibirFlechaWumpus = true;
        }
      }
    }
    if(!this.personaje.percibirFlechaWumpus)
      this.adventure_log.push(`El personaje oye la flecha golpear contra una pared`);
    return this;
  }
}
