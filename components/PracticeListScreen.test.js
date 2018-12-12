import React from "react";
import { provideColors } from "./ColorsContext";
import PracticeListScreen from "./PracticeListScreen";
import renderer from "react-test-renderer";

test("renders correctly", () => {
  const _PracticeListScreen = provideColors(
    { primary: "#6495ED" },
    PracticeListScreen
  );
  const tree = renderer
    .create(<_PracticeListScreen navigation={{}} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
