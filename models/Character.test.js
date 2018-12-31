import Character from "./Character";
import config from "../config";

const testVoices = config.characterSets["ㄱㄲㅋ"][0]["겁"].voices;
const testGroup = ["x", "y", "z"];
const testChars = testGroup.map(name =>
  Character.register(new Character(name, testGroup, testVoices))
);

it("#find", () => {
  expect(Character.find(testGroup[0])).toBe(testChars[0]);
});

it("#key", () => {
  expect(testChars[0].key).toBe(testGroup[0]);
});

it("#name", () => {
  expect(testChars[0].name).toBe(testGroup[0]);
});

it("#group", () => {
  expect(testChars[0].group).toEqual(testChars);
});

it("#preloadPlay", () => {
  expect(testChars[0].preloadPlay()).toBeInstanceOf(Promise);
});

it("#play", () => {
  expect(testChars[0].play()).toBeInstanceOf(Promise);
});
