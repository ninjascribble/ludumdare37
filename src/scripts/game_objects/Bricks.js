export default class Bricksprite extends Phaser.Group{
  constructor(game, parent, name){
    super(game, parent, name);
  }

  setBrickBuilder(builder){
    this.brickBuilder = builder;
  }

  addBrick(x, y){
    const brick = this.brickBuilder(game, x, y);

    this.add(brick);
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
