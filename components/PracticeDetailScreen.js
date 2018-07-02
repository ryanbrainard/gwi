import React from "react";
import CharacterGrid from "./CharacterGrid";
import { View } from "react-native";

// TODO: extract
const characterSets = {
  ㄱㄲㅋ: ["기", "키", "끼"],
  ㅅㅆ: ["삼", "쌈"]
};

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
