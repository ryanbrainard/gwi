import _ from "lodash";

export default class CharacterQuizItem {
  constructor(char, stateSetter, _shuffle = _.shuffle) {
    this._char = char;
    this._stateSetter = stateSetter;
    this._choices = this._generateChoices(_shuffle);
    this._success = undefined;
  }

  get character() {
    return this._char;
  }

  get choices() {
    return this._choices;
  }

  get success() {
    return this._success;
  }

  set success(value) {
    this._success = value;
    this._stateSetter(this); // TODO: good idea or just gross?
  }

  _generateChoices(_shuffle) {
    const others = this.character.group.filter(cu => cu !== this.character);
    const shuffledOthers = _shuffle(others);
    const enoughShuffledOthers = shuffledOthers.slice(0, 2);
    const choices = enoughShuffledOthers.concat(this.character);
    const shuffledChoices = _shuffle(choices);

    return shuffledChoices;
  }
}
