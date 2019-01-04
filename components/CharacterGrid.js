import PropTypes from "prop-types";
import React from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import config from "../config";
import Character from "../models/Character";
import CharacterTile from "./CharacterTile";

export default class CharacterGrid extends React.Component {
  static propTypes = {
    chars: PropTypes.arrayOf(PropTypes.instanceOf(Character)).isRequired,
    color: PropTypes.string,
    parentLayout: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number
    })
  };

  render() {
    const { chars, color, parentLayout } = this.props;

    if (!parentLayout) {
      return (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color={color} />
        </View>
      );
    }

    const shrinkage = 0.9;
    const baseCols = 3;
    const baseColWidth = (parentLayout.width * shrinkage) / baseCols;
    const sizeDiff = Math.max(0, parentLayout.width - parentLayout.height);
    const extraCols = Math.floor(sizeDiff / baseColWidth);
    const cols = baseCols + extraCols;
    const size = (parentLayout.width / cols) * shrinkage;

    return (
      <View style={styles.container}>
        <FlatList
          key={cols /* force refresh, per recommendation */}
          data={chars}
          renderItem={({ item }) => (
            <CharacterTile char={item} size={size} color={color} />
          )}
          numColumns={cols}
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
  },
  activityIndicatorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
