import Expo from "expo";

export default class Character {
  constructor(name, voices) {
    this._name = name;
    this._voices = voices;
  }

  get key() {
    return this.name;
  }

  get name() {
    return this._name;
  }

  // TODO: should this go here
  // TODO: error handle
  // TODO: show indicator while playing?
  // TODO: pass in sound? make it controlled on model?
  play(onFinish) {
    return Expo.Audio.Sound.create(this._voices.default, {
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
