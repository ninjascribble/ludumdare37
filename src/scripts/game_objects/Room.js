export default class Room extends Phaser.Group{
  constructor (game, parent, name){
    super(game, parent, name);
  }

  setBrickBuilder (builder) {
    this.brickBuilder = builder;
  }

  buildAll () {
    this.addBrick(144, 128);
    this.addBrick(160, 128);
    this.addBrick(176, 128);
    this.addBrick(144, 144);
    this.addBrick(160, 144);
    this.addBrick(176, 144);
    this.addBrick(144, 160);
    this.addBrick(160, 160);
    this.addBrick(176, 160);
  }

  addBrick (x, y) {
    const brick = this.brickBuilder(game, x, y);
    this.add(brick);
  }
 }
