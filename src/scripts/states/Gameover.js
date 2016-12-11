import _State from './_State';
import DisplayObjects from '../display_objects';
import GameObjects from '../game_objects';
import '../filters/Sunset';

export default class Gameover extends _State {
  create () {
    this.background = GameObjects.grass(this.game, 0, 0, this.world.width, this.world.height);
    this.sunsetFilter = game.add.filter('Sunset');
    this.room = GameObjects.room(game, 120, 104);
    this.book = GameObjects.book(game, 152, 124);
    this.solarMeter = GameObjects.solarMeter(game);

    this.world.setBounds(0, 0, this.world.width, this.world.height);

    this.stage.disableVisibilityChange = true;

    this.add.existing(this.background);
    this.add.existing(this.room);
    this.add.existing(this.book);
    this.add.existing(this.titleText());
    this.add.existing(this.actionText());
    this.add.existing(this.solarMeter);

    this.game.world.bringToTop(this.solarMeter);

    game.world.filters = [this.sunsetFilter];
    this.sunsetFilter.alpha = 1;
    this.sunsetFilter.update();

    this.solarMeter.health = 0;
    this.solarMeter.kills = this.game.scores.enemiesKilled;
    this.solarMeter.time = this.game.scores.timeElapsed;
    this.solarMeter.wave = this.game.scores.waves;
    this.solarMeter.update();
  }

  titleText () {
    return DisplayObjects.displayFont(game, 'Game Over', this.world.centerX, 80, 'center');
  }

  actionText () {
    var text = DisplayObjects.bodyFont(game, 'Press ENTER to Play!', this.world.centerX, 200, 'center');
    this.time.events.loop(400, () => text.visible = !text.visible);
    return text;
  }

  update () {
    if (this.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
      this.stateProvider.gameplay(this.state);
    }
  }
}
