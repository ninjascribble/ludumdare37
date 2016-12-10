import _State from './_State';
import GameObjects from '../game_objects';
import DisplayObjects from '../display_objects';

export default class Gameplay extends _State {
  create () {
    this.stage.backgroundColor = '#223344';
    this.world.setBounds(0, 0, this.world.width, this.world.height);
    this.player = GameObjects.player(game, this.world.centerX, 60);
    this.brick = GameObjects.brick(game, this.world.centerX, 90);
    this.solarMeter = GameObjects.solarMeter(game);
    this.enemies = GameObjects.enemies(game);
    this.enemies.setSpawnPoints([
      { x: -16, y: -16 },
      { x: -16, y: this.world.centerY },
      { x: -16, y: this.world.height + 16 },
      { x: this.world.width + 16, y: -16 },
      { x: this.world.width + 16, y: this.world.centerY },
      { x: this.world.width + 16, y: this.world.height + 16 },
      { x: -16, y: -16 },
      { x: this.world.centerX, y: -16 },
      { x: this.world.with + 16, y: -16 },
      { x: -16, y: this.world.height + 16 },
      { x: this.world.centerX, y: this.world.height + 16 },
      { x: this.world.with + 16, y: this.world.height + 16 }
    ]);

    this.add.existing(this.brick);
    this.add.existing(this.player);
    this.add.existing(this.enemies);
    this.add.existing(this.solarMeter);

    this.enemies.startMoveTimer();
    this.enemies.startSpawnTimer();
    this.solarMeter.draining();
  }

  update () {
    this.game.physics.arcade.overlap(this.player, this.enemies, this.onPlayerEnemyCollide);
    this.game.physics.arcade.collide(this.enemies, this.enemies);
    this.game.physics.arcade.collide(this.brick, this.enemies);

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

    if (this.player.overlap(this.brick)) {
      this.solarMeter.charging();
    } else {
      this.solarMeter.draining();
    }
  }

  onPlayerEnemyCollide (player, enemy) {
    enemy.body.velocity.x = 0;
    enemy.body.velocity.y = 0;
    setTimeout(() => enemy.kill(), 100);
  }
}
