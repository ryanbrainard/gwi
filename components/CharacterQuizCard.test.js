import React from "react";
import renderer from "react-test-renderer";
import CharacterQuizCard from "./CharacterQuizCard";

test("renders correctly", () => {
  const char = { choices: jest.fn(() => []), play: jest.fn() };
  const tree = renderer.create(<CharacterQuizCard char={char} />).toJSON();
  expect(tree).toMatchSnapshot();
});
