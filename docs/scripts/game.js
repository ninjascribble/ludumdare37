/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var _states = __webpack_require__(1);
	
	var _states2 = _interopRequireDefault(_states);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// 2x Gameboy resolution
	var width = 320;
	var height = 288;
	var renderer = Phaser.AUTO;
	var parent = 'content';
	var defaultState = null;
	var transparent = false;
	var antialias = false;
	var physicsConfig = null;
	var game = new Phaser.Game(width, height, renderer, parent, defaultState, transparent, antialias, physicsConfig);
	
	_states2.default.loading(game.state);
	
	global.game = game;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Gameplay = __webpack_require__(2);
	
	var _Gameplay2 = _interopRequireDefault(_Gameplay);
	
	var _Loading = __webpack_require__(12);
	
	var _Loading2 = _interopRequireDefault(_Loading);
	
	var _Menu = __webpack_require__(13);
	
	var _Menu2 = _interopRequireDefault(_Menu);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	module.exports = {
	  loading: function loading(stateManager) {
	    changeState(stateManager, _Loading2.default);
	  },
	
	  menu: function menu(stateManager) {
	    changeState(stateManager, _Menu2.default);
	  },
	
	  gameplay: function gameplay(stateManager) {
	    changeState(stateManager, _Gameplay2.default);
	  }
	};
	
	/**
	 * This weird little work-around is here because I wasn't able to import
	 * index.js into files in the same directory. Injecting the module via
	 * each state's constructor felt OKAY, but I'd love to understand more.
	 */
	function createState(state) {
	  return new state(module.exports);
	}
	
	function changeState(stateManager, state) {
	  if (stateManager.checkState(state.name) != true) {
	    stateManager.add(state.name, createState(state));
	  }
	  stateManager.start(state.name);
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _State3 = __webpack_require__(3);
	
	var _State4 = _interopRequireDefault(_State3);
	
	var _game_objects = __webpack_require__(4);
	
	var _game_objects2 = _interopRequireDefault(_game_objects);
	
	var _display_objects = __webpack_require__(9);
	
	var _display_objects2 = _interopRequireDefault(_display_objects);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Gameplay = function (_State2) {
	  _inherits(Gameplay, _State2);
	
	  function Gameplay() {
	    _classCallCheck(this, Gameplay);
	
	    return _possibleConstructorReturn(this, (Gameplay.__proto__ || Object.getPrototypeOf(Gameplay)).apply(this, arguments));
	  }
	
	  _createClass(Gameplay, [{
	    key: 'create',
	    value: function create() {
	      this.stage.backgroundColor = '#223344';
	      this.world.setBounds(0, 0, this.world.width, this.world.height);
	      this.player = _game_objects2.default.player(game, this.world.centerX, 60);
	      this.brick = _game_objects2.default.brick(game, this.world.centerX, 90);
	      this.solarMeter = _game_objects2.default.solarMeter(game);
	      this.enemies = _game_objects2.default.enemies(game);
	      this.enemies.setSpawnPoints([{ x: -16, y: -16 }, { x: -16, y: this.world.centerY }, { x: -16, y: this.world.height + 16 }, { x: this.world.width + 16, y: -16 }, { x: this.world.width + 16, y: this.world.centerY }, { x: this.world.width + 16, y: this.world.height + 16 }, { x: -16, y: -16 }, { x: this.world.centerX, y: -16 }, { x: this.world.with + 16, y: -16 }, { x: -16, y: this.world.height + 16 }, { x: this.world.centerX, y: this.world.height + 16 }, { x: this.world.with + 16, y: this.world.height + 16 }]);
	
	      this.add.existing(this.brick);
	      this.add.existing(this.player);
	      this.add.existing(this.enemies);
	      this.add.existing(this.solarMeter);
	
	      this.enemies.startMoveTimer();
	      this.enemies.startSpawnTimer();
	      this.solarMeter.draining();
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	      this.game.physics.arcade.overlap(this.player, this.enemies, this.onPlayerEnemyCollide);
	      this.game.physics.arcade.collide(this.enemies, this.enemies);
	      this.game.physics.arcade.collide(this.brick, this.enemies);
	
	      if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
	        this.player.moveLeft();
	      }
	
	      if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
	        this.player.moveRight();
	      }
	
	      if (this.input.keyboard.isDown(Phaser.Keyboard.UP)) {
	        this.player.moveUp();
	      }
	
	      if (this.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
	        this.player.moveDown();
	      }
	
	      if (this.player.overlap(this.brick)) {
	        this.solarMeter.charging();
	      } else {
	        this.solarMeter.draining();
	      }
	    }
	  }, {
	    key: 'onPlayerEnemyCollide',
	    value: function onPlayerEnemyCollide(player, enemy) {
	      enemy.body.velocity.x = 0;
	      enemy.body.velocity.y = 0;
	      setTimeout(function () {
	        return enemy.kill();
	      }, 100);
	    }
	  }]);
	
	  return Gameplay;
	}(_State4.default);
	
	exports.default = Gameplay;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _State = function (_Phaser$State) {
	  _inherits(_State, _Phaser$State);
	
	  function _State(stateProvider) {
	    _classCallCheck(this, _State);
	
	    var _this = _possibleConstructorReturn(this, (_State.__proto__ || Object.getPrototypeOf(_State)).call(this));
	
	    _this.stateProvider = stateProvider;
	    return _this;
	  }
	
	  return _State;
	}(Phaser.State);
	
	exports.default = _State;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Player = __webpack_require__(5);
	
	var _Player2 = _interopRequireDefault(_Player);
	
	var _Enemies = __webpack_require__(6);
	
	var _Enemies2 = _interopRequireDefault(_Enemies);
	
	var _Alien = __webpack_require__(7);
	
	var _Alien2 = _interopRequireDefault(_Alien);
	
	var _SolarMeter = __webpack_require__(8);
	
	var _SolarMeter2 = _interopRequireDefault(_SolarMeter);
	
	var _BrickSprite = __webpack_require__(11);
	
	var _BrickSprite2 = _interopRequireDefault(_BrickSprite);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	//importing the bricksprite class
	
	var PLAYER = 'player';
	var ENEMIES = 'enemies';
	var SOLAR_METER = 'solar_meter';
	var ALIEN = 'alien';
	var BRICK = 'brick';
	
	module.exports = {
	  load: function load(loader) {
	    loader.load.spritesheet(PLAYER, 'assets/player.png', 16, 16);
	    loader.load.spritesheet(ALIEN, 'assets/alien.png', 16, 16);
	    loader.load.spritesheet(BRICK, 'assets/brick.png', 16, 16);
	  },
	
	  player: function player(game, x, y) {
	    return new _Player2.default(game, x, y, PLAYER);
	  },
	
	  enemies: function enemies(game, parent) {
	    var group = new _Enemies2.default(game, parent, ENEMIES);
	
	    group.setAlienBuilder(module.exports.alien);
	
	    return group;
	  },
	
	  alien: function alien(game, x, y) {
	    return new _Alien2.default(game, x, y, ALIEN);
	  },
	
	  brick: function brickSprite(game, x, y) {
	    return new _BrickSprite2.default(game, x, y, BRICK);
	  },
	
	  solarMeter: function solarMeter(game, parent) {
	    return new _SolarMeter2.default(game, parent, SOLAR_METER);
	  }
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var MOVE_DURATION = 100;
	var UP = 'up';
	var DOWN = 'down';
	var LEFT = 'left';
	var RIGHT = 'right';
	
	var Player = function (_Phaser$Sprite) {
	  _inherits(Player, _Phaser$Sprite);
	
	  function Player(game, x, y, key) {
	    _classCallCheck(this, Player);
	
	    var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, game, x, y, key));
	
	    game.physics.enable(_this);
	
	    _this.body.drag.x = 1000;
	    _this.body.drag.y = 1000;
	
	    _this.body.onCollide = new Phaser.Signal();
	    _this.body.collideWorldBounds = true;
	
	    _this.animations.add('walkDown', [0, 1, 0, 2], 6, true);
	    _this.animations.add('walkUp', [3, 4, 3, 5], 6, true);
	    _this.animations.add('walkRight', [6, 7, 6, 8], 6, true);
	    _this.animations.add('walkLeft', [9, 10, 9, 11], 6, true);
	    return _this;
	  }
	
	  _createClass(Player, [{
	    key: 'update',
	    value: function update() {
	      if (this.body.velocity.x == 0 && this.body.velocity.y == 0) {
	        this.animations.currentAnim.restart();
	        this.animations.stop();
	      }
	    }
	  }, {
	    key: 'move',
	    value: function move(x, y, facing, animation) {
	      if (animation) {
	        this.animations.play(animation);
	      }
	
	      this.facing = facing;
	
	      switch (this.facing) {
	        case LEFT:
	          this.body.velocity.x = -160;
	          break;
	        case RIGHT:
	          this.body.velocity.x = 160;
	          break;
	        case UP:
	          this.body.velocity.y = -160;
	          break;
	        case DOWN:
	          this.body.velocity.y = 160;
	          break;
	      }
	    }
	  }, {
	    key: 'moveLeft',
	    value: function moveLeft() {
	      this.move(-16, 0, LEFT, 'walkLeft');
	    }
	  }, {
	    key: 'moveRight',
	    value: function moveRight() {
	      this.move(16, 0, RIGHT, 'walkRight');
	    }
	  }, {
	    key: 'moveUp',
	    value: function moveUp() {
	      this.move(0, -16, UP, 'walkUp');
	    }
	  }, {
	    key: 'moveDown',
	    value: function moveDown() {
	      this.move(0, 16, DOWN, 'walkDown');
	    }
	  }]);
	
	  return Player;
	}(Phaser.Sprite);
	
	exports.default = Player;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var MOVE_DELAY = 500;
	var SPAWN_DELAY = 200;
	
	var Enemies = function (_Phaser$Group) {
	  _inherits(Enemies, _Phaser$Group);
	
	  function Enemies(game, parent, name) {
	    _classCallCheck(this, Enemies);
	
	    return _possibleConstructorReturn(this, (Enemies.__proto__ || Object.getPrototypeOf(Enemies)).call(this, game, parent, name));
	  }
	
	  _createClass(Enemies, [{
	    key: "setAlienBuilder",
	    value: function setAlienBuilder(builder) {
	      this.alienBuilder = builder;
	    }
	  }, {
	    key: "setSpawnPoints",
	    value: function setSpawnPoints(spawnPoints) {
	      this.spawnPoints = spawnPoints;
	    }
	  }, {
	    key: "startMoveTimer",
	    value: function startMoveTimer() {
	      var _this2 = this;
	
	      var timer = this.game.time.create();
	
	      timer.loop(MOVE_DELAY, function () {
	        _this2.children.forEach(function (enemy) {
	          return enemy.travel();
	        });
	      }, this);
	      timer.start();
	    }
	  }, {
	    key: "startSpawnTimer",
	    value: function startSpawnTimer() {
	      var _this3 = this;
	
	      var timer = this.game.time.create();
	
	      timer.loop(SPAWN_DELAY, function () {
	        return _this3.spawnAlien();
	      }, this);
	      timer.start();
	    }
	  }, {
	    key: "spawnAlien",
	    value: function spawnAlien() {
	      var spawnPoint = this.game.rnd.pick(this.spawnPoints);
	
	      this.spawnAlienAt(spawnPoint.x, spawnPoint.y);
	    }
	  }, {
	    key: "spawnAlienAt",
	    value: function spawnAlienAt(x, y) {
	      if (this.countLiving() > 500) {
	        return;
	      }
	
	      var alien = this.getFirstDead() || this.alienBuilder(game);
	
	      alien.x = x;
	      alien.y = y;
	      alien.body.collideWorldBounds = false;
	      alien.revive();
	      this.add(alien);
	    }
	  }]);
	
	  return Enemies;
	}(Phaser.Group);
	
	exports.default = Enemies;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var MOVE_DURATION = 100;
	var UP = 'up';
	var DOWN = 'down';
	var LEFT = 'left';
	var RIGHT = 'right';
	
	var Alien = function (_Phaser$Sprite) {
	  _inherits(Alien, _Phaser$Sprite);
	
	  function Alien(game, x, y, key) {
	    _classCallCheck(this, Alien);
	
	    var _this = _possibleConstructorReturn(this, (Alien.__proto__ || Object.getPrototypeOf(Alien)).call(this, game, x, y, key));
	
	    game.physics.enable(_this);
	
	    _this.body.drag.x = 1000;
	    _this.body.drag.y = 1000;
	
	    _this.body.onCollide = new Phaser.Signal();
	    _this.body.collideWorldBounds = true;
	
	    _this.animations.add('walkDown', [0, 1, 0, 2], 6, true);
	    _this.animations.add('walkUp', [3, 4, 3, 5], 6, true);
	    _this.animations.add('walkRight', [6, 7, 6, 8], 6, true);
	    _this.animations.add('walkLeft', [9, 10, 9, 11], 6, true);
	    return _this;
	  }
	
	  _createClass(Alien, [{
	    key: 'update',
	    value: function update() {
	      if (this.body.velocity.x == 0 && this.body.velocity.y == 0) {
	        this.animations.currentAnim.restart();
	        this.animations.stop();
	      }
	    }
	  }, {
	    key: 'travel',
	    value: function travel() {
	      var dirNum = this.game.rnd.integerInRange(1, 4);
	
	      switch (dirNum) {
	        case 1:
	          this.moveLeft();
	          break;
	        case 2:
	          this.moveRight();
	          break;
	        case 3:
	          this.moveUp();
	          break;
	        case 4:
	          this.moveDown();
	          break;
	      }
	    }
	  }, {
	    key: 'move',
	    value: function move(x, y, facing, animation) {
	      if (animation) {
	        this.animations.play(animation);
	      }
	
	      this.facing = facing;
	
	      switch (this.facing) {
	        case LEFT:
	          this.body.velocity.x = -360;
	          break;
	        case RIGHT:
	          this.body.velocity.x = 360;
	          break;
	        case UP:
	          this.body.velocity.y = -360;
	          break;
	        case DOWN:
	          this.body.velocity.y = 360;
	          break;
	      }
	    }
	  }, {
	    key: 'moveLeft',
	    value: function moveLeft() {
	      this.move(-16, 0, LEFT, 'walkLeft');
	    }
	  }, {
	    key: 'moveRight',
	    value: function moveRight() {
	      this.move(16, 0, RIGHT, 'walkRight');
	    }
	  }, {
	    key: 'moveUp',
	    value: function moveUp() {
	      this.move(0, -16, UP, 'walkUp');
	    }
	  }, {
	    key: 'moveDown',
	    value: function moveDown() {
	      this.move(0, 16, DOWN, 'walkDown');
	    }
	  }]);
	
	  return Alien;
	}(Phaser.Sprite);
	
	exports.default = Alien;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _display_objects = __webpack_require__(9);
	
	var _display_objects2 = _interopRequireDefault(_display_objects);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var MAX_HEALTH = 100;
	var MIN_HEALTH = 0;
	var CHARGE_DELAY = 200;
	var DRAIN_DELAY = 500;
	var STATE_DRAINING = 'draining';
	var STATE_CHARGING = 'charging';
	
	var SolarMeter = function (_Phaser$Group) {
	  _inherits(SolarMeter, _Phaser$Group);
	
	  function SolarMeter(game, parent, name) {
	    _classCallCheck(this, SolarMeter);
	
	    var _this = _possibleConstructorReturn(this, (SolarMeter.__proto__ || Object.getPrototypeOf(SolarMeter)).call(this, game, parent, name));
	
	    _this.health = MAX_HEALTH;
	
	    _this.drainTimer = _this.game.time.create();
	    _this.drainTimer.loop(DRAIN_DELAY, function () {
	      return _this.drain();
	    }, _this);
	
	    _this.chargeTimer = _this.game.time.create();
	    _this.chargeTimer.loop(CHARGE_DELAY, function () {
	      return _this.charge();
	    }, _this);
	
	    _this.hud = _display_objects2.default.bodyFont(_this.game, _this.health, 16, 16);
	
	    _this.add(_this.hud);
	    return _this;
	  }
	
	  _createClass(SolarMeter, [{
	    key: 'draining',
	    value: function draining() {
	      if (this.state !== STATE_DRAINING) {
	        this.chargeTimer.stop(false);
	        this.drainTimer.start();
	        this.state = STATE_DRAINING;
	      }
	    }
	  }, {
	    key: 'charging',
	    value: function charging() {
	      if (this.state !== STATE_CHARGING) {
	        this.drainTimer.stop(false);
	        this.chargeTimer.start();
	        this.state = STATE_CHARGING;
	      }
	    }
	  }, {
	    key: 'drain',
	    value: function drain() {
	      if (this.health > MIN_HEALTH) {
	        this.health--;
	      }
	    }
	  }, {
	    key: 'charge',
	    value: function charge() {
	      if (this.health < MAX_HEALTH) {
	        this.health++;
	      }
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	      this.hud.text = this.health;
	    }
	  }]);
	
	  return SolarMeter;
	}(Phaser.Group);
	
	exports.default = SolarMeter;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _BitmapFont = __webpack_require__(10);
	
	var _BitmapFont2 = _interopRequireDefault(_BitmapFont);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var DISPLAY_FONT = 'Blocktopia_32pt';
	var BODY_FONT = 'Blocktopia_12pt';
	
	module.exports = {
	  load: function load(loader) {
	    loader.load.bitmapFont(DISPLAY_FONT, 'assets/Blocktopia_32pt.png', 'assets/Blocktopia_32pt.fnt');
	    loader.load.bitmapFont(BODY_FONT, 'assets/Blocktopia_12pt.png', 'assets/Blocktopia_12pt.fnt');
	  },
	
	  displayFont: function displayFont(game) {
	    var text = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	    var x = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
	    var y = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
	    var align = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'left';
	
	    return new _BitmapFont2.default(game, x, y, DISPLAY_FONT, text, 30, align);
	  },
	
	  bodyFont: function displayFont(game) {
	    var text = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	    var x = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
	    var y = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
	    var align = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'left';
	
	    return new _BitmapFont2.default(game, x, y, BODY_FONT, text, 12, align);
	  }
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var BitmapFont = function (_Phaser$BitmapText) {
	  _inherits(BitmapFont, _Phaser$BitmapText);
	
	  function BitmapFont(game, x, y, key, text, size, align) {
	    _classCallCheck(this, BitmapFont);
	
	    return _possibleConstructorReturn(this, (BitmapFont.__proto__ || Object.getPrototypeOf(BitmapFont)).call(this, game, x, y, key, text, size, align));
	  }
	
	  /**
	   * @override Phaser.BitmapText._align
	   */
	
	
	  _createClass(BitmapFont, [{
	    key: '_align',
	    set: function set(value) {
	      this.__align = value;
	      switch (value) {
	        case 'center':
	          this.anchor.x = 0.5;
	          this.anchor.y = 0.5;
	          break;
	        case 'right':
	          this.anchor.x = 1;
	          this.anchor.y = 0.5;
	          break;
	        case 'left':
	        default:
	          this.anchor.x = 0;
	          this.anchor.y = 0.5;
	          break;
	      }
	    },
	    get: function get() {
	      return this.__align;
	    }
	  }]);
	
	  return BitmapFont;
	}(Phaser.BitmapText);
	
	exports.default = BitmapFont;

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Bricksprite = function (_Phaser$Sprite) {
	  _inherits(Bricksprite, _Phaser$Sprite);
	
	  function Bricksprite(game, x, y, key) {
	    _classCallCheck(this, Bricksprite);
	
	    var _this = _possibleConstructorReturn(this, (Bricksprite.__proto__ || Object.getPrototypeOf(Bricksprite)).call(this, game, x, y, key));
	
	    game.physics.enable(_this);
	    _this.body.immovable = true;
	    return _this;
	  }
	
	  return Bricksprite;
	}(Phaser.Sprite);
	
	exports.default = Bricksprite;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _State3 = __webpack_require__(3);
	
	var _State4 = _interopRequireDefault(_State3);
	
	var _display_objects = __webpack_require__(9);
	
	var _display_objects2 = _interopRequireDefault(_display_objects);
	
	var _game_objects = __webpack_require__(4);
	
	var _game_objects2 = _interopRequireDefault(_game_objects);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Loading = function (_State2) {
	  _inherits(Loading, _State2);
	
	  function Loading() {
	    _classCallCheck(this, Loading);
	
	    return _possibleConstructorReturn(this, (Loading.__proto__ || Object.getPrototypeOf(Loading)).apply(this, arguments));
	  }
	
	  _createClass(Loading, [{
	    key: 'init',
	    value: function init() {
	      // Pixel-perfect canvas scaling!
	      // Thanks to http://www.belenalbeza.com/retro-crisp-pixel-art-in-phaser/
	      game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	      game.scale.pageAlignHorizontally = true;
	      game.scale.pageAlignVertically = true;
	
	      // Rounds x/y positions to the nearest whole to avoid sub-pixel rendering
	      game.renderer.renderSession.roundPixels = true;
	
	      // Sets browser-prefixed "image-rendering" CSS property on the game canvas
	      Phaser.Canvas.setImageRenderingCrisp(game.canvas);
	
	      // Prevent these keys from being handled by the browser
	      // when the game is in focus
	      game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);
	    }
	  }, {
	    key: 'preload',
	    value: function preload() {
	      _display_objects2.default.load(this);
	      _game_objects2.default.load(this);
	    }
	
	    // create() is automagically triggerd after preload completes
	
	  }, {
	    key: 'create',
	    value: function create() {
	      // this.stateProvider.menu(this.state);
	      this.stateProvider.gameplay(this.state);
	    }
	  }]);
	
	  return Loading;
	}(_State4.default);
	
	exports.default = Loading;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _State3 = __webpack_require__(3);
	
	var _State4 = _interopRequireDefault(_State3);
	
	var _display_objects = __webpack_require__(9);
	
	var _display_objects2 = _interopRequireDefault(_display_objects);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Menu = function (_State2) {
	  _inherits(Menu, _State2);
	
	  function Menu() {
	    _classCallCheck(this, Menu);
	
	    return _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).apply(this, arguments));
	  }
	
	  _createClass(Menu, [{
	    key: 'create',
	    value: function create() {
	      this.stage.backgroundColor = '#AACCCC';
	      this.stage.disableVisibilityChange = true;
	      this.add.existing(this.titleText());
	      this.add.existing(this.alphabetText());
	      this.add.existing(this.actionText());
	    }
	  }, {
	    key: 'titleText',
	    value: function titleText() {
	      return _display_objects2.default.displayFont(game, 'THIS IS THE MENU', this.world.centerX, 100, 'center');
	    }
	  }, {
	    key: 'alphabetText',
	    value: function alphabetText() {
	      var text = _display_objects2.default.bodyFont(game, '\nAaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz\n1,234,567,890 Ti Tj To 77 71 73 91910 .:;,\n!\u2116;%:?*()_+-=.,/|"\'@#$^&{}[]', this.world.centerX, 145, 'center');
	      text.maxWidth = 300;
	      return text;
	    }
	  }, {
	    key: 'actionText',
	    value: function actionText() {
	      var text = _display_objects2.default.bodyFont(game, 'Press Spacebar to Play!', this.world.centerX, 190, 'center');
	      this.time.events.loop(400, function () {
	        return text.visible = !text.visible;
	      });
	      return text;
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	      if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
	        this.stateProvider.gameplay(this.state);
	      }
	    }
	  }]);
	
	  return Menu;
	}(_State4.default);
	
	exports.default = Menu;

/***/ }
/******/ ]);
//# sourceMappingURL=game.js.map