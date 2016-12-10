const MOVE_DURATION = 100;
const UP = 'up';
const DOWN = 'down';
const LEFT = 'left';
const RIGHT = 'right';

export default class Alien extends Phaser.Sprite {
  constructor (game, x, y, key) {
    super(game, x, y, key);

    game.physics.enable(this);

    this.body.mass = 0;
    this.body.onCollide = new Phaser.Signal();

    this.animations.add('walkDown', [0, 1, 0, 2], 6, true);
    this.animations.add('walkUp', [3, 4, 3, 5], 6, true);
    this.animations.add('walkRight', [6, 7, 6, 8], 6, true);
    this.animations.add('walkLeft', [9, 10, 9, 11], 6, true);
  }

  move (x, y, facing, animation) {
    if (animation) {
      this.animations.play(animation);
    }

    this.facing = facing;

    switch (this.facing) {
      case LEFT:
        this.body.moveTo(MOVE_DURATION, 16, 180)
        break;
      case RIGHT:
        this.body.moveTo(MOVE_DURATION, 16, 0)
        break;
      case UP:
        this.body.moveTo(MOVE_DURATION, 16, 270)
        break;
      case DOWN:
        this.body.moveTo(MOVE_DURATION, 16, 90)
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
