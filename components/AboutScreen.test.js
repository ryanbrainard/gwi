import React from "react";
import AboutScreen from "./AboutScreen";
import renderer from "react-test-renderer";

test("renders correctly", () => {
  const tree = renderer.create(<AboutScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
