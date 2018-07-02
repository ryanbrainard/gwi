import React from "react";
import CharacterGrid from "./CharacterGrid";
import { View } from "react-native";
import characterSets from "../characterSets";

export default class PracticeDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("characterSetName")
  });

  render() {
    const { navigation } = this.props;
    const characterSetName = navigation.getParam("characterSetName");
    const characterSet = characterSets[characterSetName];

    return (
      <View style={{ flex: 1 }}>
        <CharacterGrid characterSet={characterSet} />
      </View>
    );
  }
}
