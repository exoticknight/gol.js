import C from './c.js';

export default class Grid {
  constructor ( canvas, row, col, margin, colorScheme ) {
    this.canvas = new C( canvas );

    this.row = row;
    this.column = col;
    this.margin = margin;
    this.colorScheme = colorScheme;
  }

  init () {
    this.drawWorld();
  }

  drawWorld () {
    this.canvas.setFillStyle( this.colorScheme.worldColor );
    this.canvas.drawRect( 0, 0, this.column * this.margin, this.row * this.margin );
  }

  drawCells( redrawCells ) {
    // draw alive cells
    this.canvas.setFillStyle( this.colorScheme.aliveColor );
    // for ( let x, y, i = 0, len = redrawCells[1].length; i < len && ( [x, y] = redrawCells[1][i] ); i++ ) {
    //   this.drawCellAt( x, y );
    // }
    for ( let i = 0, len = redrawCells[1].length; i < len ; i++ ) {
      let [x, y] = redrawCells[1][i];
      this.drawCellAt( x, y );
    }

    // draw dead cells
    this.canvas.setFillStyle( this.colorScheme.deadColor );
    // for ( let x, y, i = 0, len = redrawCells[0].length; i < len && ( [x, y] = redrawCells[0][i] ); i++ ) {
    //   this.drawCellAt( x, y );
    // }
    for ( let i = 0, len = redrawCells[0].length; i < len ; i++ ) {
      let [x, y] = redrawCells[0][i];
      this.drawCellAt( x, y );
    }
  }

  drawCellAt ( x, y ) {
    this.canvas.drawRect( y * this.margin, x * this.margin, this.margin, this.margin );
  }

  claer () {
    this.canvas.clear();
  }
}