import Expo from "expo";

export default class VoicePlayer {
  static recentPlaybacks = [];
  static maxPlaybacks = 5;

  constructor(voice) {
    this.voice = voice;
    this.playback = new Expo.Audio.Sound();
  }

  async play() {
    await this.preload();
    await this.playback.playFromPositionAsync(0);
  }

  async preload() {
    console.log("fn=VoicePlayer.preload at=start");

    if (VoicePlayer.recentPlaybacks.find(pb => pb === this.playback)) {
      console.log("fn=VoicePlayer.preload at=noop-recent");
      return;
    }

    await this.playback.loadAsync(this.voice);
    VoicePlayer.recentPlaybacks.unshift(this.playback);

    console.log("fn=VoicePlayer.preload at=mru.start");
    while (VoicePlayer.recentPlaybacks.length > VoicePlayer.maxPlaybacks) {
      console.log("fn=VoicePlayer.preload at=mru.pop");
      const pb = VoicePlayer.recentPlaybacks.pop();
      if ((await pb.getStatusAsync()).isLoaded) {
        console.log("fn=VoicePlayer.preload at=mru.unload");
        await pb.unloadAsync();
      }
    }
    console.log(
      "fn=VoicePlayer.preload at=mru.count",
      VoicePlayer.recentPlaybacks.length
    );

    console.log("fn=VoicePlayer.preload at=finish");
  }
}
