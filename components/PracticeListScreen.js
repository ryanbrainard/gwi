import React from "react";
import CharacterSetsButtonList from "./CharacterSetsButtonList";

export default class PracticeListScreen extends React.Component {
  static navigationOptions = {
    title: "Practice"
  };

  render() {
    const { navigation } = this.props;

    return (
      <CharacterSetsButtonList
        navigation={navigation}
        onPressUrl="PracticeDetail"
      />
    );
  }
}
