import React from "react";
import renderer from "react-test-renderer";
import Character from "../models/Character";
import QuizDetailScreen from "./QuizDetailScreen";

test("renders correctly", () => {
  jest.mock("Animated");

  const group = ["A", "B"];
  const characters = group.map(char =>
    Character.register(new Character(char, group))
  );

  const navigation = {
    getParam: jest.fn(() => ({ characters }))
  };

  const tree = renderer
    .create(<QuizDetailScreen navigation={navigation} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
