import React from "react";
import PracticeDetailButton from "./PracticeDetailButton";
import { View } from "react-native";

export default class PracticeListScreen extends React.Component {
  static navigationOptions = {
    title: "Practice"
  };

  render() {
    const { navigation } = this.props;

    return (
      <View>
        <PracticeDetailButton
          characterSetName="ㄱㄲㅋ"
          navigation={navigation}
        />
        <PracticeDetailButton characterSetName="ㅅㅆ" navigation={navigation} />
      </View>
    );
  }
}
