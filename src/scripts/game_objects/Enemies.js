const MOVE_DELAY = 500;
const SPAWN_DELAY = 4000;

export default class Enemies extends Phaser.Group {
  constructor (game, parent, name) {
    super(game, parent, name);
    this.itteration = 1;
  }

  setAlienBuilder (builder) {
    this.alienBuilder = builder;
  }

  setSpawnPoints (spawnPoints) {
    this.spawnPoints = spawnPoints;
  }

  setTarget (target) {
    this.target = target;
  }

  startMoveTimer () {
    const timer = this.game.time.create();

    timer.loop(MOVE_DELAY, () => {
      this.children.forEach((enemy) => enemy.determineMovement());
    }, this);
    timer.start();
  }

  startSpawnTimer () {
    const timer = this.game.time.create();

    this.spawnAlien();
    timer.loop(SPAWN_DELAY, () => this.spawnAlien(), this);
    timer.start();
  }

  spawnAlien () {
    for(var i = 0; i < this.itteration; i++){
      const spawnPoint = this.game.rnd.pick(this.spawnPoints);
      this.spawnAlienAt(spawnPoint.x, spawnPoint.y);
    }

    this.itteration++;
  }

  spawnAlienAt (x, y) {
    const alien = this.getFirstDead() || this.alienBuilder(game);

    alien.x = x;
    alien.y = y;
    alien.target = this.target;
    alien.revive()
    this.add(alien)
  }
}
