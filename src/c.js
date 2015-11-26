export default class C {
  constructor ( ele ) {
    this.cxt = ele.getContext( '2d' );
    this.fillStyle = '#000000';
    this.left = ele.getBoundingClientRect().left;
    this.top = ele.getBoundingClientRect().top;
  }

  setPenColor ( hex ) {
    this.cxt.fillStyle = this.fillStyle = '#' + hex;
  }

  drawRect ( ox, oy, width, height ) {
    this.cxt.fillRect( ox, oy, width, height );
  }

  clear () {
    this.cxt.clearRect( 0, 0, this.cxt.canvas.width, this.cxt.canvas.height );
  }
}