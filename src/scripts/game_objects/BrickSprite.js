//const KEY = 'brick';

export default class Bricksprite extends Phaser.Sprite{
  constructor(game, x, y, key){
    super(game, x, y, key);
    this.onDone = new Phaser.Signal();
  }

  /*onCollide(){
    super.onCollide();
    if(!this.body.immovable){
    // this.game.sound.play('brickImpact');
    }

    this.body.immovable = true;
    this.onDone.dispatch();
  }*/
 }
