import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import _ from "lodash";
import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import config from "../config";
import Character from "../models/Character";
import Settings from "../models/Settings";
import CharacterTile from "./CharacterTile";
import { DimensionsConsumer } from "./DimensionsContext";

export default class CharacterQuizCard extends React.Component {
  static propTypes = {
    char: PropTypes.instanceOf(Character).isRequired,
    universe: PropTypes.arrayOf(PropTypes.instanceOf(Character)).isRequired,
    gotoNext: PropTypes.func,
    numChoices: PropTypes.number,
    _shuffle: PropTypes.func
  };

  static defaultProps = {
    numChoices: 3,
    _shuffle: _.shuffle
  };

  constructor(props) {
    super(props);

    this.state = {
      charChoices: this.generateChoices(),
      success: undefined
    };
  }

  generateChoices() {
    const { char, universe, numChoices, _shuffle } = this.props;

    const others = universe.filter(cu => cu !== char);
    const shuffledOthers = _shuffle(others);
    const enoughShuffledOthers = shuffledOthers.slice(0, numChoices - 1);
    const choices = enoughShuffledOthers.concat(char);
    const shuffledChoices = _shuffle(choices);

    return shuffledChoices;
  }

  componentDidUpdate(_, prevState) {
    if (this.props.gotoNext && this.state.success && !prevState.success) {
      Settings.get(Settings.KEYS.ADVANCE_ON_SUCCESS).then(
        setting => setting && this.props.gotoNext()
      );
    }
  }

  render() {
    const { char, gotoNext } = this.props;
    const { charChoices, success } = this.state;

    return (
      <DimensionsConsumer>
        {({ isPortrait, window: { width, height } }) =>
          this.renderInternal(
            isPortrait,
            width,
            height,
            char,
            gotoNext,
            charChoices,
            success
          )
        }
      </DimensionsConsumer>
    );
  }

  renderInternal(
    isPortrait,
    width,
    height,
    char,
    gotoNext,
    charChoices,
    success
  ) {
    return (
      <View
        key={char.toString() + isPortrait}
        style={[styles.container, { padding: isPortrait ? 50 : 15 }]}
      >
        <CharacterTile
          char={char}
          show={!!success}
          size={Math.min(width, height) * 0.3}
        />
        <View
          style={[
            styles.choicesContainer,
            { flexDirection: isPortrait ? "column" : "row" }
          ]}
        >
          {charChoices.map(cc => {
            const correctChoice = cc === char;
            return (
              <TouchableOpacity
                key={cc.key}
                style={[
                  styles.choicesButton,
                  {
                    backgroundColor:
                      correctChoice && success
                        ? config.colors.success
                        : config.colors.neutral
                  }
                ]}
                onPress={() => {
                  this.setState({
                    success: success || correctChoice
                  });
                  cc.play();
                }}
              >
                <Text style={styles.choicesText}>{cc.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {this.renderSuccessIcon(success, gotoNext)}

        {success && (
          <TouchableOpacity style={styles.nextButton} onPress={gotoNext}>
            <MaterialCommunityIcons
              name="skip-next"
              size={30}
              color={config.colors.success}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  }

  renderSuccessIcon(success) {
    switch (success) {
      case null:
        return null;
      case true:
        return (
          <Feather
            name="check-circle"
            size={36}
            color={config.colors.success}
          />
        );
      case false:
        return (
          <Feather name="x-circle" size={36} color={config.colors.error} />
        );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: config.colors.background,
    alignItems: "center"
  },
  choicesContainer: {
    margin: 10
  },
  choicesButton: {
    backgroundColor: config.colors.neutral,
    borderRadius: 75,
    width: 75,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    margin: 10
  },
  choicesText: {
    fontWeight: "bold",
    fontSize: 18,
    color: config.colors.text
  },
  nextButton: {
    position: "absolute",
    bottom: 10,
    right: 10
  }
});
