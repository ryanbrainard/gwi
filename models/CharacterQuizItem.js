export default class CharacterQuizItem {
  constructor(char, stateSetter) {
    this._char = char;
    this._stateSetter = stateSetter;
  }

  get character() {
    return this._char;
  }

  get success() {
    return this._success;
  }

  set success(value) {
    this._success = value;
    this._stateSetter(this); // TODO: good idea or just gross?
  }
}
