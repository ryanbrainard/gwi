import React from "react";
import renderer from "react-test-renderer";
import Character from "../models/Character";
import CharacterQuizCard from "./CharacterQuizCard";
import CharacterTile from "./CharacterTile";
import { provideColors } from "./ColorsContext";

test("renders correctly", () => {
  const char = new Character(); // TODO: fill in
  const _CharacterTile = provideColors({}, CharacterTile);
  const tree = renderer
    .create(<_CharacterTile char={char} size={225} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
