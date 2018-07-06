import React from "react";
import { Text, View } from "react-native";

export default class AboutScreen extends React.Component {
  static navigationOptions = {
    title: "About"
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>TODO</Text>
      </View>
    );
  }
}
