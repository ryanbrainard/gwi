import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { Segment } from "expo";
import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import config from "../config";
import CharacterQuizItem from "../models/CharacterQuizItem";
import CharacterTile from "./CharacterTile";
import { DimensionsConsumer } from "./DimensionsContext";

export default class CharacterQuizCard extends React.PureComponent {
  static propTypes = {
    charItem: PropTypes.instanceOf(CharacterQuizItem).isRequired,
    gotoNext: PropTypes.func
  };

  render() {
    const { charItem, gotoNext } = this.props;

    return (
      <DimensionsConsumer>
        {({ isPortrait, window: { width, height } }) =>
          this.renderInternal(isPortrait, width, height, charItem, gotoNext)
        }
      </DimensionsConsumer>
    );
  }

  renderInternal(isPortrait, width, height, charItem, gotoNext) {
    const containerPadding = Math.min(width, height) / 10;
    const buttonWidth = Math.min(width, height) / 5;
    const buttonHeight = buttonWidth / 2;
    const buttonTextSize = buttonWidth / 5;
    const buttonMargin = buttonWidth / 5;
    const resultIconSize = buttonTextSize * 2;
    const nextSize = buttonTextSize * 1.5;

    return (
      <View
        key={charItem.character.key + isPortrait}
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
          {charItem.choices.map(cc => {
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
