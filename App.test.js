import React from "react";
import App from "./App";

import renderer from "react-test-renderer";

it("renders without crashing", done => {
  const rendered = renderer.create(<App />).toJSON();
  expect(rendered).toBeTruthy();
  setImmediate(done); // shitty workaround to Jest problem (https://github.com/facebook/jest/issues/4710); TODO: work on a real fix.
});
