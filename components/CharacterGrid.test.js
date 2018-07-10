import React from "react";
import Character from "../models/Character";
import CharacterGrid from "./CharacterGrid";
import renderer from "react-test-renderer";

test("renders correctly", () => {
  const tree = renderer
    .create(<CharacterGrid chars={[new Character("A"), new Character("B")]} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
