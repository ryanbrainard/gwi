import React from "react";
import SettingsScreen from "./SettingsScreen";
import renderer from "react-test-renderer";

test("renders correctly", () => {
  const tree = renderer.create(<SettingsScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
