import Expo from "expo";
import _ from "lodash";
import CharacterSet from "./CharacterSet";

export default class Character {
  constructor(charSetName, name, voices) {
    this._charSetName = charSetName;
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

  // TODO: should this go here?
  choices(numChoices) {
    return _.shuffle(
      _.sampleSize(
        CharacterSet.find(this._charSetName).characters.filter(
          cu => cu !== this
        ),
        numChoices - 1
      ).concat(this)
    );
  }
}
