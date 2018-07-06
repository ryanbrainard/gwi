import React from "react";
import { Text, View } from "react-native";

export default class QuizDetailScreen extends React.Component {
  // TODO: how to do prop types on navigation params

  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("charSet").name
  });

  render() {
    const { navigation } = this.props;
    const charSet = navigation.getParam("charSet");

    return (
      <View style={{ flex: 1 }}>
        <Text>Quiz TODO</Text>
        <Text>{charSet.name}</Text>
      </View>
    );
  }
}
