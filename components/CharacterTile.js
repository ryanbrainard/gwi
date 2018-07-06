import React from "react";
import Expo from "expo";
import PropTypes from "prop-types";
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
    color: PropTypes.string,
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    playOnRender: PropTypes.bool
  };

  render() {
    const { char, color, content, playOnRender } = this.props;

    if (playOnRender) {
      this.play();
    }

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: color }]}
          onPress={this.play.bind(this)}
        >
          {content ? content : <Text style={styles.text}>{char.name}</Text>}
        </TouchableOpacity>
      </View>
    );
  }

  play() {
    // TODO: error handle
    // TODO: show indicator while playing?
    // TODO: pass in sound? make it controlled on model?
    Expo.Audio.Sound.create(this.props.char.voices.default, {
      shouldPlay: true
    });
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
    fontSize: 24
  }
});
