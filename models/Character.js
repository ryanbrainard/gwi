import VoicePlayerMRU from "./VoicePlayerMRU";

export default class Character {
  static _chars = {};

  static register(char) {
    this._chars[char.name] = char;
    return char;
  }

  static find(name) {
    return this._chars[name];
  }

  constructor(name, group, voices) {
    this._name = name;
    this._group = group;
    this._voices = voices;

    this.player = new VoicePlayerMRU(this._voices);
  }

  get key() {
    return this.name;
  }

  get name() {
    return this._name;
  }

  get group() {
    return this._group.map(c => Character.find(c));
  }

  async preloadPlay() {
    await this.player.load();
  }

  async play() {
    await this.player.play();
  }
}
