import PropTypes from "prop-types";
import React from "react";
import config from "../config";
import CharacterSetsButtonList from "./CharacterSetsButtonList";

export default class QuizListScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  static navigationOptions = {
    title: "Quiz"
  };

  render() {
    const { navigation } = this.props;

    return (
      <CharacterSetsButtonList
        navigation={navigation}
        onPressUrl="QuizDetail"
        color={config.colors.quiz.primary}
      />
    );
  }
}
