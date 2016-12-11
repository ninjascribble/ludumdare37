import Player from './Player';
import Enemies from './Enemies';
import Alien from './Alien';
import SolarMeter from './SolarMeter';
import Spell from './Spell';
import Spells from './Spells';
import BrickSprite from './BrickSprite'; //importing the bricksprite class

import Room from './Room';
import Book from './Book';

const PLAYER = 'player';
const ENEMIES = 'enemies';
const SOLAR_METER = 'solar_meter';
const ALIEN = 'alien';
const BRICK = 'brick';
const ROOM = 'room';
const BOOK = 'book';
const SPELL = 'spell';
const SPELLS = 'spells';

module.exports = {
  load: function load (loader) {
    loader.load.spritesheet(PLAYER, 'player.png', 16, 16);
    loader.load.spritesheet(ALIEN, 'alien.png', 16, 16);
    loader.load.spritesheet(BRICK, 'brick.png', 16, 16);
    loader.load.spritesheet(BOOK, 'book.png', 16, 16);
    loader.load.spritesheet(ROOM, 'room.png', 80, 80);
    loader.load.spritesheet(SPELL, 'spell.png', 16, 48);
  },

  enemies: function enemies (game, parent) {
    const group = new Enemies(game, parent, ENEMIES);
    group.setAlienBuilder(module.exports.alien)
    return group;
  },

  spells: function enemies (game, parent) {
    const group = new Spells(game, parent, SPELLS);
    group.setSpellBuilder(module.exports.spell);
    return group;
  },

  solarMeter: function solarMeter (game, parent) {
    return new SolarMeter(game, parent, SOLAR_METER)
  },

  player: function player (game, x, y) {
    return new Player(game, x, y, PLAYER);
  },

  room: function room(game, x, y){
    return new Room(game, x, y, ROOM);
  },

  alien: function alien (game, x, y) {
    return new Alien(game, x, y, ALIEN);
  },

  brick: function brickSprite (game, x, y) {
    return new BrickSprite(game, x, y, BRICK);
  },

  book: function book (game, x, y) {
    return new Book(game, x, y, BOOK);
  },

  spell: function spell (game, x, y) {
    return new Spell(game, x, y, SPELL);
  }
};
