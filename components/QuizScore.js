import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import config from "../config";
import CharacterQuizItem from "../models/CharacterQuizItem";

export default class QuizScore extends React.PureComponent {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.instanceOf(CharacterQuizItem))
      .isRequired,
    restartQuiz: PropTypes.func.isRequired
  };

  render() {
    const { items, restartQuiz } = this.props;

    const numSuccess = items.reduce((sum, item) => {
      return sum + (item.success ? 1 : 0);
    }, 0);

    const numAnswered = items.reduce((sum, item) => {
      return sum + (item.answered ? 1 : 0);
    }, 0);

    const percSuccess =
      numAnswered === 0 ? 0 : Math.round((numSuccess / numAnswered) * 100);

    const difficultChars = Object.entries(
      items.reduce((stats, item) => {
        if (item.answered && !item.success) {
          stats[item.char.name] = (stats[item.char.name] || 0) + 1;
        }
        return stats;
      }, {})
    )
      .sort((a, b) => b[1] - a[1])
      .map(e => e[0]);

    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>{percSuccess}%</Text>
        <Text>
          ({numSuccess} / {numAnswered})
        </Text>
        <Text>{}</Text>
        <Text>{}</Text>
        {difficultChars.length > 0 && (
          <View style={styles.difficultCharsContainer}>
            <Text>Most difficult characters:</Text>
            <Text>{difficultChars.slice(0, 5).join(", ")}</Text>
            <Text>{}</Text>
            <Text>{}</Text>
          </View>
        )}
        <TouchableOpacity style={styles.button} onPress={restartQuiz}>
          <Text style={styles.buttonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  difficultCharsContainer: {
    alignItems: "center"
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold"
  },
  button: {
    backgroundColor: config.colors.about.primary,
    borderRadius: 75,
    padding: 12,
    justifyContent: "center",
    margin: 10
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 14,
    color: config.colors.text
  }
});
