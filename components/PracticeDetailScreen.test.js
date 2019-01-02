import React from "react";
import renderer from "react-test-renderer";
import PracticeDetailScreen from "./PracticeDetailScreen";

test("renders correctly", () => {
  const navigation = {
    getParam: jest.fn(() => ({ characters: [] }))
  };

  const elem = renderer.create(
    <PracticeDetailScreen navigation={navigation} />
  );
  const inst = elem.getInstance();
  inst.setState({ layout: { width: 100, height: 200 } });
  expect(elem.toJSON()).toMatchSnapshot();
});
