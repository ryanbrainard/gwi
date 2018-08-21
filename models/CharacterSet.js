import config from "../config";
import Character from "./Character";
import _ from "lodash";

export default class CharacterSet {
  constructor(name, groups) {
    this._name = name;
    this._groups = groups;
  }

  get key() {
    return this.name;
  }

  get name() {
    return this._name;
  }

  get groups() {
    return this._groups;
  }

  get characters() {
    return _.flatten(this.groups);
  }
  static _load() {
    if (this._list) {
      return;
    }

    this._list = Object.entries(config.characterSets).map(
      ([setName, setGroups]) => {
        return new CharacterSet(
          setName,
          setGroups.map(setGroup => {
            const setGroupFiltered = Object.entries(setGroup).filter(
              ([charName]) => charName.length === 1
            );
            return setGroupFiltered.map(([charName, charValue]) => {
              return Character.register(
                new Character(
                  charName,
                  setGroupFiltered.map(([k]) => k),
                  charValue.voices
                )
              );
            });
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
