export default class Book extends Phaser.Sprite{
  constructor(game, x, y, key){
    super(game, x, y, key);
    game.physics.enable(this);
    this.body.immovable = true;
    this.body.height = 2;
    this.animations.add('open', [0, 1, 2, 3], 12, false);
    this.animations.add('stayOpen', [3], 12, false);
    this.animations.add('close', [4, 5, 6, 7], 12, false);
    this.animations.add('stayClosed', [7], 12, false);
    this.animations.add('burnClosed', [8, 9], 12, true);
    this.animations.add('burnOpen', [10, 11], 12, true);

    this.playerPresent = false;
  }

  open () {
    this.animations.play('open');
  }

  close () {
    this.animations.play('close');
  }

  burn () {
    if (this.playerPresent == true) {
      this.animations.play('burnOpen');
    }
    else {
      this.animations.play('burnClosed');
    }
  }

  stopBurning () {
    if (this.playerPresent == true) {
      this.animations.play('stayOpen');
    }
    else {
      this.animations.play('stayClosed');
    }
  }

}
