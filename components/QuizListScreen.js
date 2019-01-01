import PropTypes from "prop-types";
import React from "react";
import CharacterSetsButtonList from "./CharacterSetsButtonList";

export default class QuizListScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  render() {
    const { navigation } = this.props;

    return (
      <CharacterSetsButtonList
        navigation={navigation}
        onPressUrl="QuizDetail"
      />
    );
  }
}
