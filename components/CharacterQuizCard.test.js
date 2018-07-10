import React from "react";
import renderer from "react-test-renderer";
import Character from "../models/Character";
import CharacterQuizCard from "./CharacterQuizCard";

test("renders correctly", () => {
  const char = new Character("C");
  const universe = [
    new Character("A"),
    new Character("B"),
    char,
    new Character("D")
  ];
  const passthrough = s => s;
  const tree = renderer
    .create(
      <CharacterQuizCard
        char={char}
        universe={universe}
        _shuffle={passthrough}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
