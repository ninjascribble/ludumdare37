export default class Enemies extends Phaser.Group {
  constructor (game, parent, name, addToStage = true) {
    super(game, parent, name, addToStage)
  }

  setAlienBuilder (builder) {
    this.alienBuilder = builder;
  }

  moveTimer () {
    const moveDelay = this.game.time.create();

    this.children.forEach((enemy) => {
      moveDelay.loop(500, () => this.travel(enemy), this);
      moveDelay.start();
    });
  }

  spawnAlien (x, y) {
    const alien = this.alienBuilder(game, x, y)

    this.addChild(alien)
  }

  travel (enemy) {
    const dirNum = this.game.rnd.integerInRange(1, 4);

    switch (dirNum) {
      case 1: enemy.moveLeft(this.obstacles);
        break;
      case 2: enemy.moveRight(this.obstacles);
        break;
      case 3: enemy.moveUp(this.obstacles);
        break;
      case 4: enemy.moveDown(this.obstacles);
        break;
    }
  }
}
