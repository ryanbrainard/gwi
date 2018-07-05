import React from "react";
import PracticeDetailButton from "./PracticeDetailButton";
import { View } from "react-native";
import CharacterSet from "../models/CharacterSet";

export default class PracticeListScreen extends React.Component {
  static navigationOptions = {
    title: "Practice"
  };

  render() {
    const { navigation } = this.props;

    return (
      <View>
        {CharacterSet.all().map(charSet => (
          <PracticeDetailButton
            key={charSet.key}
            charSet={charSet}
            navigation={navigation}
          />
        ))}
      </View>
    );
  }
}
