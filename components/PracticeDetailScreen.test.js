import React from "react";
import PracticeDetailScreen from "./PracticeDetailScreen";
import renderer from "react-test-renderer";

test("renders correctly", () => {
  const navigation = {
    getParam: jest.fn(() => ({ characters: [] }))
  };

  const tree = renderer
    .create(<PracticeDetailScreen navigation={navigation} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
