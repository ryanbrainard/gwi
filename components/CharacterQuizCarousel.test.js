import React from "react";
import Character from "../models/Character";
import CharacterQuizItem from "../models/CharacterQuizItem";
import CharacterQuizCarousel from "./CharacterQuizCarousel";
import renderer from "react-test-renderer";
import { provideColors } from "./ColorsContext";

test("renders correctly", () => {
  const _CharacterQuizCarousel = provideColors({}, CharacterQuizCarousel);

  const group = ["A", "B"];
  group.forEach(char => Character.register(new Character(char, group)));
  const stateSetter = jest.fn();
  const newItem = char => {
    const item = new CharacterQuizItem(char, stateSetter, s => s);
    item._key = "00000000-0000-0000-0000-000000000000"; // override for snapshot testing
    return item;
  };
  const items = [newItem(Character.find("A")), newItem(Character.find("B"))];

  const tree = renderer
    .create(<_CharacterQuizCarousel items={items} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
