import Expo from "expo";

export default class VoicePlayerMRU {
  static recentPlaybacks = [];
  static maxPlaybacks = 5;

  constructor(voices) {
    this.voices = voices;
    this.playback = new Expo.Audio.Sound();
  }

  async play() {
    await this.preload();
    await this.playback.playFromPositionAsync(0);
  }

  async preload() {
    console.log("fn=VoicePlayerMRU.preload at=start");

    if (VoicePlayerMRU.recentPlaybacks.find(pb => pb === this.playback)) {
      console.log("fn=VoicePlayerMRU.preload at=noop-recent");
      return;
    }

    await this.playback.loadAsync(this.voices.jane); // TODO: settings
    VoicePlayerMRU.recentPlaybacks.unshift(this.playback);

    console.log("fn=VoicePlayerMRU.preload at=mru.start");
    while (
      VoicePlayerMRU.recentPlaybacks.length > VoicePlayerMRU.maxPlaybacks
    ) {
      console.log("fn=VoicePlayerMRU.preload at=mru.pop");
      const pb = VoicePlayerMRU.recentPlaybacks.pop();
      if ((await pb.getStatusAsync()).isLoaded) {
        console.log("fn=VoicePlayerMRU.preload at=mru.unload");
        await pb.unloadAsync();
      }
    }
    console.log(
      "fn=VoicePlayerMRU.preload at=mru.count",
      VoicePlayerMRU.recentPlaybacks.length
    );

    console.log("fn=VoicePlayerMRU.preload at=finish");
  }
}
