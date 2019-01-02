import React from "react";
import Character from "../models/Character";
import CharacterGrid from "./CharacterGrid";
import renderer from "react-test-renderer";
import { provideColors } from "./ColorsContext";

test("renders correctly", () => {
  const _CharacterGrid = provideColors({}, CharacterGrid);
  const tree = renderer
    .create(
      <_CharacterGrid
        chars={[new Character("A"), new Character("B")]}
        parentLayout={{ width: 100, height: 200 }}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
