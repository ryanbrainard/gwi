import React from "react";
import CharacterSetsButtonList from "./CharacterSetsButtonList";
import renderer from "react-test-renderer";

test("renders correctly", () => {
  const tree = renderer
    .create(<CharacterSetsButtonList navigation={{}} onPressUrl="URL" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
