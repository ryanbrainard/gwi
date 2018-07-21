import { AsyncStorage } from "react-native";

class Settings {
  _CONFIG = {
    ADVANCE_ON_SUCCESS: {
      default: false
    }
  };

  KEYS = Object.keys(this._CONFIG).reduce(
    (keys, key) => Object.assign(keys, { [key]: key }),
    {}
  );

  getAll() {
    return AsyncStorage.multiGet(Object.keys(this._CONFIG)).then(
      (stores, errors) => {
        if (errors) {
          console.error(errors);
          return {};
        }

        return stores.reduce(
          (settings, [key, value]) =>
            Object.assign(settings, {
              [key]:
                value === null ? this._CONFIG[key].default : JSON.parse(value)
            }),
          {}
        );
      }
    );
  }

  get(key) {
    return AsyncStorage.getItem(key)
      .then(value => JSON.parse(value))
      .catch(this._CONFIG[key].default);
  }

  set(key, value) {
    return AsyncStorage.setItem(key, JSON.stringify(value));
  }
}

// TODO: ok to export an instance??
export default new Settings();
