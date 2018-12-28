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
import { Segment } from "expo";

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

  componentDidMount() {
    this.state.charChoices.forEach(choice => choice.preloadPlay());
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
    const containerPadding = Math.min(width, height) / 10;
    const buttonWidth = Math.min(width, height) / 5;
    const buttonHeight = buttonWidth / 2;
    const buttonTextSize = buttonWidth / 5;
    const buttonMargin = buttonWidth / 5;
    const resultIconSize = buttonTextSize * 2;
    const nextSize = buttonTextSize * 1.5;

    return (
      <View
        key={char.toString() + isPortrait}
        style={[styles.container, { padding: containerPadding }]}
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
                        : config.colors.neutral,
                    borderRadius: buttonWidth,
                    width: buttonWidth,
                    height: buttonHeight,
                    margin: buttonMargin
                  }
                ]}
                onPress={() => {
                  const trackProperties = {
                    charName: char.name,
                    choiceName: cc.name
                  };
                  if (!success) {
                    if (correctChoice) {
                      Segment.trackWithProperties(
                        "character-quiz-card-choice-success",
                        trackProperties
                      );
                    } else {
                      Segment.trackWithProperties(
                        "character-quiz-card-choice-fail",
                        trackProperties
                      );
                    }
                  } else {
                    // user tries other choices after success
                    Segment.trackWithProperties(
                      "character-quiz-card-choice-success-continue",
                      trackProperties
                    );
                  }

                  this.setState({
                    success: success || correctChoice
                  });
                  cc.play();
                }}
              >
                <Text
                  style={[styles.choicesText, { fontSize: buttonTextSize }]}
                >
                  {cc.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {this.renderResultIcon(success, resultIconSize)}

        {success && (
          <TouchableOpacity style={styles.nextButton} onPress={gotoNext}>
            <MaterialCommunityIcons
              name="skip-next"
              size={nextSize}
              color={config.colors.success}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  }

  renderResultIcon(success, size) {
    switch (success) {
      case null:
        return null;
      case true:
        return (
          <Feather
            name="check-circle"
            size={size}
            color={config.colors.success}
          />
        );
      case false:
        return (
          <Feather name="x-circle" size={size} color={config.colors.error} />
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
    alignItems: "center",
    justifyContent: "center"
  },
  choicesText: {
    fontWeight: "bold",
    color: config.colors.text
  },
  nextButton: {
    position: "absolute",
    bottom: 10,
    right: 10
  }
});
