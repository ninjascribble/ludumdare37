const MOVE_DURATION = 100;
const UP = 'up';
const DOWN = 'down';
const LEFT = 'left';
const RIGHT = 'right';

export default class Player extends Phaser.Sprite {
  constructor (game, x, y, key) {
    super(game, x, y, key);

    game.physics.enable(this);

    this.facing = LEFT;

    this.body.drag.x = 1000;
    this.body.drag.y = 1000;

    this.body.onCollide = new Phaser.Signal();
    this.body.collideWorldBounds = true;

    this.animations.add('walkDown', [0, 1, 0, 2], 6, true);
    this.animations.add('walkUp', [3, 4, 3, 5], 6, true);
    this.animations.add('walkRight', [6, 7, 6, 8], 6, true);
    this.animations.add('walkLeft', [9, 10, 9, 11], 6, true);
  }

  update () {
    if (this.body.velocity.x == 0 && this.body.velocity.y == 0) {
      this.animations.currentAnim.restart();
      this.animations.stop();
    }
  }

  move (x, y, facing, animation) {
    if (animation) {
      this.animations.play(animation);
    }

    this.facing = facing;

    switch (this.facing) {
      case LEFT:
        this.body.velocity.x = -160
        break;
      case RIGHT:
        this.body.velocity.x = 160
        break;
      case UP:
        this.body.velocity.y = -160
        break;
      case DOWN:
        this.body.velocity.y = 160
        break;
    }
  }

  moveLeft () {
    this.move(-16, 0, LEFT, 'walkLeft');
  }

  moveRight () {
    this.move(16, 0, RIGHT, 'walkRight');
  }

  moveUp () {
    this.move(0, -16, UP, 'walkUp');
  }

  moveDown () {
    this.move(0, 16, DOWN, 'walkDown');
  }
}
