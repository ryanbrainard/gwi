import Expo from "expo";

export default class VoicePlayerMRU {
  static recentPlaybacks = [];
  static maxPlaybacks = 12;

  constructor(voices) {
    this.voices = voices;
    this.playback = new Expo.Audio.Sound();
    this.playAfterLoad = false;
  }

  async load() {
    return await this._loadAndMaybePlay(false);
  }

  async play() {
    return await this._loadAndMaybePlay(true);
  }

  async _loadAndMaybePlay(playAfterLoad) {
    // de-dupe in-flight loadings
    this.playAfterLoad = this.playAfterLoad || !!playAfterLoad;

    if (!VoicePlayerMRU.recentPlaybacks.find(pb => pb === this.playback)) {
      VoicePlayerMRU.recentPlaybacks.unshift(this.playback);

      while (
        VoicePlayerMRU.recentPlaybacks.length > VoicePlayerMRU.maxPlaybacks
      ) {
        const pb = VoicePlayerMRU.recentPlaybacks.pop();
        if ((await pb.getStatusAsync()).isLoaded) {
          pb.unloadAsync();
        }
      }
    }

    if (this.playback._loading) {
      console.log("fn=VoicePlayerMRU._loadAndMaybePlay at=loading");
      // this.playAfterLoad was set above, so return here and it let the loading one play if needed
      return;
    }

    let status = await this.playback.getStatusAsync();
    if (status.isLoaded) {
      console.log("fn=VoicePlayerMRU._loadAndMaybePlay at=mru.loaded");
    } else {
      console.log("fn=VoicePlayerMRU._loadAndMaybePlay at=mru.load");
      status = await this.playback.loadAsync(this.voices.jane);
    }

    if (this.playAfterLoad) {
      console.log("fn=VoicePlayerMRU._loadAndMaybePlay at=play");
      this.playAfterLoad = false;
      status = await this.playback.playFromPositionAsync(0);
    }

    return status;
  }
}
