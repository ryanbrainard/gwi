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

    console.log("fn=VoicePlayerMRU.load at=mru.add");
    VoicePlayerMRU.recentPlaybacks.unshift(this.playback);

    console.log("fn=VoicePlayerMRU.load at=mru.gc");
    while (
      VoicePlayerMRU.recentPlaybacks.length > VoicePlayerMRU.maxPlaybacks
    ) {
      console.log("fn=VoicePlayerMRU.load at=mru.gc.pop");
      const pb = VoicePlayerMRU.recentPlaybacks.pop();
      if ((await pb.getStatusAsync()).isLoaded) {
        console.log("fn=VoicePlayerMRU.load at=mru.unload");
        pb.unloadAsync();
      }
    }
    console.log(
      "fn=VoicePlayerMRU.load at=mru.count",
      VoicePlayerMRU.recentPlaybacks.length
    );

    console.log("fn=VoicePlayerMRU.load at=mru.load");
    await this.playback.loadAsync(this.voices.jane); // TODO: settings

    console.log("fn=VoicePlayerMRU.load at=finish");
  }
}
