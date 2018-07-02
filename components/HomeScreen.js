import React from "react";
import { Button, View } from "react-native";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Home"
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button
          title="Practice"
          onPress={() => this.props.navigation.navigate("PracticeList")}
        />
        <Button
          title="Quiz"
          onPress={() => this.props.navigation.navigate("QuizList")}
        />
      </View>
    );
  }
}
