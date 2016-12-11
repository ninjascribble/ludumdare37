export default class Explosion extends Phaser.Sprite{
  constructor(game, x, y, key){
    super(game, x, y, key);
    this.animations.add('explode', [0, 1, 2], 12, false);
  }

  explode () {
    this.animations.play('explode', null, false, true);
  }
}
