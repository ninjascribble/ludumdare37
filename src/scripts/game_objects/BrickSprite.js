export default class Bricksprite extends Phaser.Sprite{
  constructor(game, x, y, key){
    super(game, x, y, key);
    game.physics.enable(this);
    this.body.immovable = true;
  }
}
