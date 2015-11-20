import Life from './life.js';
import Grid from './grid.js';

export default class Game {
  constructor ( canvas, row, col, displayScheme, colorScheme, gps ) {
    this.grid = new Grid( canvas, row, col, displayScheme, colorScheme );
    this.life = new Life( row, col );

    this.speed = 1000 / gps;

    this.enable = false;
    this.running = false;

    this._mouseState = {
      press: false,
      lastX: -1,
      lastY: -1
    };

    this._boundMethod = {};
  }

  _toggleCell ( px, py ) {
    let x = this.grid.getXFromPixel( px );
    let y = this.grid.getYFromPixel( py );

    if ( x !== -1 && y !== -1  && ( this._mouseState.lastX !== x || this._mouseState.lastY !== y ) ) {
      this._mouseState.lastX = x;
      this._mouseState.lastY = y;
      if ( this.life.isAlive( x, y ) ) {
        this.life.killAt( x, y );
        this.grid.drawDeadCellAt( x, y );
      } else {
        this.life.aliveAt( x, y );
        this.grid.drawAliveCellAt( x, y );
      }
    }
  }

  _onMouseDown ( e ) {
    this._mouseState.press = true;
    this._toggleCell( e.clientX, e.clientY );
  }

  _onMouseMove ( e ) {
    if ( this._mouseState.press ) {
      this._toggleCell( e.clientX, e.clientY );
    }
  }

  _onMouseUp ( e ) {
    this._mouseState.press = false;
    this._mouseState.lastX = this._mouseState.lastY = -1;
  }

  _setupLinsteners () {
    this._boundMethod['_onMouseDown'] = e => this._onMouseDown(  e );
    this._boundMethod['_onMouseMove'] = e => this._onMouseMove( e );
    this._boundMethod['_onMouseUp'] = e => this._onMouseUp( e );

    this.grid.on( 'mousedown', this._boundMethod['_onMouseDown'] );
    this.grid.on( 'mousemove', this._boundMethod['_onMouseMove'] );
    this.grid.on( 'mouseup', this._boundMethod['_onMouseUp'] );
  }

  _teardownLinsteners () {
    this.grid.off( 'mousedown', this._boundMethod['_onMouseDown'] );
    this.grid.off( 'mousemove', this._boundMethod['_onMouseMove'] );
    this.grid.off( 'mouseup', this._boundMethod['_onMouseUp'] );
  }

  init ( x ) {
    this.stop();
    this.life.init( x );
    this.grid.init();
    this._setupLinsteners();
    this.enable = true;
  }

  stop () {
    this.running = false;
    this.enable = false;
    this.life.reset();
    this.grid.claer();
    this._teardownLinsteners();
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

      let _run = () => {
        if ( this.running ) {
          this.step();
          setTimeout( _run, this.speed );
        }
      };

      setTimeout( _run, 0 );
    }
  }
}