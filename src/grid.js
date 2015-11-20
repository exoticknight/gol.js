import C from './c.js';

export default class Grid {
  constructor ( canvas, row, col, displayScheme, colorScheme ) {
    this.view = canvas;
    this.canvas = new C( canvas );

    this.row = row;
    this.column = col;
    this.displayScheme = displayScheme;
    this.colorScheme = colorScheme;
  }

  init () {
    this.drawWorld();
  }

  on ( event, handler ) {
    this.view.addEventListener( event, handler, false );
  }

  off ( event, handler ) {
    this.view.removeEventListener( event, handler );
  }

  getXFromPixel ( pixel ) {
    let d = this.displayScheme.borderWidth + this.displayScheme.cellWidth;
    let x = ~~( ( pixel - this.canvas.left ) / d );
    return x % d <= this.displayScheme.cellWidth ? x : -1;
  }

  getYFromPixel ( pixel ) {
    let d = this.displayScheme.borderWidth + this.displayScheme.cellWidth;
    let y = ~~( ( pixel - this.canvas.top ) / d );
    return y % d <= this.displayScheme.cellWidth ? y : -1;
  }

  drawWorld () {
    this.canvas.setPenColor( this.colorScheme.worldColor );
    this.canvas.drawRect( 0, 0,
      this.column * ( this.displayScheme.borderWidth + this.displayScheme.cellWidth ),
      this.row * ( this.displayScheme.borderWidth + this.displayScheme.cellWidth ) );
  }

  drawCells( redrawCells ) {
    // draw alive cells
    this.canvas.setPenColor( this.colorScheme.aliveColor );
    for ( let x, y, i = 0, len = redrawCells[1].length; i < len; i++ ) {
      [x, y] = redrawCells[1][i];
      this.drawCellAt( x, y );
    }

    // draw dead cells
    this.canvas.setPenColor( this.colorScheme.deadColor );
    for ( let x, y, i = 0, len = redrawCells[0].length; i < len; i++ ) {
      [x, y] = redrawCells[0][i];
      this.drawCellAt( x, y );
    }
  }

  drawCellAt ( x, y ) {
    this.canvas.drawRect(
      x * ( this.displayScheme.borderWidth + this.displayScheme.cellWidth ),
      y * ( this.displayScheme.borderWidth + this.displayScheme.cellWidth ),
      this.displayScheme.cellWidth,
      this.displayScheme.cellWidth );
  }

  drawAliveCellAt( x, y ) {
    this.canvas.setPenColor( this.colorScheme.aliveColor );
    this.drawCellAt( x, y );
  }

  drawDeadCellAt( x, y ) {
    this.canvas.setPenColor( this.colorScheme.deadColor );
    this.drawCellAt( x, y );
  }

  claer () {
    this.canvas.clear();
  }
}