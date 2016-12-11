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
    this.kills = 0;
    this.time = 0;
    this.wave = 0;

    this.drainTimer = this.game.time.create();
    this.drainTimer.loop(DRAIN_DELAY, () => this.drain(), this);

    this.chargeTimer = this.game.time.create();
    this.chargeTimer.loop(CHARGE_DELAY, () => this.charge(), this);

    this.hud = DisplayObjects.bodyFont(this.game, this.mkhealth(this.health), 16, 16);
    this.killCounter = DisplayObjects.bodyFont(this.game, this.mkkills(this.kills), 160, 16, 'center');
    this.timeCounter = DisplayObjects.bodyFont(this.game, this.mktime(this.time), 304, 16, 'right');
    this.waveCounter = DisplayObjects.bodyFont(this.game, this.mkwave(this.wave), 160, 272, 'center');

    this.onStartDraining = new Phaser.Signal();
    this.onStartCharging = new Phaser.Signal();

    this.add(this.hud);
    this.add(this.killCounter);
    this.add(this.timeCounter);
    this.add(this.waveCounter);
  }

  draining () {
    if (this.state !== STATE_DRAINING) {
      this.chargeTimer.stop(false);
      this.drainTimer.start();
      this.state = STATE_DRAINING;
      this.onStartDraining.dispatch();
    }
  }

  charging () {
    if (this.state !== STATE_CHARGING) {
      this.drainTimer.stop(false);
      this.chargeTimer.start();
      this.state = STATE_CHARGING;
      this.onStartCharging.dispatch();
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
    this.hud.text = this.mkhealth(this.health);
    this.killCounter.text = this.mkkills(this.kills);
    this.timeCounter.text = this.mktime(this.time);
    this.waveCounter.text = this.mkwave(this.wave);
  }

  mkhealth (num) {
    return num + ' sols';
  }

  mkkills (num) {
    return num + ' kills';
  }

  mktime (ms) {
    let dt = new Date(ms);
    let hours = String(16 - dt.getHours());
    let minutes = String(dt.getMinutes());
    let seconds = String(dt.getSeconds());

    if (hours.length < 2) hours = '0' + hours;
    if (minutes.length < 2) minutes = '0' + minutes;
    if (seconds.length < 2) seconds = '0' + seconds;

    return [hours, minutes, seconds].join(':')
  }

  mkwave (num) {
    return 'wave ' + num;
  }
}
