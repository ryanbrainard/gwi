import PropTypes from "prop-types";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Character from "../models/Character";

export default class CharacterTile extends React.Component {
  static propTypes = {
    char: PropTypes.instanceOf(Character).isRequired,
    show: PropTypes.bool
  };

  static defaultProps = {
    show: true
  };

  render() {
    const { char, show } = this.props;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: char.color }]}
          onPress={char.play.bind(char)}
        >
          {<Text style={styles.text}>{show ? char.name : "?"}</Text>}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: "white"
  },
  button: {
    width: Dimensions.get("window").width * 0.3, // TODO: customizable with grid size
    height: Dimensions.get("window").width * 0.3, // TODO: customizable with grid size
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontWeight: "bold",
    fontSize: 24,
    color: "black"
  }
});
