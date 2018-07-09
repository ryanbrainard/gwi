import React from "react";
import CharacterSetsButtonList from "./CharacterSetsButtonList";
import renderer from "react-test-renderer";

test("renders correctly", () => {
  const tree = renderer.create(<CharacterSetsButtonList />).toJSON();
  expect(tree).toMatchSnapshot();
});
