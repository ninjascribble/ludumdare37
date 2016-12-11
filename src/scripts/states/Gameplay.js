import _State from './_State';
import GameObjects from '../game_objects';
import DisplayObjects from '../display_objects';
// import 'phaser/filters/Gray';

export default class Gameplay extends _State {
  create () {
    this.background = GameObjects.grass(this.game, 0, 0, this.world.width, this.world.height);
    // this.sunsetFilter = game.add.filter('Gray');
    this.world.setBounds(0, 0, this.world.width, this.world.height);
    this.player = GameObjects.player(game, this.world.centerX, 60);
    this.solarMeter = GameObjects.solarMeter(game);
    this.enemies = GameObjects.enemies(game);
    this.spells = GameObjects.spells(game);
    this.book = GameObjects.book(game, 152, 124);
    this.room = GameObjects.room(game, 120, 104);
    this.enemies.setTarget(this.book);
    this.enemies.setSpawnPoints([
      { x: -16, y: -16 },
      { x: -16, y: this.world.centerY },
      { x: -16, y: this.world.height + 16 },
      { x: this.world.width + 16, y: -16 },
      { x: this.world.width + 16, y: this.world.centerY },
      { x: this.world.width + 16, y: this.world.height + 16 },
      { x: -16, y: -16 },
      { x: this.world.centerX, y: -16 },
      { x: this.world.width + 16, y: -16 },
      { x: -16, y: this.world.height + 16 },
      { x: this.world.centerX, y: this.world.height + 16 },
      { x: this.world.width + 16, y: this.world.height + 16 }
    ]);

    this.add.existing(this.background);
    this.add.existing(this.room);
    this.add.existing(this.book);
    this.add.existing(this.enemies);
    this.add.existing(this.player);
    this.add.existing(this.solarMeter);
    this.add.existing(this.spells);

    this.game.world.bringToTop(this.enemies);
    this.game.world.bringToTop(this.spells);
    this.game.world.bringToTop(this.solarMeter);

    this.enemies.startMoveTimer();
    this.enemies.startSpawnTimer();
    this.solarMeter.draining();

    this.spacebar = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    // game.world.filters = [this.sunsetFilter];

    this.solarMeter.onStartDraining.add(() => {
      this.book.close();
    }, this);

    this.solarMeter.onStartCharging.add(() => {
      this.book.open();
    }, this);

    this.enemies.onEnterTargetZone.add(() => {
      this.solarMeter.health--;
    }, this);

    this.spacebar.onDown.add(() => {
      this.spells.spawnSpellAt(this.player.x + 8, this.player.y + 8, this.player.facing);
    }, this);
  }

  update () {
    this.game.physics.arcade.collide(this.player, this.enemies);
    this.game.physics.arcade.collide(this.player, this.book);
    this.game.physics.arcade.collide(this.enemies, this.enemies);
    this.game.physics.arcade.overlap(this.spells, this.enemies, this.onSpellEnemyCollide)

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

    if (this.player.overlap(this.room)) {
      this.solarMeter.charging();
    } else {
      this.solarMeter.draining();
    }

    if (this.solarMeter.health <= 0) {
      this.stateProvider.gameover(this.state);
    }
  }

  onSpellEnemyCollide (spell, enemy) {
    enemy.kill()
  }
}
