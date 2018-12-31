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
      playFromPositionAsync: mockPlayFromPositionAsync
    })
  }
}));

beforeEach(() => {
  mockStatusLoading = false;
  mockStatusLoaded = false;
  mockGetStatusAsync.mockClear();
  mockLoadAsync.mockClear();
  mockPlayFromPositionAsync.mockClear();
});

it("#load (previous unloaded)", async () => {
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

it("#load (previous loaded)", async () => {
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

it("#load (previous loading)", async () => {
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
