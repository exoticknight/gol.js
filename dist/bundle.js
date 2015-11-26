/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _gol = __webpack_require__(1);

	var _gol2 = _interopRequireDefault(_gol);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

	(function (root, name, definition) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return root[name] = definition(root);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && module.exports) {
	    module.exports = definition(root);
	  } else {
	    root[name] = definition(root);
	  }
	})(window, 'GOL', function (root) {
	  return _gol2.default;
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _game = __webpack_require__(2);

	var _game2 = _interopRequireDefault(_game);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GOL = (function () {
	  function GOL() {
	    _classCallCheck(this, GOL);
	  }

	  _createClass(GOL, null, [{
	    key: 'createGame',

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
	    value: function createGame(canvas, row, col, options) {
	      var param = Object.assign({
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
	      }, options);

	      return new _game2.default(canvas, row, col, param.displayScheme, param.colorScheme, param.gps);
	    }
	  }]);

	  return GOL;
	})();

	exports.default = GOL;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _life = __webpack_require__(3);

	var _life2 = _interopRequireDefault(_life);

	var _grid = __webpack_require__(4);

	var _grid2 = _interopRequireDefault(_grid);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Game = (function () {
	  function Game(canvas, row, col, displayScheme, colorScheme, gps) {
	    _classCallCheck(this, Game);

	    this.grid = new _grid2.default(canvas, row, col, displayScheme, colorScheme);
	    this.life = new _life2.default(row, col);

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

	  _createClass(Game, [{
	    key: '_toggleCell',
	    value: function _toggleCell(px, py) {
	      var x = this.grid.getXFromPixel(px);
	      var y = this.grid.getYFromPixel(py);

	      if (x !== -1 && y !== -1 && (this._mouseState.lastX !== x || this._mouseState.lastY !== y)) {
	        this._mouseState.lastX = x;
	        this._mouseState.lastY = y;
	        if (this.life.isAlive(x, y)) {
	          this.life.killAt(x, y);
	          this.grid.drawDeadCellAt(x, y);
	        } else {
	          this.life.aliveAt(x, y);
	          this.grid.drawAliveCellAt(x, y);
	        }
	      }
	    }
	  }, {
	    key: '_onMouseDown',
	    value: function _onMouseDown(e) {
	      this._mouseState.press = true;
	      this._toggleCell(e.clientX, e.clientY);
	    }
	  }, {
	    key: '_onMouseMove',
	    value: function _onMouseMove(e) {
	      if (this._mouseState.press) {
	        this._toggleCell(e.clientX, e.clientY);
	      }
	    }
	  }, {
	    key: '_onMouseUp',
	    value: function _onMouseUp(e) {
	      this._mouseState.press = false;
	      this._mouseState.lastX = this._mouseState.lastY = -1;
	    }
	  }, {
	    key: '_setupLinsteners',
	    value: function _setupLinsteners() {
	      var _this = this;

	      this._boundMethod['_onMouseDown'] = function (e) {
	        return _this._onMouseDown(e);
	      };
	      this._boundMethod['_onMouseMove'] = function (e) {
	        return _this._onMouseMove(e);
	      };
	      this._boundMethod['_onMouseUp'] = function (e) {
	        return _this._onMouseUp(e);
	      };

	      this.grid.on('mousedown', this._boundMethod['_onMouseDown']);
	      this.grid.on('mousemove', this._boundMethod['_onMouseMove']);
	      this.grid.on('mouseup', this._boundMethod['_onMouseUp']);
	    }
	  }, {
	    key: '_teardownLinsteners',
	    value: function _teardownLinsteners() {
	      this.grid.off('mousedown', this._boundMethod['_onMouseDown']);
	      this.grid.off('mousemove', this._boundMethod['_onMouseMove']);
	      this.grid.off('mouseup', this._boundMethod['_onMouseUp']);

	      this._boundMethod = {};
	    }
	  }, {
	    key: 'init',
	    value: function init(x) {
	      this.stop();
	      this.life.init(x);
	      this.grid.init();
	      this._setupLinsteners();
	      this.enable = true;
	    }
	  }, {
	    key: 'stop',
	    value: function stop() {
	      this.running = false;
	      this.enable = false;
	      this.life.reset();
	      this.grid.claer();
	      this._teardownLinsteners();
	    }
	  }, {
	    key: 'pause',
	    value: function pause() {
	      if (this.enable) {
	        this.running = false;
	      }
	    }
	  }, {
	    key: 'resume',
	    value: function resume() {
	      if (this.enable) {
	        this.run();
	      }
	    }
	  }, {
	    key: 'step',
	    value: function step() {
	      if (this.enable) {
	        // run algorithm
	        var redrawCells = this.life.nextGeneration();
	        // redraw cells
	        this.grid.drawCells(redrawCells);
	      }
	    }
	  }, {
	    key: 'run',
	    value: function run() {
	      var _this2 = this;

	      if (this.enable && !this.running) {
	        (function () {
	          _this2.running = true;

	          var _run = function _run() {
	            if (_this2.running) {
	              _this2.step();
	              setTimeout(_run, _this2.speed);
	            }
	          };

	          setTimeout(_run, 0);
	        })();
	      }
	    }
	  }]);

	  return Game;
	})();

	exports.default = Game;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Life = (function () {
	  function Life(row, col) {
	    _classCallCheck(this, Life);

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
	     * 1  // to be alive 1, to be dead -1, 0 not change
	     */
	    this.changedState = {};
	  }

	  _createClass(Life, [{
	    key: 'init',
	    value: function init(seeds) {
	      for (var x = undefined, y = undefined, i = 0, len = seeds.length; i < len; i++) {
	        var _seeds$i = _slicedToArray(seeds[i], 2);

	        x = _seeds$i[0];
	        y = _seeds$i[1];

	        if (0 <= x && x < this.column && 0 <= y && y < this.row) {
	          this.changedState[x + ',' + y] = 1;
	        }
	      }
	    }
	  }, {
	    key: '_processLife',
	    value: function _processLife(x, y, state) {
	      var currentCellHash = x + ',' + y;
	      if (this.world[currentCellHash]) {
	        this.world[currentCellHash][0] = state ? 1 : 0;
	      } else {
	        this.world[currentCellHash] = [1, 0];
	      }

	      // update neighbours state and count alive neighbours
	      var aliveNeighBours = 0;
	      var neighbours = [
	      // left
	      [x - 1, y - 1], [x - 1, y], [x - 1, y + 1],
	      // middle
	      [x, y - 1], [x, y + 1],
	      // right
	      [x + 1, y - 1], [x + 1, y], [x + 1, y + 1]];
	      var counter = state ? +1 : -1;

	      for (var i = 0; i < 8; i++) {
	        var _neighbours$i = _slicedToArray(neighbours[i], 2);

	        var nx = _neighbours$i[0];
	        var ny = _neighbours$i[1];

	        if (0 <= nx && nx < this.column && 0 <= ny && ny < this.row) {
	          var hash = nx + ',' + ny;
	          var oldState = this.world[hash];

	          // oldState[0] alive or dead, oldState[1] count of neighbour
	          if (oldState) {
	            // cell exist before
	            oldState[1] += counter; // update count of neighbour of current neighbour

	            if (oldState[0]) {
	              aliveNeighBours++;
	            }
	          } else {
	            // new dead cell, only happens when a cell next by is alive
	            oldState = this.world[hash] = [0, 1];
	          }
	          // destiny of current neighbour
	          switch (oldState[1]) {
	            case 8:
	            case 7:
	            case 6:
	            case 5:
	            case 4:
	            case 1:
	            case 0:
	              this.changedState[hash] = -1; // if alive, then to be dead
	              break;
	            case 3:
	              this.changedState[hash] = 1; // if dead, then to be alive
	              break;
	            case 2:
	              this.changedState[hash] = 0;
	              break;
	          }
	        }
	      }

	      // destiny of current cell
	      this.world[currentCellHash][1] = aliveNeighBours;
	      switch (aliveNeighBours) {
	        case 8:
	        case 7:
	        case 6:
	        case 5:
	        case 4:
	        case 1:
	        case 0:
	          this.changedState[currentCellHash] = -1; // if alive, then to be dead
	          break;
	        case 3:
	          this.changedState[currentCellHash] = 1; // if dead, then to be alive
	          break;
	        case 2:
	          this.changedState[currentCellHash] = 0;
	          break;
	      }
	    }
	  }, {
	    key: 'aliveAt',
	    value: function aliveAt(x, y) {
	      this._processLife(x, y, true);
	    }
	  }, {
	    key: 'killAt',
	    value: function killAt(x, y) {
	      this._processLife(x, y, false);
	    }
	  }, {
	    key: 'isAlive',
	    value: function isAlive(x, y) {
	      return this.world[x + ',' + y] && this.world[x + ',' + y][0];
	    }
	  }, {
	    key: 'nextGeneration',
	    value: function nextGeneration() {
	      var state = Object.assign({}, this.changedState);
	      var changedCells = { 0: [], 1: [] };

	      // reset next state
	      this.changedState = {};
	      this.generation++;

	      // iterate current states
	      for (var key in state) {
	        var _key$split$map = key.split(',').map(function (x) {
	          return parseInt(x);
	        });

	        var _key$split$map2 = _slicedToArray(_key$split$map, 2);

	        var x = _key$split$map2[0];
	        var y = _key$split$map2[1];

	        if (state[key] === 1 && (!this.world[key] || this.world[key][0] === 0)) {
	          this.aliveAt(x, y);
	          changedCells[1].push([x, y]);
	        }if (state[key] === -1 && this.world[key][0] === 1) {
	          this.killAt(x, y);
	          changedCells[0].push([x, y]);
	        }
	      }
	      return changedCells;
	    }
	  }, {
	    key: 'reset',
	    value: function reset() {
	      this.world = {};
	      this.changedState = {};
	      this.generation = 0;
	    }
	  }]);

	  return Life;
	})();

	exports.default = Life;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _c = __webpack_require__(5);

	var _c2 = _interopRequireDefault(_c);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Grid = (function () {
	  function Grid(canvas, row, col, displayScheme, colorScheme) {
	    _classCallCheck(this, Grid);

	    this.view = canvas;
	    this.canvas = new _c2.default(canvas);

	    this.row = row;
	    this.column = col;
	    this.displayScheme = displayScheme;
	    this.colorScheme = colorScheme;
	  }

	  _createClass(Grid, [{
	    key: 'init',
	    value: function init() {
	      this.drawWorld();
	    }
	  }, {
	    key: 'on',
	    value: function on(event, handler) {
	      this.view.addEventListener(event, handler, false);
	    }
	  }, {
	    key: 'off',
	    value: function off(event, handler) {
	      this.view.removeEventListener(event, handler);
	    }
	  }, {
	    key: 'getXFromPixel',
	    value: function getXFromPixel(pixel) {
	      var d = this.displayScheme.borderWidth + this.displayScheme.cellWidth;
	      var x = ~ ~((pixel - this.canvas.left) / d);
	      return x % d <= this.displayScheme.cellWidth ? x : -1;
	    }
	  }, {
	    key: 'getYFromPixel',
	    value: function getYFromPixel(pixel) {
	      var d = this.displayScheme.borderWidth + this.displayScheme.cellWidth;
	      var y = ~ ~((pixel - this.canvas.top) / d);
	      return y % d <= this.displayScheme.cellWidth ? y : -1;
	    }
	  }, {
	    key: 'drawWorld',
	    value: function drawWorld() {
	      this.canvas.setPenColor(this.colorScheme.worldColor);
	      this.canvas.drawRect(0, 0, this.column * (this.displayScheme.borderWidth + this.displayScheme.cellWidth), this.row * (this.displayScheme.borderWidth + this.displayScheme.cellWidth));
	    }
	  }, {
	    key: 'drawCells',
	    value: function drawCells(redrawCells) {
	      // draw alive cells
	      this.canvas.setPenColor(this.colorScheme.aliveColor);
	      for (var x = undefined, y = undefined, i = 0, len = redrawCells[1].length; i < len; i++) {
	        var _redrawCells$1$i = _slicedToArray(redrawCells[1][i], 2);

	        x = _redrawCells$1$i[0];
	        y = _redrawCells$1$i[1];

	        this.drawCellAt(x, y);
	      }

	      // draw dead cells
	      this.canvas.setPenColor(this.colorScheme.deadColor);
	      for (var x = undefined, y = undefined, i = 0, len = redrawCells[0].length; i < len; i++) {
	        var _redrawCells$0$i = _slicedToArray(redrawCells[0][i], 2);

	        x = _redrawCells$0$i[0];
	        y = _redrawCells$0$i[1];

	        this.drawCellAt(x, y);
	      }
	    }
	  }, {
	    key: 'drawCellAt',
	    value: function drawCellAt(x, y) {
	      this.canvas.drawRect(x * (this.displayScheme.borderWidth + this.displayScheme.cellWidth), y * (this.displayScheme.borderWidth + this.displayScheme.cellWidth), this.displayScheme.cellWidth, this.displayScheme.cellWidth);
	    }
	  }, {
	    key: 'drawAliveCellAt',
	    value: function drawAliveCellAt(x, y) {
	      this.canvas.setPenColor(this.colorScheme.aliveColor);
	      this.drawCellAt(x, y);
	    }
	  }, {
	    key: 'drawDeadCellAt',
	    value: function drawDeadCellAt(x, y) {
	      this.canvas.setPenColor(this.colorScheme.deadColor);
	      this.drawCellAt(x, y);
	    }
	  }, {
	    key: 'claer',
	    value: function claer() {
	      this.canvas.clear();
	    }
	  }]);

	  return Grid;
	})();

	exports.default = Grid;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var C = (function () {
	  function C(ele) {
	    _classCallCheck(this, C);

	    this.cxt = ele.getContext('2d');
	    this.fillStyle = '#000000';
	    this.left = ele.getBoundingClientRect().left;
	    this.top = ele.getBoundingClientRect().top;
	  }

	  _createClass(C, [{
	    key: 'setPenColor',
	    value: function setPenColor(hex) {
	      this.cxt.fillStyle = this.fillStyle = '#' + hex;
	    }
	  }, {
	    key: 'drawRect',
	    value: function drawRect(ox, oy, width, height) {
	      this.cxt.fillRect(ox, oy, width, height);
	    }
	  }, {
	    key: 'clear',
	    value: function clear() {
	      this.cxt.clearRect(0, 0, this.cxt.canvas.width, this.cxt.canvas.height);
	    }
	  }]);

	  return C;
	})();

	exports.default = C;

/***/ }
/******/ ]);