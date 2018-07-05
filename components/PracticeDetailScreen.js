import React from "react";
import CharacterGrid from "./CharacterGrid";
import { View } from "react-native";

export default class PracticeDetailScreen extends React.Component {
  // TODO: how to do prop types on navigation params

  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("charSet").name
  });

  render() {
    const { navigation } = this.props;
    const charSet = navigation.getParam("charSet");

    return (
      <View style={{ flex: 1 }}>
        <CharacterGrid charSet={charSet} />
      </View>
    );
  }
}
