import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import CharacterTile from "./CharacterTile";
import PropTypes from "prop-types";
import CharacterSet from "../models/CharacterSet";

export default class CharacterGrid extends React.Component {
  static propTypes = {
    charSet: PropTypes.instanceOf(CharacterSet).isRequired
  };

  render() {
    const { charSet } = this.props;

    return (
      <View style={styles.container}>
        <FlatList
          data={charSet.characters}
          renderItem={({ item }) => (
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
