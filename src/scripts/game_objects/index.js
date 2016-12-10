import Player from './Player';

const PLAYER = 'player';

module.exports = {
  load: function load (loader) {
    loader.load.spritesheet(PLAYER, 'assets/player.png', 16, 16);
  },

  player: function player (game, x, y) {
    return new Player(game, x, y, PLAYER);
  }
};
