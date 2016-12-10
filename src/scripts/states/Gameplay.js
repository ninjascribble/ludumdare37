import _State from './_State';
import GameObjects from '../game_objects';
import DisplayObjects from '../display_objects';

export default class Gameplay extends _State {
  create () {
    this.stage.backgroundColor = '#223344';
    this.world.setBounds(0, 0, this.world.width, this.world.height);
    this.player = GameObjects.player(game, this.world.centerX, 60);
    this.enemies = GameObjects.enemies(game, this.world);

    this.add.existing(this.titleText());
    this.add.existing(this.player);

    this.enemies.spawnAlien(64, 64);
    this.enemies.spawnAlien(64, this.world.height / 2);
    this.enemies.spawnAlien(64, this.world.height - 64);
    this.enemies.spawnAlien(this.world.width / 2, 64);
    this.enemies.spawnAlien(this.world.width / 2, this.world.height / 2);
    this.enemies.spawnAlien(this.world.width / 2, this.world.height - 64);
    this.enemies.spawnAlien(this.world.width - 64, 64);
    this.enemies.spawnAlien(this.world.width - 64, this.world.height / 2);
    this.enemies.spawnAlien(this.world.width - 64, this.world.height - 64);

    this.enemies.moveTimer();
  }

  titleText () {
    return DisplayObjects.displayFont(game, 'THIS IS THE GAME', this.world.centerX, 40, 'center');
  }

  update () {
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
  }
}
