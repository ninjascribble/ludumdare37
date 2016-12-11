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
    this.attackTimer = this.game.time.create();
    this.attackTimer.loop(100, () => {
      this.onEnterTargetZone && this.onEnterTargetZone.dispatch();
    }, this);
  }

  update () {
    if (this.target && this.overlap(this.target)) {
      this.body.velocity.x = 0;
      this.body.velocity.y = 0;
      this.startAttacking();
    } else {
      this.stopAttacking();
    }
  }

  startAttacking () {
    if (!this.attackTimer.running) {
      this.attackTimer.start();
    }
  }

  stopAttacking () {
    if (this.attackTimer.running) {
      this.attackTimer.stop(false);
    }
  }

  kill () {
    this.stopAttacking();
    super.kill()
  }

  determineMovement () {
    const randNum = this.game.rnd.integerInRange(1, 100);
    const xDiff = 160 - this.x;
    const yDiff = 144 - this.y;

    //If the enemy isn't next to the book then procede with movement
    if (Math.abs(xDiff) > 16 ||  Math.abs(yDiff) > 16){
      if(randNum > 40){
        this.moveToBook(xDiff, yDiff);
      }
      else{
        this.travel();
      }
    }
  }

  //Move the enemy in a random direction.
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

  //Move the enemy towards the book.
  moveToBook(xDiff, yDiff){
    if(xDiff > 0) {
      this.moveRight();
    }
    else {
      this.moveLeft();
    }

    if(yDiff > 0){
      this.moveDown();
    }
    else{
      this.moveUp();
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
