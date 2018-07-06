import React from "react";
import CharacterSetsButtonList from "./CharacterSetsButtonList";

export default class QuizListScreen extends React.Component {
  static navigationOptions = {
    title: "Quiz"
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
