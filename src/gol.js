import Game from './game.js';

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