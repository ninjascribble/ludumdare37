const UP = 'up';
const DOWN = 'down';
const LEFT = 'left';
const RIGHT = 'right';

export default class Spell extends Phaser.Sprite {
  constructor (game, x, y, name){
    super(game, x, y, name);

    game.physics.enable(this);

    this.anchor.x = .5;
    this.anchor.y = .5;
    this.animations.add('cast', [1, 2, 3], 12, false);
  }

  cast (facing) {
    this.animations.play('cast');

    switch (facing) {
      case LEFT:
        this.angle = 180;
        this.body.setSize(4, 29, 2, 10)
        this.body.velocity.x = -200;
        this.body.velocity.y = 0;
        break;
      case RIGHT:
        this.angle = 0;
        this.body.setSize(4, 29, 9, 8)
        this.body.velocity.x = 200;
        this.body.velocity.y = 0;
        break;
      case UP:
        this.angle = 270;
        this.body.setSize(29, 4, -8, 18)
        this.body.velocity.x = 0;
        this.body.velocity.y = -200;
        break;
      case DOWN:
        this.angle = 90;
        this.body.setSize(29, 4, -6, 25)
        this.body.velocity.x = 0;
        this.body.velocity.y = 200;
        break;
    }

    setTimeout(this.kill.bind(this), 250);
  }
}
