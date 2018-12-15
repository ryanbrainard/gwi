import PropTypes from "prop-types";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import config from "../config";
import CharacterSet from "../models/CharacterSet";
import { DimensionsConsumer } from "./DimensionsContext";

export default class CharacterSetsButtonList extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    onPressUrl: PropTypes.string.isRequired
  };

  render() {
    return (
      <DimensionsConsumer>
        {({ window: { width, height }, isPortrait }) =>
          this.renderInternal(Math.min(width, height), isPortrait)
        }
      </DimensionsConsumer>
    );
  }

  renderInternal(size, isPortrait) {
    const { navigation, onPressUrl } = this.props;
    const numCols = isPortrait ? 2 : 3;
    const buttonSize = size / 4;
    const buttonFontSize = buttonSize / 5;
    const buttonMargin = buttonSize / 5;

    return (
      <ColorsContext.Consumer>
        {colors => (
          <FlatList
            key={numCols}
            data={CharacterSet.list()}
            renderItem={({ item: charSet }) => (
              <TouchableOpacity
                key={charSet.key}
                style={[
                  styles.button,
                  {
                    backgroundColor: colors.primary,
                    borderRadius: buttonSize,
                    width: buttonSize,
                    height: buttonSize,
                    margin: buttonMargin
                  }
                ]}
                onPress={() =>
                  navigation.navigate(onPressUrl, {
                    charSet: charSet
                  })
                }
              >
                <Text style={[styles.text, { fontSize: buttonFontSize }]}>
                  {charSet.name}
                </Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.container}
            numColumns={numCols}
          />
        )}
      </ColorsContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20
  },
  button: {
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontWeight: "bold",
    color: config.colors.text
  }
});
