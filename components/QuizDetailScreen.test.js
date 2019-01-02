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

  let idIndex = 0;
  const idMaker = () => idIndex++;

  const elem = renderer.create(
    <QuizDetailScreen
      navigation={navigation}
      _shuffle={s => s}
      _genKey={idMaker}
    />
  );
  const inst = elem.getInstance();
  inst.setState({ layout: { width: 100, height: 200 } });

  expect(Object.keys(inst.state.items)).toEqual(["0", "1"]);
  expect(elem.toJSON()).toMatchSnapshot();

  inst.state.items["0"].answered = Character.find("B"); // incorrect
  expect(Object.keys(inst.state.items)).toEqual(["0", "1", "2"]); // added to end
  expect(inst.state.items["0"].char).toEqual(inst.state.items["2"].char); // same char
  expect(elem.toJSON()).toMatchSnapshot();

  inst.state.items["1"].answered = Character.find("B"); // correct
  expect(Object.keys(inst.state.items)).toEqual(["0", "1", "2"]); // not added to end
  expect(elem.toJSON()).toMatchSnapshot();

  inst.restartQuiz();
  expect(Object.keys(inst.state.items)).toEqual(["3", "4"]);
  expect(elem.toJSON()).toMatchSnapshot();
});
