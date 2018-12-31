import _ from "lodash";
import uuidv4 from "uuid/v4";

export default class CharacterQuizItem {
  constructor(char, stateSetter, _shuffle = _.shuffle) {
    this._key = uuidv4();
    this._char = char;
    this._stateSetter = stateSetter;
    this._choices = this._generateChoices(char.group, _shuffle);
    this._answered = undefined;
  }

  get key() {
    return this._key;
  }

  get character() {
    return this._char;
  }

  // alias
  get char() {
    return this.character;
  }

  get choices() {
    return this._choices;
  }

  set answered(value) {
    this._answered = value;
    this._stateSetter(this);
  }

  get answered() {
    return this._answered;
  }

  get success() {
    return this._answered && this._answered === this._char;
  }

  _generateChoices(group, _shuffle) {
    const others = group.filter(cu => cu !== this.character);
    const shuffledOthers = _shuffle(others);
    const enoughShuffledOthers = shuffledOthers.slice(0, 2);
    const choices = enoughShuffledOthers.concat(this.character);
    const shuffledChoices = _shuffle(choices);

    return shuffledChoices;
  }
}
