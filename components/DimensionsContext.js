import React from "react";
import { Dimensions } from "react-native";

function calculateState() {
  const window = Dimensions.get("window");
  const screen = Dimensions.get("screen");
  const isPortrait = window.height > window.width;
  const isLandscape = !isPortrait;

  return {
    window,
    screen,
    isPortrait,
    isLandscape
  };
}

const { Provider, Consumer } = React.createContext(calculateState());

class DimensionsProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = calculateState();
    this.onChange = this.onChange.bind(this);
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }

  componentDidMount() {
    Dimensions.addEventListener("change", this.onChange);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.onChange);
  }

  onChange() {
    this.setState(calculateState());
  }
}

export { DimensionsProvider, Consumer as DimensionsConsumer };
