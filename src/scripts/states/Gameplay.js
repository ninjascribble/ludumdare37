import _State from './_State';
import GameObjects from '../game_objects';
import DisplayObjects from '../display_objects';

export default class Gameplay extends _State {
  create () {
    this.stage.backgroundColor = '#223344';
    this.world.setBounds(0, 0, this.world.width, this.world.height);
    this.player = GameObjects.player(game, this.world.centerX, 60);
    this.bricks = GameObjects.bricks(game);
    this.enemies = GameObjects.enemies(game);

    this.add.existing(this.titleText());
    this.add.existing(this.player);
    this.add.existing(this.enemies);
    this.add.existing(this.bricks);

    this.bricks.addBrick(144, 128);
    this.bricks.addBrick(160, 128);
    this.bricks.addBrick(176, 128);
    this.bricks.addBrick(144, 144);
    this.bricks.addBrick(160, 144);
    this.bricks.addBrick(176, 144);
    this.bricks.addBrick(144, 160);
    this.bricks.addBrick(160, 160);
    this.bricks.addBrick(176, 160);



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
    this.game.physics.arcade.collide(this.player, this.enemies);
    this.game.physics.arcade.collide(this.enemies, this.enemies);
    this.game.physics.arcade.collide(this.brick, this.player);
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
  }
}
