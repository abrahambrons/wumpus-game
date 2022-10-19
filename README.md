# WumpusGame

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.6.

## Instrucciones
El personaje principal es un cazador que busca un lingote de oro en un tablero de n x n celdas. El cazador puede encontrar peligros en su camino: pozos sin fondo donde si cae muere y el Wumpus, un monstruo que mata al cazador cuando coinciden en la misma celda del tablero. 
Percepciones (restringidas a la casilla que ocupa): 
2. El cazador percibe si en su casilla se encuentra el wumpus. 
3. En los cuadros adyacentes al wumpus, percibe su hedor. 
3. En los cuadros adyacentes a un pozo, percibe la brisa. 
4. Dónde está el oro percibe su brillo. 
5. Si avanza hasta un muro, percibe el choque. 
6. Cuando mata al wumpus percibe un grito. 

## Acciones que puede realizar el usuario: 
1. Avanzar. 
2. Girar 90o a izquierda o derecha. 
3. Lanzar una flecha (la flecha llega hasta el Wumpus o la pared) Salir (Si se encuentra 
en la casilla de salida) 
El cazador muere si entra en un pozo u ocupa una casilla en la que el Wumpus 
está vivo. 
Objetivo hipotético del juego: Encontrar el oro y volver a la casilla de salida lo 
más rápidamente posible.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
