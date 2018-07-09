import React from "react";
import PracticeListScreen from "./PracticeListScreen";
import renderer from "react-test-renderer";

test("renders correctly", () => {
  const tree = renderer.create(<PracticeListScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
