import Life from './life.js';
import Grid from './grid.js';

class Game {
  constructor ( canvas, row, col, displayScheme, colorScheme, gps ) {
    this.grid = new Grid( canvas, row, col, displayScheme, colorScheme );
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
      // redraw cells
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
   *
   * options: {
   *  displayScheme: {
   *    borderWidth: 1,
   *    cellWidth: 10
   *  },
   *  colorScheme: {
   *    aliveColor: '000000',
   *    deadColor: 'FFFFFF',
   *    worldColor: 'FFFFFF',
   *    borderColor: 'FFFFFF'
   *  },
   *  gps: 15  // generation per second
   * }
   */
  static createGame ( canvas, row, col, options ) {
    let param = Object.assign( {
      displayScheme: {
        borderWidth: 1,
        cellWidth: 10
      },
      colorScheme: {
        aliveColor: '000000',
        deadColor: 'FFFFFF',
        worldColor: 'FFFFFF',
        borderColor: 'FFFFFF'
      },
      gps: 15
    }, options );

    return new Game( canvas, row, col, param.displayScheme, param.colorScheme, param.gps );
  }
}