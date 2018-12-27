import VoicePlayer from "./VoicePlayer";

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

    const voice = this._voices.jane;
    this.player = new VoicePlayer(voice);
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

  async play() {
    await this.player.play();
  }
}
