import config from "../config";
import VoicePlayerMRU from "./VoicePlayerMRU";

const testVoices = config.characterSets["ㄱㄲㅋ"][0]["겁"].voices;

let mockStatusLoading = false;
let mockStatusLoaded = false;

const mockGetStatusAsync = jest.fn().mockImplementation(() => {
  return Promise.resolve({
    _mock: "getStatusAsync",
    isLoaded: mockStatusLoaded
  });
});

const mockUnloadAsync = jest.fn().mockImplementation(() => {
  return Promise.resolve({ _mock: "unloadAsync" });
});

const mockLoadAsync = jest.fn().mockImplementation(() => {
  return Promise.resolve({ _mock: "loadAsync" });
});

const mockPlayFromPositionAsync = jest.fn().mockImplementation(() => {
  return Promise.resolve({ _mock: "playFromPositionAsync" });
});

jest.mock("expo", () => ({
  Audio: {
    Sound: () => ({
      _loading: mockStatusLoading,
      getStatusAsync: mockGetStatusAsync,
      loadAsync: mockLoadAsync,
      unloadAsync: mockUnloadAsync,
      playFromPositionAsync: mockPlayFromPositionAsync
    })
  }
}));

beforeEach(() => {
  VoicePlayerMRU.recentPlaybacks = [];
  mockStatusLoading = false;
  mockStatusLoaded = false;
  mockGetStatusAsync.mockClear();
  mockLoadAsync.mockClear();
  mockUnloadAsync.mockClear();
  mockPlayFromPositionAsync.mockClear();
});

it("#load (requires gc)", async () => {
  mockStatusLoaded = true;
  for (let i = 0; i < VoicePlayerMRU.maxPlaybacks + 1; i++) {
    VoicePlayerMRU.recentPlaybacks.push(
      new VoicePlayerMRU(testVoices).playback
    );
  }

  const player = new VoicePlayerMRU(testVoices);

  const promise = player.load();
  expect(promise).toBeInstanceOf(Promise);
  expect(player.playAfterLoad).toBeFalsy();
  expect(VoicePlayerMRU.recentPlaybacks).toContain(player.playback);
  await expect(promise).resolves.toEqual({
    _mock: "getStatusAsync",
    isLoaded: true
  });
  expect(mockGetStatusAsync.mock.calls.length).toBe(3);
  expect(mockUnloadAsync.mock.calls.length).toBe(2);
  expect(mockLoadAsync.mock.calls.length).toBe(0);
  expect(mockPlayFromPositionAsync.mock.calls.length).toBe(0);
});

it("#load (previously unloaded)", async () => {
  const player = new VoicePlayerMRU(testVoices);

  const promise = player.load();
  expect(promise).toBeInstanceOf(Promise);
  expect(player.playAfterLoad).toBeFalsy();
  expect(VoicePlayerMRU.recentPlaybacks).toContain(player.playback);
  await expect(promise).resolves.toEqual({
    _mock: "loadAsync"
  });
  expect(mockGetStatusAsync.mock.calls.length).toBe(1);
  expect(mockLoadAsync.mock.calls.length).toBe(1);
  expect(mockPlayFromPositionAsync.mock.calls.length).toBe(0);
});

it("#load (previously loaded)", async () => {
  mockStatusLoaded = true;

  const player = new VoicePlayerMRU(testVoices);
  VoicePlayerMRU.recentPlaybacks.push(player.playback);

  const promise = player.load();
  expect(promise).toBeInstanceOf(Promise);
  expect(player.playAfterLoad).toBeFalsy();
  expect(VoicePlayerMRU.recentPlaybacks).toContain(player.playback);
  await expect(promise).resolves.toEqual({
    _mock: "getStatusAsync",
    isLoaded: true
  });
  expect(mockGetStatusAsync.mock.calls.length).toBe(1);
  expect(mockLoadAsync.mock.calls.length).toBe(0);
  expect(mockPlayFromPositionAsync.mock.calls.length).toBe(0);
});

it("#load (previously loading)", async () => {
  mockStatusLoading = true;

  const player = new VoicePlayerMRU(testVoices);
  VoicePlayerMRU.recentPlaybacks.push(player.playback);

  const promise = player.load();
  expect(promise).toBeInstanceOf(Promise);
  expect(player.playAfterLoad).toBeFalsy();
  expect(VoicePlayerMRU.recentPlaybacks).toContain(player.playback);
  await expect(promise).resolves.toEqual(undefined); // TODO: do we really want this?
  expect(mockGetStatusAsync.mock.calls.length).toBe(0);
  expect(mockLoadAsync.mock.calls.length).toBe(0);
  expect(mockPlayFromPositionAsync.mock.calls.length).toBe(0);
});

it("#play", async () => {
  const player = new VoicePlayerMRU(testVoices);

  const playPromise = player.play();
  expect(playPromise).toBeInstanceOf(Promise);
  expect(player.playAfterLoad).toBeTruthy();
  expect(VoicePlayerMRU.recentPlaybacks).toContain(player.playback);
  await expect(playPromise).resolves.toEqual({
    _mock: "playFromPositionAsync"
  });
  expect(mockGetStatusAsync.mock.calls.length).toBe(1);
  expect(mockLoadAsync.mock.calls.length).toBe(1);
  expect(mockPlayFromPositionAsync.mock.calls.length).toBe(1);
});
