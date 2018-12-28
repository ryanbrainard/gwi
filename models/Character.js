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
    console.log(`fn=Character.preloadPlay char=${this.name}`);
    await this.player.load();
  }

  async play() {
    const start = new Date();
    console.log(`fn=Character.play at=start char=${this.name}`);
    await this.player.play();
    console.log(
      `fn=Character.play at=finish char=${this.name} elapsed=${new Date() -
        start}`
    );
  }
}
