import _State from './_State';
import DisplayObjects from '../display_objects';

export default class Gameover extends _State {
  create () {
    // this.stage.backgroundColor = '#AACCCC';
    this.stage.disableVisibilityChange = true;
    this.add.existing(this.titleText());
    this.add.existing(this.actionText());
  }

  titleText () {
    return DisplayObjects.displayFont(game, 'Game Over', this.world.centerX, 100, 'center');
  }

  actionText () {
    var text = DisplayObjects.bodyFont(game, 'Press Spacebar to Play!', this.world.centerX, 190, 'center');
    this.time.events.loop(400, () => text.visible = !text.visible);
    return text;
  }

  update () {
    if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      this.stateProvider.gameplay(this.state);
    }
  }
}
