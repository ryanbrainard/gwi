import PropTypes from "prop-types";
import React from "react";
import CharacterSetsButtonList from "./CharacterSetsButtonList";

export default class PracticeListScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

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
