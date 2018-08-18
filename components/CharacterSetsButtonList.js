import PropTypes from "prop-types";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import config from "../config";
import CharacterSet from "../models/CharacterSet";

export default class CharacterSetsButtonList extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    onPressUrl: PropTypes.string.isRequired
  };

  render() {
    const { navigation, onPressUrl } = this.props;

    return (
      <View style={styles.container}>
        {CharacterSet.list().map(charSet => (
          <TouchableOpacity
            key={charSet.key}
            style={styles.button}
            onPress={() =>
              navigation.navigate(onPressUrl, {
                charSet: charSet
              })
            }
          >
            <Text style={styles.text}>{charSet.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 100
  },
  button: {
    backgroundColor: config.colors.primary,
    borderRadius: 75,
    width: 75,
    height: 75,
    alignItems: "center",
    justifyContent: "center",
    margin: 10
  },
  text: {
    fontWeight: "bold",
    fontSize: 18,
    color: config.colors.text
  }
});
