import Player from './Player';
import Enemies from './Enemies';
import Alien from './Alien';
import BrickSprite from './BrickSprite'; //importing the bricksprite class
import Bricks from './Bricks';



const PLAYER = 'player';
const ENEMIES = 'enemies';
const ALIEN = 'alien';
const BRICK = 'brick';
const BRICKS = 'bricks';

module.exports = {
  load: function load (loader) {
    loader.load.spritesheet(PLAYER, 'assets/player.png', 16, 16);
    loader.load.spritesheet(ALIEN, 'assets/alien.png', 16, 16);
    loader.load.spritesheet(BRICK, 'assets/brick.png', 16, 16);
  },

  player: function player (game, x, y) {
    return new Player(game, x, y, PLAYER);
  },

  bricks: function bricks(game, parent){
    const group = new Bricks(game, parent, BRICKS);
    group.setBrickBuilder(module.exports.brick);

    return group;
  },

  enemies: function enemies (game, parent) {
    const group = new Enemies(game, parent, ENEMIES);

    group.setAlienBuilder(module.exports.alien)

    return group;
  },

  alien: function alien (game, x, y) {
    return new Alien(game, x, y, ALIEN);
  },

  brick: function brickSprite (game, x, y) {
    return new BrickSprite(game, x, y, BRICK);
  }
};
