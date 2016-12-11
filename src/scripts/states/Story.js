import _State from './_State';
import DisplayObjects from '../display_objects';
import GameObjects from '../game_objects';

export default class Story extends _State {
  create () {
    this.background = GameObjects.grass(this.game, 0, 0, this.world.width, this.world.height);
    this.room = GameObjects.room(game, 120, 104);
    this.book = GameObjects.book(game, 152, 124);

    this.world.setBounds(0, 0, this.world.width, this.world.height);

    this.stage.disableVisibilityChange = true;

    this.add.existing(this.background);
    this.add.existing(this.room);
    this.add.existing(this.book);
    this.add.existing(this.alphabetText());
    this.add.existing(this.instructionText());
    this.add.existing(this.actionText());
  }

  alphabetText () {
    var text = DisplayObjects.bodyFont(game, `
You are a wizard who must fight against the coming night by reading from your Tome of the Sun. But a horde of vampires wants nothing more than to send the world into perpetual darkness.

Keep the sun high by defending your reading room against the vampires. Don't let the sun set!
    `, this.world.centerX, 54, 'center');
    text.maxWidth = 300;
    return text;
  }

  instructionText () {
    var text = DisplayObjects.bodyFont(game, `
Use the ARROW KEYS to move
and press SPACEBAR to attack. Good luck!
    `, this.world.centerX, 212, 'center');
    text.maxWidth = 300;
    return text;
  }

  actionText () {
    var text = DisplayObjects.bodyFont(game, `
Press ENTER to Play!
    `, this.world.centerX, 254, 'center');
    this.time.events.loop(400, () => text.visible = !text.visible);
    return text;
  }

  update () {
    if (this.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
      this.stateProvider.gameplay(this.state);
    }
  }
}
