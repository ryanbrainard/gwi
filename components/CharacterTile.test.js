import React from "react";
import renderer from "react-test-renderer";
import Character from "../models/Character";
import CharacterTile from "./CharacterTile";

test("renders correctly", () => {
  const char = new Character(); // TODO: fill in

  const tree = renderer.create(<CharacterTile char={char} />).toJSON();
  expect(tree).toMatchSnapshot();
});
