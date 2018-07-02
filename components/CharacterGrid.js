import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import CharacterTile from "./CharacterTile";
import PropTypes from "prop-types";

export default class CharacterGrid extends React.Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({ key: PropTypes.string }))
  };

  render() {
    const { data } = this.props;

    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <CharacterTile char={item.key} color={item.color} />
          )}
          numColumns={3} // TODO: customizable and change tiles
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center"
  }
});
