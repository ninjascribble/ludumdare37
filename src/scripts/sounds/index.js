const SPELL = 'spell';

module.exports = {
  load: function load (loader) {
    loader.load.audio(SPELL, 'spell.wav', true);
  },

  spell: function spell (player) {
    player.play(SPELL);
  }
};
