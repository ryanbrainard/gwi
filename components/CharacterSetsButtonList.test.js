import React from "react";
import CharacterSetsButtonList from "./CharacterSetsButtonList";
import renderer from "react-test-renderer";
import { provideColors } from "./ColorsContext";

test("renders correctly", () => {
  const _CharacterSetsButtonList = provideColors({}, CharacterSetsButtonList);
  const tree = renderer
    .create(<_CharacterSetsButtonList navigation={{}} onPressUrl="URL" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
