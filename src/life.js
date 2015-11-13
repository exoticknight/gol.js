export default class Life {
  constructor ( row, col ) {
    this.row = row;
    this.column = col;

    this.generation = 0;

    /*
     * this.world = {
     *   '0,0':  // 'x,y'
     *   [
     *     1,  // alive 1, dead 0
     *     0,  // count of neighbour
     *   ]
     * }
     */
    this.world = {};
    /*
     * '0,0':  // 'x,y'
     * 1  // to be alive 1, to be dead 0
     */
    this.changedState = {};
  }

  init ( seeds ) {
    for ( let x, y, i = 0, len = seeds.length; i < len && ( [x, y] = seeds[i] ); i++ ) {
      this.changedState[x + ',' + y] = 1;
    }

    // for ( let i = 0, len = seeds.length; i < len ; i++ ) {
    //   let [x, y] = seeds[i] ;
    //   this.changedState[x + ',' + y] = 1;
    // }
  }

  _processLife ( x, y, state ) {
    let currentCellHash = x + ',' + y;
    if ( this.world[currentCellHash] ) {
      this.world[currentCellHash][0] = state ? 1 : 0;
    } else {
      this.world[currentCellHash] = [1, 0];
    }

    // update neighbours state and count alive neighbours
    let aliveNeighBours = 0;
    let neighbours = [
      // left
      [x - 1, y - 1],
      [x - 1, y],
      [x - 1, y + 1],
      // middle
      [x, y - 1],
      [x, y + 1],
      // right
      [x + 1, y - 1],
      [x + 1, y],
      [x + 1, y + 1],
    ];
    let counter = state ? +1 : -1;

    for ( let i = 0; i < 8; i++ ) {
      let [nx, ny] = neighbours[i];

      if ( 0 <= nx && nx < this.row && 0 <= ny && ny < this.column ) {
        let hash = nx + ',' + ny;
        let oldState = this.world[hash];

        // oldState[0] alive or dead, oldState[1] count of neighbour
        if ( oldState ) {  // cell exist before
          oldState[1] += counter;  // update count of neighbour of current neighbour

          if ( oldState[0] ) {
            aliveNeighBours++;
          }
        } else {  // new dead cell, only happens when a cell next by is alive
          oldState = this.world[hash] = [0, 1];
        }
        // destiny of current neighbour
        switch ( oldState[1] ) {
          case 8:
          case 7:
          case 6:
          case 5:
          case 4:
          case 1:
          case 0:
            oldState[0] && ( this.changedState[hash] = 0 );  // if alive, then to be dead
            break;
          case 3:
            !oldState[0] && ( this.changedState[hash] = 1 );  // if dead, then to be alive
            break;
          case 2:
            break;
        }
      }
    }

    // destiny of current cell
    this.world[currentCellHash][1] = aliveNeighBours;
    switch ( aliveNeighBours ) {
      case 8:
      case 7:
      case 6:
      case 5:
      case 4:
      case 1:
      case 0:
        this.world[currentCellHash][0] && ( this.changedState[currentCellHash] = 0 );  // if alive, then to be dead
        break;
      case 3:
        !this.world[currentCellHash][0] && ( this.changedState[currentCellHash] = 1 );  // if dead, then to be alive
        break;
      case 2:
        break;
    }
  }

  aliveAt ( x, y ) {
    this._processLife( x, y, true );
  }

  killAt ( x, y ) {
    this._processLife( x, y, false );
  }

  nextGeneration () {
    let state = Object.assign( {}, this.changedState );
    let changedCells = { 0: [], 1:[] };

    // reset next state
    this.changedState = {};
    this.generation++;

    // iterate current states
    for ( let key in state ) {
      let [x, y] = key.split( ',' ).map( x => parseInt( x ) );

      if ( state[key] ) {
        this.aliveAt( x, y );
        changedCells[1].push( [x, y] );
      } else {
        this.killAt( x, y );
        changedCells[0].push( [x, y] );
      }
    }
    return changedCells;
  }

  reset () {
    this.world = {};
    this.changedState = {};
    this.generation = 0;
  }
}