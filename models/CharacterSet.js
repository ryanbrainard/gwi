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
    if (this._list) {
      return;
    }

    this._list = Object.entries(config.characterSets).map(
      ([setName, setValue]) => {
        return new CharacterSet(
          setName,
          Object.entries(setValue).map(([charName, charValue]) => {
            return new Character(charName, charValue.voices);
          })
        );
      }
    );
  }

  static list() {
    this._load();
    return this._list;
  }
}
