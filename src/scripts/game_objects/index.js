import Player from './Player';
import Enemies from './Enemies';
import Alien from './Alien';

const PLAYER = 'player';
const ENEMIES = 'enemies';
const ALIEN = 'alien';

module.exports = {
  load: function load (loader) {
    loader.load.spritesheet(PLAYER, 'assets/player.png', 16, 16);
    loader.load.spritesheet(ALIEN, 'assets/alien.png', 16, 16);
  },

  player: function player (game, x, y) {
    return new Player(game, x, y, PLAYER);
  },

  enemies: function enemies (game, parent) {
    const group = new Enemies(game, parent, ENEMIES);

    group.setAlienBuilder(module.exports.alien)

    return group;
  },

  alien: function alien (game, x, y) {
    return new Alien(game, x, y, ALIEN);
  }
};
