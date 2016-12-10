export default class Book extends Phaser.Sprite{
  constructor(game, x, y, key){
    super(game, x, y, key);
    // game.physics.enable(this);
    // this.body.immovable = true;
    this.animations.add('open', [0, 1, 2, 3], 6, false);
    this.animations.add('close', [4, 5, 6, 7], 6, false);
  }

  open () {
    this.animations.play('open');
  }

  close () {
    this.animations.play('close');
  }
}
