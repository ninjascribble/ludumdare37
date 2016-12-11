const MOVE_DURATION = 100;
const UP = 'up';
const DOWN = 'down';
const LEFT = 'left';
const RIGHT = 'right';

export default class Alien extends Phaser.Sprite {
  constructor (game, x, y, key) {
    super(game, x, y, key);

    game.physics.enable(this);

    this.body.drag.x = 1000;
    this.body.drag.y = 1000;

    this.body.onCollide = new Phaser.Signal();

    this.animations.add('walkDown', [0, 1, 0, 2], 6, true);
    this.animations.add('walkUp', [3, 4, 3, 5], 6, true);
    this.animations.add('walkRight', [6, 7, 6, 8], 6, true);
    this.animations.add('walkLeft', [9, 10, 9, 11], 6, true);

    this.target = null;
    this.onEnterTargetZone = null;
  }

  update () {
    if (this.target && this.overlap(this.target)) {
      this.body.velocity.x = 0;
      this.body.velocity.y = 0;
      this.onEnterTargetZone && this.onEnterTargetZone.dispatch();
    }
  }

  travel () {
    const dirNum = this.game.rnd.integerInRange(1, 4);

    switch (dirNum) {
      case 1: this.moveLeft();
        break;
      case 2: this.moveRight();
        break;
      case 3: this.moveUp();
        break;
      case 4: this.moveDown();
        break;
    }
  }

  move (x, y, facing, animation) {
    if (animation) {
      this.animations.play(animation);
    }

    this.facing = facing;

    switch (this.facing) {
      case LEFT:
        this.body.velocity.x = -360
        break;
      case RIGHT:
        this.body.velocity.x = 360
        break;
      case UP:
        this.body.velocity.y = -360
        break;
      case DOWN:
        this.body.velocity.y = 360
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
