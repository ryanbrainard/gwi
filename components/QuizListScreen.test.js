import React from "react";
import renderer from "react-test-renderer";
import QuizListScreen from "./QuizListScreen";

test("renders correctly", () => {
  const tree = renderer.create(<QuizListScreen navigation={{}} />).toJSON();
  expect(tree).toMatchSnapshot();
});
