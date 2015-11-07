import Life from './life.js';
import Grid from './grid.js';

class Game {
  constructor ( canvas, row, col, margin, colorScheme, gps ) {
    this.grid = new Grid( canvas, row, col, margin, colorScheme );
    this.life = new Life( row, col );

    this.speed = 1000 / gps;

    this.enable = false;
    this.running = false;
  }

  init ( x ) {
    this.stop();
    this.life.init( x );
    this.grid.init();
    this.enable = true;
  }

  stop () {
    this.running = false;
    this.enable = false;
    this.life.reset();
    this.grid.claer();
  }

  pause () {
    if ( this.enable ) {
      this.running = false;
    }
  }

  resume () {
    if ( this.enable ) {
      this.run();
    }
  }

  step () {
    if ( this.enable ) {
      // run algorithm
      let redrawCells = this.life.nextGeneration();

     this.grid.drawCells( redrawCells );
    }
  }

  run () {
    if ( this.enable && !this.running ) {
      this.running = true;
      this._run();
    }
  }

  _run () {
    if ( this.running ) {
      this.step();

      setTimeout( () => this._run(), this.speed );
    }
  }
}

export default class GOL {

  /*
   * create a game
   * @param {element} canvas The canvas element that is to be painted
   * @param {int} row The row of game board
   * @param {int} col The column of game board
   * @param {object} options Display options
   * @return {Game} game object
   */
  static createGame ( canvas, row, col, options ) {
    let param = Object.assign( {
      margin: 2,
      colorScheme: {
        aliveColor: '000000',
        deadColor: 'FFFFFF',
        worldColor: 'FFFFFF'
      },
      gps: 15
    }, options );

    return new Game( canvas, row, col, param.margin, param.colorScheme, param.gps );
  }
}