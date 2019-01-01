import React from "react";
import renderer from "react-test-renderer";
import Character from "../models/Character";
import CharacterQuizItem from "../models/CharacterQuizItem";
import { provideColors } from "./ColorsContext";
import QuizScore from "./QuizScore";

test("renders correctly", () => {
  const _QuizScore = provideColors({}, QuizScore);

  const group = ["A", "B", "C"];
  group.forEach(char => Character.register(new Character(char, group)));
  const stateSetter = jest.fn();
  const newItem = (char, answered) => {
    const item = new CharacterQuizItem(
      char,
      stateSetter,
      () => "00000000-0000-0000-0000-000000000000",
      s => s
    );
    item.answered = answered;
    return item;
  };
  const items = [
    newItem(Character.find("A"), undefined), // unanswered
    newItem(Character.find("B"), Character.find("A")), // incorrect
    newItem(Character.find("B"), Character.find("B")), // correct,
    newItem(Character.find("C"), Character.find("A")), // incorrect
    newItem(Character.find("C"), Character.find("A")) // incorrect again
  ];
  items[1].answered = items[0].char;

  const tree = renderer
    .create(<QuizScore items={items} restartQuiz={jest.fn()} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
