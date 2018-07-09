import React from "react";
import CharacterGrid from "./CharacterGrid";
import renderer from "react-test-renderer";

test("renders correctly", () => {
  const tree = renderer.create(<CharacterGrid />).toJSON();
  expect(tree).toMatchSnapshot();
});
