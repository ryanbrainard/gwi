import PropTypes from "prop-types";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import config from "../config";
import Character from "../models/Character";

export default class CharacterTile extends React.Component {
  static propTypes = {
    char: PropTypes.instanceOf(Character).isRequired,
    size: PropTypes.number,
    color: PropTypes.string,
    show: PropTypes.bool
  };

  static defaultProps = {
    show: true,
    percentOfWidth: 0.3
  };

  render() {
    const { char, size, color, show } = this.props;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: color,
              width: size,
              height: size
            }
          ]}
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
    borderColor: config.colors.background
  },
  button: {
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontWeight: "bold",
    fontSize: 24,
    color: config.colors.text
  }
});
