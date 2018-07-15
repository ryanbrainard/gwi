import Expo from "expo";

export default class Character {
  constructor(name, voices, color) {
    this._name = name;
    this._voices = voices;
    this._color = color;
  }

  get key() {
    return this.name;
  }

  get name() {
    return this._name;
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
