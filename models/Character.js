export default class Character {
  constructor(name, voices) {
    this._name = name;
    this._voices = voices;
  }

  get key() {
    return this.name;
  }

  get name() {
    return this._name;
  }

  get voices() {
    return this._voices;
  }
}
