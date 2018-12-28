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
    await this._loadAndMaybePlay(false);
  }

  async play() {
    await this._loadAndMaybePlay(true);
  }

  async _loadAndMaybePlay(playAfterLoad) {
    // de-dupe in-flight loadings
    this.playAfterLoad = this.playAfterLoad || !!playAfterLoad;

    console.log(
      `fn=VoicePlayerMRU._loadAndMaybePlay at=start playAfterLoad=${
        this.playAfterLoad
      }`
    );

    if (VoicePlayerMRU.recentPlaybacks.find(pb => pb === this.playback)) {
      console.log("fn=VoicePlayerMRU._loadAndMaybePlay at=mru.found");
    } else {
      console.log("fn=VoicePlayerMRU._loadAndMaybePlay at=mru.add");
      VoicePlayerMRU.recentPlaybacks.unshift(this.playback);

      console.log("fn=VoicePlayerMRU._loadAndMaybePlay at=mru.gc");
      while (
        VoicePlayerMRU.recentPlaybacks.length > VoicePlayerMRU.maxPlaybacks
      ) {
        console.log("fn=VoicePlayerMRU._loadAndMaybePlay at=mru.gc.pop");
        const pb = VoicePlayerMRU.recentPlaybacks.pop();
        if ((await pb.getStatusAsync()).isLoaded) {
          console.log("fn=VoicePlayerMRU._loadAndMaybePlay at=mru.unload");
          pb.unloadAsync();
        }
      }
    }

    if (this.playback._loading) {
      console.log("fn=VoicePlayerMRU._loadAndMaybePlay at=loading");
      // this.playAfterLoad was set above, so return here and it let the loading one play if needed
      return;
    } else if ((await this.playback.getStatusAsync()).isLoaded) {
      console.log("fn=VoicePlayerMRU._loadAndMaybePlay at=mru.loaded");
    } else {
      console.log("fn=VoicePlayerMRU._loadAndMaybePlay at=mru.load");
      await this.playback.loadAsync(this.voices.jane);
    }

    if (this.playAfterLoad) {
      console.log("fn=VoicePlayerMRU._loadAndMaybePlay at=play");
      await this.playback.playFromPositionAsync(0);
      this.playAfterLoad = false;
    }

    console.log("fn=VoicePlayerMRU._loadAndMaybePlay at=finish");
  }
}
