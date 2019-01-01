import React from "react";
import renderer from "react-test-renderer";
import Character from "../models/Character";
import CharacterQuizItem from "../models/CharacterQuizItem";
import CharacterQuizCard from "./CharacterQuizCard";
import { provideColors } from "./ColorsContext";

const _CharacterQuizCard = provideColors(
  { primary: "#FFA500" },
  CharacterQuizCard
);

describe("renders correctly", () => {
  const group = ["A", "B", "C", "D"];
  group.forEach(char => Character.register(new Character(char, group)));
  const correctChar = Character.find("C");
  const incorrectChar = Character.find("D");
  const stateSetter = jest.fn();
  const newItem = tap => {
    const item = new CharacterQuizItem(
      correctChar,
      stateSetter,
      () => "00000000-0000-0000-0000-000000000000",
      s => s
    );
    if (tap != null) {
      tap(item);
    }
    return item;
  };

  const tests = {
    new: newItem(),
    success: newItem(item => (item.answered = correctChar)),
    fail: newItem(item => (item.answered = incorrectChar))
  };

  Object.entries(tests).forEach(([testName, testItem]) => {
    test(testName, () => {
      const tree = renderer
        .create(<_CharacterQuizCard charItem={testItem} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
