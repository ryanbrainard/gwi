import React from "react";
import { Button, View } from "react-native";
import PropTypes from "prop-types";
import CharacterSet from "../models/CharacterSet";

export default class PracticeDetailButton extends React.Component {
  static propTypes = {
    charSet: PropTypes.instanceOf(CharacterSet).isRequired
  };

  render() {
    // TODO: how do i not pass in navigation?
    const { charSet, navigation } = this.props;

    return (
      <View>
        <Button
          title={`${charSet.name}`}
          onPress={() =>
            navigation.navigate("PracticeDetail", {
              charSet: charSet
            })
          }
        />
      </View>
    );
  }
}
