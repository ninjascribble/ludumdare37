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

    this.animations.add('walkDown', [4, 5, 6, 7], 6, true);
    this.animations.add('walkUp', [0, 1, 2, 3], 6, true);
    this.animations.add('walkRight', [4, 5, 6, 7], 6, true);
    this.animations.add('walkLeft', [4, 5, 6, 7], 6, true);
    this.animations.add('vampire', [8, 9, 10, 11], 6, true);

    this.target = null;
    this.isVampire = false;
  }

  revive () {
    super.revive();
    this.isVampire = false;
  }

  determineMovement () {
    const randNum = this.game.rnd.integerInRange(1, 100);
    const xDiff = 160 - this.x;
    const yDiff = 144 - this.y;

    //If the enemy isn't next to the book then procede with movement
    if (Math.abs(xDiff) > 32 ||  Math.abs(yDiff) > 32){
      this.isVampire = false;
      if(randNum > 30){
        this.moveToTarget(xDiff, yDiff);
      } else{
        this.travel();
      }
    } else {
      this.isVampire = true;
      this.animations.play('vampire');
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
  moveToTarget(xDiff, yDiff){
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
