import GOL from './gol.js';

(function ( root, name, definition ) {
  if ( typeof define === 'function' && define.amd ) {
    define( [], function () {
        return ( root[name] = definition( root ) );
    });
  } else if ( typeof module === 'object' && module.exports ) {
    module.exports = definition( root );
  } else {
    root[name] = definition( root );
  }
})( window, 'GOL', function ( root ) {
  return GOL;
});