import React from "react";
import { View } from "react-native";
import CharacterQuiz from "./CharacterQuiz";

export default class QuizDetailScreen extends React.Component {
  // TODO: how to do prop types on navigation params

  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("charSet").name
  });

  render() {
    const { navigation } = this.props;
    const charSet = navigation.getParam("charSet");

    // TODO: allow user to flip through cards
    return (
      <View style={{ flex: 1 }}>
        <CharacterQuiz
          char={charSet.characters[0]}
          charUniverse={charSet.characters}
        />
      </View>
    );
  }
}
