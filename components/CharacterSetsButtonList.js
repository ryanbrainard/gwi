import PropTypes from "prop-types";
import React from "react";
import { Button, View } from "react-native";
import CharacterSet from "../models/CharacterSet";

export default class CharacterSetsButtonList extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    onPressUrl: PropTypes.string.isRequired
  };

  render() {
    const { navigation, onPressUrl } = this.props;

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {CharacterSet.list().map(charSet => (
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
