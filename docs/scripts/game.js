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
	var renderer = Phaser.WEBGL;
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
	
	var _Gameover = __webpack_require__(18);
	
	var _Gameover2 = _interopRequireDefault(_Gameover);
	
	var _Loading = __webpack_require__(19);
	
	var _Loading2 = _interopRequireDefault(_Loading);
	
	var _Menu = __webpack_require__(20);
	
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
	  },
	
	  gameover: function gameover(stateManager) {
	    changeState(stateManager, _Gameover2.default);
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
	
	__webpack_require__(17);
	
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
	      var _this2 = this;
	
	      this.background = _game_objects2.default.grass(this.game, 0, 0, this.world.width, this.world.height);
	      this.sunsetFilter = game.add.filter('Sunset');
	      this.world.setBounds(0, 0, this.world.width, this.world.height);
	      this.player = _game_objects2.default.player(game, this.world.centerX, 60);
	      this.solarMeter = _game_objects2.default.solarMeter(game);
	      this.enemies = _game_objects2.default.enemies(game);
	      this.spells = _game_objects2.default.spells(game);
	      this.book = _game_objects2.default.book(game, 152, 124);
	      this.room = _game_objects2.default.room(game, 120, 104);
	      this.enemies.setTarget(this.book);
	      this.enemies.setSpawnPoints([
	      //{ x: 50, y: 50}
	      { x: -16, y: -16 }, { x: -16, y: this.world.centerY }, { x: -16, y: this.world.height + 16 }, { x: this.world.width + 16, y: -16 }, { x: this.world.width + 16, y: this.world.centerY }, { x: this.world.width + 16, y: this.world.height + 16 }, { x: -16, y: -16 }, { x: this.world.centerX, y: -16 }, { x: this.world.width + 16, y: -16 }, { x: -16, y: this.world.height + 16 }, { x: this.world.centerX, y: this.world.height + 16 }, { x: this.world.width + 16, y: this.world.height + 16 }]);
	
	      this.add.existing(this.background);
	      this.add.existing(this.room);
	      this.add.existing(this.book);
	      this.add.existing(this.enemies);
	      this.add.existing(this.player);
	      this.add.existing(this.solarMeter);
	      this.add.existing(this.spells);
	
	      this.game.world.bringToTop(this.enemies);
	      this.game.world.bringToTop(this.spells);
	      this.game.world.bringToTop(this.solarMeter);
	
	      this.enemies.startMoveTimer();
	      this.enemies.startSpawnTimer();
	      this.solarMeter.draining();
	
	      this.spacebar = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	
	      game.world.filters = [this.sunsetFilter];
	
	      this.solarMeter.onStartDraining.add(function () {
	        _this2.book.close();
	      }, this);
	
	      this.solarMeter.onStartCharging.add(function () {
	        _this2.book.open();
	      }, this);
	
	      this.enemies.onEnterTargetZone.add(function () {
	        _this2.solarMeter.health--;
	      }, this);
	
	      this.spacebar.onDown.add(function () {
	        _this2.spells.spawnSpellAt(_this2.player.x + 8, _this2.player.y + 8, _this2.player.facing);
	      }, this);
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	      this.sunsetFilter.update();
	      this.game.physics.arcade.collide(this.player, this.enemies);
	      this.game.physics.arcade.collide(this.player, this.book);
	      this.game.physics.arcade.collide(this.enemies, this.enemies);
	      this.game.physics.arcade.overlap(this.spells, this.enemies, this.onSpellEnemyCollide);
	
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
	
	      if (this.player.overlap(this.room)) {
	        this.solarMeter.charging();
	      } else {
	        this.solarMeter.draining();
	      }
	
	      if (this.solarMeter.health <= 0) {
	        this.stateProvider.gameover(this.state);
	      }
	
	      this.sunsetFilter.alpha = 1 - this.solarMeter.health / 100;
	    }
	  }, {
	    key: 'onSpellEnemyCollide',
	    value: function onSpellEnemyCollide(spell, enemy) {
	      enemy.kill();
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
	
	var _Spell = __webpack_require__(11);
	
	var _Spell2 = _interopRequireDefault(_Spell);
	
	var _Spells = __webpack_require__(12);
	
	var _Spells2 = _interopRequireDefault(_Spells);
	
	var _BrickSprite = __webpack_require__(13);
	
	var _BrickSprite2 = _interopRequireDefault(_BrickSprite);
	
	var _Room = __webpack_require__(14);
	
	var _Room2 = _interopRequireDefault(_Room);
	
	var _Book = __webpack_require__(15);
	
	var _Book2 = _interopRequireDefault(_Book);
	
	var _Grass = __webpack_require__(16);
	
	var _Grass2 = _interopRequireDefault(_Grass);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var PLAYER = 'player'; //importing the bricksprite class
	
	var ENEMIES = 'enemies';
	var SOLAR_METER = 'solar_meter';
	var ALIEN = 'alien';
	var BRICK = 'brick';
	var ROOM = 'room';
	var BOOK = 'book';
	var SPELL = 'spell';
	var SPELLS = 'spells';
	var GRASS = 'grass';
	
	module.exports = {
	  load: function load(loader) {
	    loader.load.spritesheet(PLAYER, 'player.png', 16, 16);
	    loader.load.spritesheet(ALIEN, 'alien.png', 16, 16);
	    loader.load.spritesheet(BRICK, 'brick.png', 16, 16);
	    loader.load.spritesheet(BOOK, 'book.png', 16, 16);
	    loader.load.spritesheet(ROOM, 'room.png', 80, 80);
	    loader.load.spritesheet(SPELL, 'spell.png', 16, 48);
	    loader.load.spritesheet(GRASS, 'grass.png', 320, 288);
	  },
	
	  enemies: function enemies(game, parent) {
	    var group = new _Enemies2.default(game, parent, ENEMIES);
	    group.setAlienBuilder(module.exports.alien);
	    return group;
	  },
	
	  spells: function enemies(game, parent) {
	    var group = new _Spells2.default(game, parent, SPELLS);
	    group.setSpellBuilder(module.exports.spell);
	    return group;
	  },
	
	  solarMeter: function solarMeter(game, parent) {
	    return new _SolarMeter2.default(game, parent, SOLAR_METER);
	  },
	
	  player: function player(game, x, y) {
	    return new _Player2.default(game, x, y, PLAYER);
	  },
	
	  room: function room(game, x, y) {
	    return new _Room2.default(game, x, y, ROOM);
	  },
	
	  alien: function alien(game, x, y) {
	    return new _Alien2.default(game, x, y, ALIEN);
	  },
	
	  brick: function brickSprite(game, x, y) {
	    return new _BrickSprite2.default(game, x, y, BRICK);
	  },
	
	  book: function book(game, x, y) {
	    return new _Book2.default(game, x, y, BOOK);
	  },
	
	  spell: function spell(game, x, y) {
	    return new _Spell2.default(game, x, y, SPELL);
	  },
	
	  grass: function grass(game, x, y) {
	    return new _Grass2.default(game, x, y, GRASS);
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
	
	    _this.facing = LEFT;
	
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
	
	    var _this = _possibleConstructorReturn(this, (Enemies.__proto__ || Object.getPrototypeOf(Enemies)).call(this, game, parent, name));
	
	    _this.onEnterTargetZone = new Phaser.Signal();
	    return _this;
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
	    key: "setTarget",
	    value: function setTarget(target) {
	      this.target = target;
	    }
	  }, {
	    key: "startMoveTimer",
	    value: function startMoveTimer() {
	      var _this2 = this;
	
	      var timer = this.game.time.create();
	
	      timer.loop(MOVE_DELAY, function () {
	        _this2.children.forEach(function (enemy) {
	          return enemy.determineMovement();
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
	      alien.target = this.target;
	      alien.onEnterTargetZone = this.onEnterTargetZone;
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
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
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
	
	    _this.animations.add('walkDown', [0, 1, 0, 2], 6, true);
	    _this.animations.add('walkUp', [3, 4, 3, 5], 6, true);
	    _this.animations.add('walkRight', [6, 7, 6, 8], 6, true);
	    _this.animations.add('walkLeft', [9, 10, 9, 11], 6, true);
	
	    _this.target = null;
	    _this.onEnterTargetZone = null;
	    _this.attackTimer = _this.game.time.create();
	    _this.attackTimer.loop(100, function () {
	      _this.onEnterTargetZone && _this.onEnterTargetZone.dispatch();
	    }, _this);
	    return _this;
	  }
	
	  _createClass(Alien, [{
	    key: 'update',
	    value: function update() {
	      if (this.target && this.overlap(this.target)) {
	        this.body.velocity.x = 0;
	        this.body.velocity.y = 0;
	        this.startAttacking();
	      } else {
	        this.stopAttacking();
	      }
	    }
	  }, {
	    key: 'startAttacking',
	    value: function startAttacking() {
	      if (!this.attackTimer.running) {
	        this.attackTimer.start();
	      }
	    }
	  }, {
	    key: 'stopAttacking',
	    value: function stopAttacking() {
	      if (this.attackTimer.running) {
	        this.attackTimer.stop(false);
	      }
	    }
	  }, {
	    key: 'kill',
	    value: function kill() {
	      this.stopAttacking();
	      _get(Alien.prototype.__proto__ || Object.getPrototypeOf(Alien.prototype), 'kill', this).call(this);
	    }
	  }, {
	    key: 'determineMovement',
	    value: function determineMovement() {
	      var randNum = this.game.rnd.integerInRange(1, 100);
	      var xDiff = 160 - this.x;
	      var yDiff = 144 - this.y;
	
	      //If the enemy isn't next to the book then procede with movement
	      if (Math.abs(xDiff) > 16 && Math.abs(yDiff) > 16) {
	        if (randNum > 40) {
	          this.moveToBook(xDiff, yDiff);
	        } else {
	          this.travel();
	        }
	      }
	    }
	
	    //Move the enemy in a random direction.
	
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
	
	    //Move the enemy towards the book.
	
	  }, {
	    key: 'moveToBook',
	    value: function moveToBook(xDiff, yDiff) {
	      if (xDiff > 0) {
	        this.moveRight();
	      } else {
	        this.moveLeft();
	      }
	
	      if (yDiff > 0) {
	        this.moveDown();
	      } else {
	        this.moveUp();
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
	
	    _this.onStartDraining = new Phaser.Signal();
	    _this.onStartCharging = new Phaser.Signal();
	
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
	        this.onStartDraining.dispatch();
	      }
	    }
	  }, {
	    key: 'charging',
	    value: function charging() {
	      if (this.state !== STATE_CHARGING) {
	        this.drainTimer.stop(false);
	        this.chargeTimer.start();
	        this.state = STATE_CHARGING;
	        this.onStartCharging.dispatch();
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
	    loader.load.bitmapFont(DISPLAY_FONT, 'Blocktopia_32pt.png', 'Blocktopia_32pt.fnt');
	    loader.load.bitmapFont(BODY_FONT, 'Blocktopia_12pt.png', 'Blocktopia_12pt.fnt');
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

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var UP = 'up';
	var DOWN = 'down';
	var LEFT = 'left';
	var RIGHT = 'right';
	
	var Spell = function (_Phaser$Sprite) {
	  _inherits(Spell, _Phaser$Sprite);
	
	  function Spell(game, x, y, name) {
	    _classCallCheck(this, Spell);
	
	    var _this = _possibleConstructorReturn(this, (Spell.__proto__ || Object.getPrototypeOf(Spell)).call(this, game, x, y, name));
	
	    game.physics.enable(_this);
	
	    _this.anchor.x = 0;
	    _this.anchor.y = .5;
	    _this.animations.add('cast', [1, 2, 3], 12, false);
	    return _this;
	  }
	
	  _createClass(Spell, [{
	    key: 'cast',
	    value: function cast(facing) {
	      this.animations.play('cast');
	
	      switch (facing) {
	        case LEFT:
	          this.angle = 180;
	          this.body.velocity.x = -200;
	          this.body.velocity.y = 0;
	          break;
	        case RIGHT:
	          this.angle = 0;
	          this.body.velocity.x = 200;
	          this.body.velocity.y = 0;
	          break;
	        case UP:
	          this.angle = 270;
	          this.body.velocity.x = 0;
	          this.body.velocity.y = -200;
	          break;
	        case DOWN:
	          this.angle = 90;
	          this.body.velocity.x = 0;
	          this.body.velocity.y = 200;
	          break;
	      }
	
	      setTimeout(this.kill.bind(this), 250);
	    }
	  }]);
	
	  return Spell;
	}(Phaser.Sprite);
	
	exports.default = Spell;

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Spells = function (_Phaser$Group) {
	  _inherits(Spells, _Phaser$Group);
	
	  function Spells(game, parent, name) {
	    _classCallCheck(this, Spells);
	
	    return _possibleConstructorReturn(this, (Spells.__proto__ || Object.getPrototypeOf(Spells)).call(this, game, parent, name));
	  }
	
	  _createClass(Spells, [{
	    key: "setSpellBuilder",
	    value: function setSpellBuilder(builder) {
	      this.spellBuilder = builder;
	    }
	  }, {
	    key: "spawnSpellAt",
	    value: function spawnSpellAt(x, y, facing) {
	      if (this.countLiving() > 500) {
	        return;
	      }
	
	      var spawn = this.getFirstDead() || this.spellBuilder(game);
	
	      spawn.x = x;
	      spawn.y = y;
	      spawn.revive();
	      spawn.cast(facing);
	      this.add(spawn);
	    }
	  }]);
	
	  return Spells;
	}(Phaser.Group);
	
	exports.default = Spells;

/***/ },
/* 13 */
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
/* 14 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Room = function (_Phaser$Sprite) {
	  _inherits(Room, _Phaser$Sprite);
	
	  function Room(game, x, y, name) {
	    _classCallCheck(this, Room);
	
	    return _possibleConstructorReturn(this, (Room.__proto__ || Object.getPrototypeOf(Room)).call(this, game, x, y, name));
	  }
	
	  return Room;
	}(Phaser.Sprite);
	
	exports.default = Room;

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Book = function (_Phaser$Sprite) {
	  _inherits(Book, _Phaser$Sprite);
	
	  function Book(game, x, y, key) {
	    _classCallCheck(this, Book);
	
	    var _this = _possibleConstructorReturn(this, (Book.__proto__ || Object.getPrototypeOf(Book)).call(this, game, x, y, key));
	
	    game.physics.enable(_this);
	    _this.body.immovable = true;
	    _this.body.height = 2;
	    _this.animations.add('open', [0, 1, 2, 3], 12, false);
	    _this.animations.add('close', [4, 5, 6, 7], 12, false);
	    return _this;
	  }
	
	  _createClass(Book, [{
	    key: 'open',
	    value: function open() {
	      this.animations.play('open');
	    }
	  }, {
	    key: 'close',
	    value: function close() {
	      this.animations.play('close');
	    }
	  }]);
	
	  return Book;
	}(Phaser.Sprite);
	
	exports.default = Book;

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Grass = function (_Phaser$Sprite) {
	  _inherits(Grass, _Phaser$Sprite);
	
	  function Grass(game, x, y, key) {
	    _classCallCheck(this, Grass);
	
	    return _possibleConstructorReturn(this, (Grass.__proto__ || Object.getPrototypeOf(Grass)).call(this, game, x, y, key));
	  }
	
	  return Grass;
	}(Phaser.Sprite);
	
	exports.default = Grass;

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";
	
	Phaser.Filter.Sunset = function (game) {
	
	    Phaser.Filter.call(this, game);
	
	    this.uniforms.alpha = { type: '1f', value: 0.5 };
	
	    this.fragmentSrc = ["precision mediump float;", "varying vec2       vTextureCoord;", "varying vec4       vColor;", "uniform sampler2D  uSampler;", "uniform float      alpha;", "void main(void) {", "gl_FragColor = texture2D(uSampler, vTextureCoord);", "float r = 0.5126 * gl_FragColor.r;", "float g = 0.2152 * gl_FragColor.g;", "float b = 0.7722 * gl_FragColor.b;", "vec3 color = vec3(r, g, b);", "gl_FragColor.rgb = mix(gl_FragColor.rgb, color, alpha);", "}"];
	};
	
	Phaser.Filter.Sunset.prototype = Object.create(Phaser.Filter.prototype);
	Phaser.Filter.Sunset.prototype.constructor = Phaser.Filter.Sunset;
	
	/**
	* The strength of the alpha. 1 will make the object black and white, 0 will make the object its normal color
	* @property alpha
	*/
	Object.defineProperty(Phaser.Filter.Sunset.prototype, 'alpha', {
	
	    get: function get() {
	        return this.uniforms.alpha.value;
	    },
	
	    set: function set(value) {
	        this.uniforms.alpha.value = value;
	    }
	});

/***/ },
/* 18 */
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
	
	var Gameover = function (_State2) {
	  _inherits(Gameover, _State2);
	
	  function Gameover() {
	    _classCallCheck(this, Gameover);
	
	    return _possibleConstructorReturn(this, (Gameover.__proto__ || Object.getPrototypeOf(Gameover)).apply(this, arguments));
	  }
	
	  _createClass(Gameover, [{
	    key: 'create',
	    value: function create() {
	      // this.stage.backgroundColor = '#AACCCC';
	      this.stage.disableVisibilityChange = true;
	      this.add.existing(this.titleText());
	      this.add.existing(this.actionText());
	    }
	  }, {
	    key: 'titleText',
	    value: function titleText() {
	      return _display_objects2.default.displayFont(game, 'Game Over', this.world.centerX, 100, 'center');
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
	
	  return Gameover;
	}(_State4.default);
	
	exports.default = Gameover;

/***/ },
/* 19 */
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
	      this.stateProvider.menu(this.state);
	    }
	  }]);
	
	  return Loading;
	}(_State4.default);
	
	exports.default = Loading;

/***/ },
/* 20 */
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
	
	var Menu = function (_State2) {
	  _inherits(Menu, _State2);
	
	  function Menu() {
	    _classCallCheck(this, Menu);
	
	    return _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).apply(this, arguments));
	  }
	
	  _createClass(Menu, [{
	    key: 'create',
	    value: function create() {
	      this.background = _game_objects2.default.grass(this.game, 0, 0, this.world.width, this.world.height);
	      this.room = _game_objects2.default.room(game, 120, 104);
	      this.book = _game_objects2.default.book(game, 152, 124);
	
	      this.world.setBounds(0, 0, this.world.width, this.world.height);
	
	      this.stage.disableVisibilityChange = true;
	
	      this.add.existing(this.background);
	      this.add.existing(this.room);
	      this.add.existing(this.book);
	      this.add.existing(this.titleText());
	      this.add.existing(this.alphabetText());
	      this.add.existing(this.actionText());
	    }
	  }, {
	    key: 'titleText',
	    value: function titleText() {
	      var text = _display_objects2.default.displayFont(game, '\nTHE HOUSE OF THE RISING SUN\n    ', this.world.centerX, 70, 'center');
	      text.maxWidth = 300;
	      return text;
	    }
	  }, {
	    key: 'alphabetText',
	    value: function alphabetText() {
	      var text = _display_objects2.default.bodyFont(game, '', this.world.centerX, 145, 'center');
	      text.maxWidth = 300;
	      return text;
	    }
	  }, {
	    key: 'actionText',
	    value: function actionText() {
	      var text = _display_objects2.default.bodyFont(game, '\nPress ENTER to Play!\n    ', this.world.centerX, 200, 'center');
	      this.time.events.loop(400, function () {
	        return text.visible = !text.visible;
	      });
	      return text;
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	      if (this.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
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