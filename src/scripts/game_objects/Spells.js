export default class Spells extends Phaser.Group {
  constructor (game, parent, name) {
    super(game, parent, name);
  }

  setSpellBuilder (builder) {
    this.spellBuilder = builder;
  }

  spawnSpellAt (x, y, facing) {
    if (this.countLiving() > 500) {
      return;
    }

    const spawn = this.getFirstDead() || this.spellBuilder(game);

    spawn.x = x;
    spawn.y = y;
    spawn.revive();
    spawn.cast(facing);
    this.add(spawn)
  }
}
