import PropTypes from "prop-types";
import React from "react";
import { Segment } from "expo";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import config from "../config";
import Character from "../models/Character";
import ColorsContext from "./ColorsContext";

export default class CharacterTile extends React.Component {
  static propTypes = {
    char: PropTypes.instanceOf(Character).isRequired,
    size: PropTypes.number.isRequired,
    show: PropTypes.bool
  };

  static defaultProps = {
    show: true
  };

  render() {
    const { char, size, show } = this.props;
    const fontSize = size / 4;
    const borderWidth = size / 60;
    console.log({ borderWidth });

    return (
      <ColorsContext.Consumer>
        {colors => (
          <View style={[styles.container, { borderWidth }]}>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: colors.primary,
                  width: size,
                  height: size
                }
              ]}
              onPress={() => {
                Segment.trackWithProperties("character-tile-play-press", {
                  charName: char.name,
                  charShow: show
                });
                char.play();
              }}
            >
              {
                <Text style={[styles.text, { fontSize }]}>
                  {show ? char.name : "?"}
                </Text>
              }
            </TouchableOpacity>
          </View>
        )}
      </ColorsContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderColor: config.colors.background
  },
  button: {
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontWeight: "bold",
    color: config.colors.text
  }
});
