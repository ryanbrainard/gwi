import PropTypes from "prop-types";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Character from "../models/Character";
import CharacterTile from "./CharacterTile";

export default class CharacterGrid extends React.Component {
  static propTypes = {
    chars: PropTypes.arrayOf(PropTypes.instanceOf(Character)).isRequired
  };

  render() {
    const { chars } = this.props;

    return (
      <View style={styles.container}>
        <FlatList
          data={chars}
          renderItem={({ item, index }) => (
            <CharacterTile char={item} color={this.nextColor()} />
          )}
          numColumns={3} // TODO: customizable and change tiles
        />
      </View>
    );
  }

  colorCursor = 0;

  nextColor() {
    if (this.colorCursor >= colors.length) {
      this.colorCursor = 0;
    }

    return colors[this.colorCursor++];
  }
}

const colors = ["#375E97", "#FB6542", "#FFBB00", "#3F681C"];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center"
  }
});
