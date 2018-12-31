import Character from "./Character";
import CharacterQuizItem from "./CharacterQuizItem";

const testCharKey = "a";
const testChar = new Character(testCharKey, [], {});
const testChar2 = new Character("b", [], {});
const testChar3 = new Character("c", [], {});
const testChar4 = new Character("d", [], {});
const testStateSetter = jest.fn();
const testCharQuizItem = new CharacterQuizItem(testChar, testStateSetter);

it("#key", () => {
  expect(testCharQuizItem.key).toEqual(
    expect.stringMatching(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    )
  );
});

it("#character", () => {
  expect(testCharQuizItem.character).toBe(testChar);
});

it("#char", () => {
  expect(testCharQuizItem.character).toBe(testCharQuizItem.char);
});

it("#choices", () => {
  expect(testCharQuizItem.choices).toEqual([testChar]);
});

it("#_generate_choice", () => {
  expect(
    testCharQuizItem._generateChoices(
      [testChar, testChar2, testChar3, testChar4],
      s => s
    )
  ).toEqual([testChar2, testChar3, testChar]);
});

it("#answered", () => {
  expect(testCharQuizItem.answered).toBeFalsy();
  testCharQuizItem.answered = testChar2;
  expect(testStateSetter.mock.calls.length).toBe(1);
  expect(testStateSetter.mock.calls[0][0]).toBe(testCharQuizItem);
  expect(testCharQuizItem.answered).toBeTruthy();
  expect(testCharQuizItem.answered).toBe(testChar2);
});

it("#success", () => {
  expect(testCharQuizItem.success).toBeFalsy();

  testCharQuizItem.answered = testChar2;
  expect(testCharQuizItem.success).toBeFalsy();

  testCharQuizItem.answered = testChar;
  expect(testCharQuizItem.success).toBeTruthy();
});
