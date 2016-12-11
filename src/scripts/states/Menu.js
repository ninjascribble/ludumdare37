import _State from './_State';
import DisplayObjects from '../display_objects';
import GameObjects from '../game_objects';

export default class Menu extends _State {
  create () {
    this.background = GameObjects.grass(this.game, 0, 0, this.world.width, this.world.height);
    this.room = GameObjects.room(game, 120, 104);
    this.book = GameObjects.book(game, 152, 124);

    this.world.setBounds(0, 0, this.world.width, this.world.height);

    this.stage.disableVisibilityChange = true;

    this.add.existing(this.background);
    this.add.existing(this.room);
    this.add.existing(this.book);
    this.add.existing(this.titleText());
    this.add.existing(this.alphabetText());
    this.add.existing(this.actionText());
  }

  titleText () {
    var text = DisplayObjects.displayFont(game, `
THE HOUSE OF THE RISING SUN
    `, this.world.centerX, 70, 'center');
    text.maxWidth = 300;
    return text;
  }

  alphabetText () {
    var text = DisplayObjects.bodyFont(game, ``, this.world.centerX, 145, 'center');
    text.maxWidth = 300;
    return text;
  }

  actionText () {
    var text = DisplayObjects.bodyFont(game, `
Press ENTER to Play!
    `, this.world.centerX, 200, 'center');
    this.time.events.loop(400, () => text.visible = !text.visible);
    return text;
  }

  update () {
    if (this.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
      this.stateProvider.gameplay(this.state);
    }
  }
}
