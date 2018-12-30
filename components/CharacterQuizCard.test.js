import React from "react";
import renderer from "react-test-renderer";
import Character from "../models/Character";
import CharacterQuizItem from "../models/CharacterQuizItem";
import CharacterQuizCard from "./CharacterQuizCard";
import { provideColors } from "./ColorsContext";

test("renders correctly", () => {
  const group = ["A", "B", "C", "D"];
  group.forEach(char => Character.register(new Character(char, group)));

  const char = Character.find("C");
  const stateSetter = jest.fn();
  const charItem = new CharacterQuizItem(char, stateSetter, s => s);

  const _CharacterQuizCard = provideColors(
    { primary: "#FFA500" },
    CharacterQuizCard
  );

  const tree = renderer
    .create(<_CharacterQuizCard charItem={charItem} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
