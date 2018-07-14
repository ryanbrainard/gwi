import React from "react";
import { View } from "react-native";
import CharacterQuizCarousel from "./CharacterQuizCarousel";
import _ from "lodash";

export default class QuizDetailScreen extends React.Component {
  // TODO: how to do prop types on navigation params

  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("charSet").name
  });

  render() {
    const { navigation } = this.props;
    const charSet = navigation.getParam("charSet");

    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <CharacterQuizCarousel chars={_.shuffle(charSet.characters)} />
      </View>
    );
  }
}
