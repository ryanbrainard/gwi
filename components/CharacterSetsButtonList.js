import React from "react";
import { Button, View } from "react-native";
import CharacterSet from "../models/CharacterSet";
import PropTypes from "prop-types";

export default class CharacterSetsButtonList extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    onPressUrl: PropTypes.string.isRequired
  };

  render() {
    const { navigation, onPressUrl } = this.props;

    return (
      <View>
        {CharacterSet.all().map(charSet => (
          <Button
            key={charSet.key}
            title={charSet.name}
            onPress={() =>
              navigation.navigate(onPressUrl, {
                charSet: charSet
              })
            }
          />
        ))}
      </View>
    );
  }
}
