import React from "react";
import renderer from "react-test-renderer";
import Character from "../models/Character";
import CharacterQuizCard from "./CharacterQuizCard";
import { provideColors } from "./ColorsContext";

test("renders correctly", () => {
  const char = new Character("C");
  const universe = [
    new Character("A"),
    new Character("B"),
    char,
    new Character("D")
  ];
  const passthrough = s => s;
  const _CharacterQuizCard = provideColors(
    { primary: "#FFA500" },
    CharacterQuizCard
  );
  const tree = renderer
    .create(
      <_CharacterQuizCard
        char={char}
        universe={universe}
        _shuffle={passthrough}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
