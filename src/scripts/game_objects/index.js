import Ship from './Ship';
import BrickSprite from './BrickSprite'; //importing the bricksprite class

const PLAYER_SHIP = 'ship';
const BRICK = 'brick';

module.exports = {
  load: function load (loader) {
    loader.load.spritesheet(PLAYER_SHIP, 'assets/ship.png', 6, 6);
    loader.load.spritesheet(BRICK, 'assets/brick.png', 16, 16);
  },

  player: function player (game, x, y) {
    return new Ship(game, x, y, PLAYER_SHIP);
  },
  brick: function brickSprite (game, x, y) {
    return new BrickSprite(game, x, y, BRICK);
  }
};
