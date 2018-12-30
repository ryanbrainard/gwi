import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import _ from "lodash";
import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import config from "../config";
import CharacterQuizItem from "../models/CharacterQuizItem";
import Settings from "../models/Settings";
import CharacterTile from "./CharacterTile";
import { DimensionsConsumer } from "./DimensionsContext";
import { Segment } from "expo";

export default class CharacterQuizCard extends React.Component {
  static propTypes = {
    charItem: PropTypes.instanceOf(CharacterQuizItem).isRequired,
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
      charChoices: this.generateChoices()
    };
  }

  generateChoices() {
    const { charItem, numChoices, _shuffle } = this.props;

    const others = charItem.character.group.filter(
      cu => cu !== charItem.character
    );
    const shuffledOthers = _shuffle(others);
    const enoughShuffledOthers = shuffledOthers.slice(0, numChoices - 1);
    const choices = enoughShuffledOthers.concat(charItem.character);
    const shuffledChoices = _shuffle(choices);

    return shuffledChoices;
  }

  render() {
    const { charItem, gotoNext } = this.props;
    const { charChoices } = this.state;

    return (
      <DimensionsConsumer>
        {({ isPortrait, window: { width, height } }) =>
          this.renderInternal(
            isPortrait,
            width,
            height,
            charItem,
            gotoNext,
            charChoices
          )
        }
      </DimensionsConsumer>
    );
  }

  renderInternal(isPortrait, width, height, charItem, gotoNext, charChoices) {
    const containerPadding = Math.min(width, height) / 10;
    const buttonWidth = Math.min(width, height) / 5;
    const buttonHeight = buttonWidth / 2;
    const buttonTextSize = buttonWidth / 5;
    const buttonMargin = buttonWidth / 5;
    const resultIconSize = buttonTextSize * 2;
    const nextSize = buttonTextSize * 1.5;

    return (
      <View
        key={charItem.character.toString() + isPortrait}
        style={[styles.container, { padding: containerPadding }]}
      >
        <CharacterTile
          char={charItem.character}
          show={!!charItem.success}
          size={Math.min(width, height) * 0.3}
        />
        <View
          style={[
            styles.choicesContainer,
            { flexDirection: isPortrait ? "column" : "row" }
          ]}
        >
          {charChoices.map(cc => {
            const correctChoice = cc === charItem.character;
            return (
              <TouchableOpacity
                key={cc.key}
                style={[
                  styles.choicesButton,
                  {
                    backgroundColor:
                      correctChoice && charItem.success
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
                    charName: charItem.character.name,
                    choiceName: cc.name
                  };
                  if (!charItem.success) {
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

                  charItem.success = charItem.success || correctChoice;
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

        {this.renderResultIcon(charItem.success, resultIconSize)}

        {charItem.success && (
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
