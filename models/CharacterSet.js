import config from "../config";
import Character from "./Character";
import ColorIterator from "./ColorIterator";

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

    const colors = ColorIterator.default();

    this._list = Object.entries(config.characterSets).map(
      ([setName, setValue]) => {
        return new CharacterSet(
          setName,
          Object.entries(setValue)
            .filter(([charName]) => charName.length === 1)
            .map(([charName, charValue]) => {
              return new Character(charName, charValue.voices, colors.next());
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
