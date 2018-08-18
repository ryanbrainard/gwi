import PropTypes from "prop-types";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import config from "../config";
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
          renderItem={({ item, index }) => <CharacterTile char={item} />}
          numColumns={3} // TODO: customizable and change tiles
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
