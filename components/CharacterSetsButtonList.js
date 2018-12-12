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
        {({ isPortrait }) => this.renderInternal(isPortrait)}
      </DimensionsConsumer>
    );
  }

  renderInternal(isPortrait) {
    const { navigation, onPressUrl } = this.props;
    const numCols = isPortrait ? 2 : 3;

    return (
      <ColorsContext.Consumer>
        {colors => (
          <FlatList
            key={numCols}
            data={CharacterSet.list()}
            renderItem={({ item: charSet }) => (
              <TouchableOpacity
                key={charSet.key}
                style={[styles.button, { backgroundColor: colors.primary }]}
                onPress={() =>
                  navigation.navigate(onPressUrl, {
                    charSet: charSet
                  })
                }
              >
                <Text style={styles.text}>{charSet.name}</Text>
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
    borderRadius: 75,
    width: 75,
    height: 75,
    alignItems: "center",
    justifyContent: "center",
    margin: 20
  },
  text: {
    fontWeight: "bold",
    fontSize: 18,
    color: config.colors.text
  }
});
