import Expo from "expo";

export default class VoicePlayerMRU {
  static recentPlaybacks = [];
  static maxPlaybacks = 12;

  constructor(voices) {
    this.voices = voices;
    this.playback = new Expo.Audio.Sound();
  }

  async play() {
    await this.load();
    await this.playback.playFromPositionAsync(0);
  }

  async load() {
    console.log("fn=VoicePlayerMRU.load at=start");

    if (VoicePlayerMRU.recentPlaybacks.find(pb => pb === this.playback)) {
      console.log("fn=VoicePlayerMRU.load at=noop-recent");
      return;
    }

    if (this.playback._loading) {
      // isn't in status api...
      console.log("fn=VoicePlayerMRU.load at=noop-loading");
      return;
    }

    await this.playback.loadAsync(this.voices.jane); // TODO: settings
    VoicePlayerMRU.recentPlaybacks.unshift(this.playback);

    console.log("fn=VoicePlayerMRU.load at=mru.start");
    while (
      VoicePlayerMRU.recentPlaybacks.length > VoicePlayerMRU.maxPlaybacks
    ) {
      console.log("fn=VoicePlayerMRU.load at=mru.pop");
      const pb = VoicePlayerMRU.recentPlaybacks.pop();
      if ((await pb.getStatusAsync()).isLoaded) {
        console.log("fn=VoicePlayerMRU.load at=mru.unload");
        await pb.unloadAsync();
      }
    }
    console.log(
      "fn=VoicePlayerMRU.load at=mru.count",
      VoicePlayerMRU.recentPlaybacks.length
    );

    console.log("fn=VoicePlayerMRU.load at=finish");
  }
}
