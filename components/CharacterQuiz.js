import React from "react";
import PropTypes from "prop-types";
import Expo from "expo";
import Character from "../models/Character";
import _ from "lodash";
import { Button, StyleSheet, Text, View } from "react-native";
import CharacterTile from "./CharacterTile";
import { Feather } from "@expo/vector-icons";

export default class CharacterQuiz extends React.Component {
  static propTypes = {
    char: PropTypes.instanceOf(Character).isRequired,
    charUniverse: PropTypes.arrayOf(PropTypes.instanceOf(Character)).isRequired,
    numChoices: PropTypes.number
  };

  static defaultProps = {
    numChoices: 3
  };

  constructor(props) {
    super(props);
    const { char, charUniverse, numChoices } = this.props;
    this.state = {
      charChoices: _.shuffle(
        _.sampleSize(
          charUniverse.filter(cu => cu !== char),
          numChoices - 1
        ).concat(char)
      ),
      success: undefined
    };
  }

  render() {
    const { char } = this.props;
    const { charChoices, success } = this.state;
    const unanswered = success === undefined;

    return (
      <View style={styles.container}>
        <CharacterTile
          char={char}
          content={<Feather name="play-circle" size={76} />}
          playOnRender={unanswered}
        />
        {charChoices.map(cc => (
          <Button
            key={cc.key}
            title={cc.name}
            onPress={() => {
              // TODO: error handle sound
              Expo.Audio.Sound.create(cc.voices.default, { shouldPlay: true });
              this.setState({ success: cc === char });
            }}
          />
        ))}
        {this.renderSuccess(success)}x
      </View>
    );
  }

  renderSuccess(success) {
    switch (success) {
      case null:
        return null;
      case true:
        return <Feather name="check-circle" size={48} color="#3F681C" />;
      case false:
        return <Feather name="x-circle" size={48} color="#FB6542" />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center"
  }
});
