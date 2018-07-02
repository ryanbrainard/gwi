import React from "react";
import { Button, View } from "react-native";

export default class PracticeDetailButton extends React.Component {
  render() {
    // TODO: how do i not pass in navigation?
    const { characterSetName, navigation } = this.props;

    return (
      <View>
        <Button
          title={`${characterSetName}`}
          onPress={() =>
            navigation.navigate("PracticeDetail", {
              characterSetName: characterSetName
            })
          }
        />
      </View>
    );
  }
}
