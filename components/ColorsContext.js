import React from "react";

export default (ColorsContext = React.createContext());

export function provideColors(colors, Component) {
  return props => {
    return (
      <ColorsContext.Provider value={colors}>
        <Component {...props} />
      </ColorsContext.Provider>
    );
  };
}

export function withColors(Component) {
  return props => {
    return (
      <ColorsContext.Consumer>
        {colors => <Component {...props} colors={colors} />}
      </ColorsContext.Consumer>
    );
  };
}
