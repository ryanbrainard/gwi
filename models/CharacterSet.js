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

  // TODO: probably doesn't belong here, but here for testing for now...
  // TODO: consider moving inside of Character class
  charsWithGroups() {
    return _.flatten(
      this.groups.map(group => group.map(char => [char, group]))
    );
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
            return Object.entries(setGroup)
              .filter(([charName]) => charName.length === 1)
              .map(([charName, charValue]) => {
                return new Character(
                  charName,
                  charValue.voices,
                  config.colors.primary
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
