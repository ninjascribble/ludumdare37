import DisplayObjects from '../display_objects';

const MAX_HEALTH = 100;
const MIN_HEALTH = 0;
const CHARGE_DELAY = 200;
const DRAIN_DELAY = 500;
const STATE_DRAINING = 'draining';
const STATE_CHARGING = 'charging';

export default class SolarMeter extends Phaser.Group {
  constructor (game, parent, name) {
    super(game, parent, name);
    this.health = MAX_HEALTH;

    this.drainTimer = this.game.time.create();
    this.drainTimer.loop(DRAIN_DELAY, () => this.drain(), this);

    this.chargeTimer = this.game.time.create();
    this.chargeTimer.loop(CHARGE_DELAY, () => this.charge(), this);

    this.hud = DisplayObjects.bodyFont(this.game, this.health, 16, 16);

    this.add(this.hud);
  }

  draining () {
    if (this.state !== STATE_DRAINING) {
      this.chargeTimer.stop(false);
      this.drainTimer.start();
      this.state = STATE_DRAINING;
    }
  }

  charging () {
    if (this.state !== STATE_CHARGING) {
      this.drainTimer.stop(false);
      this.chargeTimer.start();
      this.state = STATE_CHARGING;
    }
  }

  drain () {
    if (this.health > MIN_HEALTH) {
      this.health--;
    }
  }

  charge () {
    if (this.health < MAX_HEALTH) {
      this.health++;
    }
  }

  update () {
    this.hud.text = this.health;
  }
}
