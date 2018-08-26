import PropTypes from "prop-types";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import config from "../config";
import Character from "../models/Character";
import CharacterTile from "./CharacterTile";
import { DimensionsConsumer } from "./DimensionsContext";

export default class CharacterGrid extends React.Component {
  static propTypes = {
    chars: PropTypes.arrayOf(PropTypes.instanceOf(Character)).isRequired,
    color: PropTypes.string
  };

  render() {
    return (
      <DimensionsConsumer>
        {({ window: { width }, isPortrait }) =>
          this.renderInternal(width, isPortrait)
        }
      </DimensionsConsumer>
    );
  }

  renderInternal(width, isPortrait) {
    const { chars, color } = this.props;
    const cols = isPortrait ? 3 : 4;
    const size = (width / cols) * 0.9;

    return (
      <View style={styles.container}>
        <FlatList
          key={cols /* force refresh, per recommendation */}
          data={chars}
          renderItem={({ item }) => (
            <CharacterTile char={item} size={size} color={color} />
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
