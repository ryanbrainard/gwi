import React from "react";
import { View } from "react-native";
import config from "../config";
import CharacterGrid from "./CharacterGrid";

export default class PracticeDetailScreen extends React.Component {
  componentDidMount() {
    this.props.navigation
      .getParam("charSet")
      .characters.forEach(char => char.preloadPlay());
  }

  render() {
    const { navigation } = this.props;
    const charSet = navigation.getParam("charSet");

    return (
      <View style={{ flex: 1 }}>
        <CharacterGrid
          chars={charSet.characters}
          color={config.colors.practice.primary}
        />
      </View>
    );
  }
}
