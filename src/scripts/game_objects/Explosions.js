export default class Explosions extends Phaser.Group {
  constructor (game, parent, name) {
    super(game, parent, name);
  }

  setExplosionBuilder (builder) {
    this.explosionBuilder = builder;
  }

  spawnExplosionAt (x, y) {
    const spawn = this.getFirstDead() || this.explosionBuilder(game);

    spawn.x = x;
    spawn.y = y;
    spawn.revive();
    this.add(spawn);
    spawn.explode();
  }
}
