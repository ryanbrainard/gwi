import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { Segment } from "expo";
import PropTypes from "prop-types";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} from "react-native";
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
    const nextSize = buttonTextSize * 2.5;

    return (
      <View
        key={charItem.character.key + isPortrait}
        style={[styles.container, { padding: containerPadding }]}
      >
        <CharacterTile
          char={charItem.character}
          show={!!charItem.answered}
          size={Math.min(width, height) * 0.3}
        />
        <View
          style={[
            styles.choicesContainer,
            { flexDirection: isPortrait ? "column" : "row" }
          ]}
        >
          {charItem.choices.map(choice => {
            const correctChoice = choice === charItem.character;

            return (
              <TouchableHighlight
                key={choice.key}
                style={[
                  styles.choicesButton,
                  {
                    backgroundColor:
                      choice === charItem.answered
                        ? charItem.success
                          ? config.colors.success
                          : config.colors.error
                        : config.colors.neutral,
                    borderRadius: buttonWidth,
                    width: buttonWidth,
                    height: buttonHeight,
                    margin: buttonMargin
                  }
                ]}
                activeOpacity={0.4}
                underlayColor={
                  charItem.answered
                    ? correctChoice
                      ? config.colors.success
                      : config.colors.error
                    : config.colors.neutral
                }
                onPress={() => {
                  choice.play();

                  Segment.trackWithProperties("character-quiz-card-choice", {
                    charName: charItem.character.name,
                    choiceName: choice.name,
                    success: correctChoice,
                    previouslyAnswered: !!charItem.answered
                  });

                  if (!charItem.answered) {
                    charItem.answered = choice;
                  }
                }}
              >
                <Text
                  style={[styles.choicesText, { fontSize: buttonTextSize }]}
                >
                  {choice.name}
                </Text>
              </TouchableHighlight>
            );
          })}
        </View>

        {this.renderResultIcon(charItem.success, resultIconSize)}

        {charItem.answered && (
          <TouchableOpacity style={styles.nextButton} onPress={gotoNext}>
            <MaterialCommunityIcons
              name="skip-next"
              size={nextSize}
              color={config.colors.neutral}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  }

  renderResultIcon(success, size) {
    switch (success) {
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
