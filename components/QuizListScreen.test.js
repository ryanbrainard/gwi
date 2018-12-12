import React from "react";
import renderer from "react-test-renderer";
import { provideColors } from "./ColorsContext";
import QuizListScreen from "./QuizListScreen";

test("renders correctly", () => {
  const _QuizListScreen = provideColors({ primary: "#FFA500" }, QuizListScreen);
  const tree = renderer.create(<_QuizListScreen navigation={{}} />).toJSON();
  expect(tree).toMatchSnapshot();
});
