const MOVE_DELAY = 500;
const SPAWN_DELAY = 200;

export default class Enemies extends Phaser.Group {
  constructor (game, parent, name) {
    super(game, parent, name);
    this.onEnterTargetZone = new Phaser.Signal();
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

    timer.loop(SPAWN_DELAY, () => this.spawnAlien(), this);
    timer.start();
  }

  spawnAlien () {
    const spawnPoint = this.game.rnd.pick(this.spawnPoints);

    this.spawnAlienAt(spawnPoint.x, spawnPoint.y);
  }

  spawnAlienAt (x, y) {
    if (this.countLiving() > 500) {
      return;
    }

    const alien = this.getFirstDead() || this.alienBuilder(game);

    alien.x = x;
    alien.y = y;
    alien.target = this.target;
    alien.onEnterTargetZone = this.onEnterTargetZone;
    alien.revive()
    this.add(alien)
  }
}
