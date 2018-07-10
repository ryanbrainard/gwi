import config from "../config";
import Character from "./Character";

export default class CharacterSet {
  constructor(name, characters) {
    this._name = name;
    this._characters = characters;
  }

  get key() {
    return this.name;
  }

  get name() {
    return this._name;
  }

  get characters() {
    return this._characters;
  }

  static _load() {
    if (this._all && this._all_index) {
      return;
    }

    this._all = Object.entries(config.characterSets).map(
      ([setName, setValue]) => {
        return new CharacterSet(
          setName,
          Object.entries(setValue).map(([charName, charValue]) => {
            return new Character(charName, charValue.voices);
          })
        );
      }
    );

    this._all_index = this._all.reduce((ai, set) => {
      return Object.assign(ai, { [set.name]: set });
    }, {});
  }

  static all() {
    this._load();
    return this._all;
  }

  // TODO: is this needed?
  static find(name) {
    this._load();
    return this._all_index[name];
  }
}
