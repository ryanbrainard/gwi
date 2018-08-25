import PropTypes from "prop-types";
import React from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import config from "../config";
import Character from "../models/Character";
import CharacterTile from "./CharacterTile";
import { isHortizontal } from "../utils";

export default class CharacterGrid extends React.Component {
  static propTypes = {
    chars: PropTypes.arrayOf(PropTypes.instanceOf(Character)).isRequired,
    color: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      isHorizontal: isHortizontal()
    };
  }

  componentDidMount() {
    Dimensions.addEventListener("change", () => {
      this.setState({ isHorizontal: isHortizontal() });
    });
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", () => {});
  }

  render() {
    const { chars, color } = this.props;
    const { isHorizontal } = this.state;
    const cols = isHorizontal ? 4 : 3;
    const percentOfWidth = (1 / cols) * 0.9;

    return (
      <View style={styles.container}>
        <FlatList
          key={cols /* force refresh, per recommendation */}
          data={chars}
          renderItem={({ item }) => (
            <CharacterTile
              char={item}
              color={color}
              percentOfWidth={percentOfWidth}
            />
          )}
          numColumns={cols} // TODO: customizable and change tiles
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: config.colors.background,
    alignItems: "center"
  }
});
