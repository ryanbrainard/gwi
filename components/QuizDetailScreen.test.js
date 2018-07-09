import React from "react";
import renderer from "react-test-renderer";
import QuizDetailScreen from "./QuizDetailScreen";

test("renders correctly", () => {
  const navigation = {
    getParam: jest.fn(() => ({ characters: [] }))
  };

  const tree = renderer
    .create(<QuizDetailScreen navigation={navigation} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
