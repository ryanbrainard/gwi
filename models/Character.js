import Expo from "expo";

export default class Character {
  static _chars = {};

  static register(char) {
    this._chars[char.name] = char;
    return char;
  }

  static find(name) {
    return this._chars[name];
  }

  constructor(name, group, voices, color) {
    this._name = name;
    this._group = group;
    this._voices = voices;
    this._color = color;
  }

  get key() {
    return this.name;
  }

  get name() {
    return this._name;
  }

  get group() {
    return this._group.map(c => Character.find(c));
  }

  get color() {
    return this._color;
  }

  // TODO: should this go here
  // TODO: error handle
  // TODO: show indicator while playing?
  // TODO: pass in sound? make it controlled on model?
  // TODO: customizable voice
  // TODO: fix onFinish
  play(onFinish) {
    return Expo.Audio.Sound.create(this._voices.jane, {
      shouldPlay: true
    })
      .then(playback => {
        playback.setOnPlaybackStatusUpdate(playbackStatus => {
          if (playbackStatus.didJustFinish) {
            onFinish && onFinish();
          }
        });
      })
      .catch(rejection => {
        /*TODO*/
      });
  }
}
