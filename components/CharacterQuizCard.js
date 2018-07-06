import { Feather } from "@expo/vector-icons";
import PropTypes from "prop-types";
import React from "react";
import { Button, StyleSheet, View } from "react-native";
import Character from "../models/Character";
import CharacterTile from "./CharacterTile";

export default class CharacterQuizCard extends React.Component {
  static propTypes = {
    char: PropTypes.instanceOf(Character).isRequired,
    gotoNext: PropTypes.func,
    numChoices: PropTypes.number
  };

  static defaultProps = {
    numChoices: 3
  };

  constructor(props) {
    super(props);
    const { char, numChoices } = this.props;
    this.state = {
      charChoices: char.choices(numChoices),
      success: undefined
    };
  }

  render() {
    const { char, gotoNext } = this.props;
    const { charChoices, success } = this.state;

    return (
      <View style={styles.container}>
        <CharacterTile
          char={char}
          content={<Feather name="play-circle" size={76} />}
        />

        {charChoices.map(cc => (
          <Button
            key={cc.key}
            title={cc.name}
            onPress={() => {
              cc.play();
              this.setState({ success: cc === char });
            }}
          />
        ))}

        {this.renderSuccess(success)}

        {success && gotoNext && <Button title="Next" onPress={gotoNext} />}
      </View>
    );
  }

  renderSuccess(success) {
    switch (success) {
      case null:
        return null;
      case true:
        return <Feather name="check-circle" size={48} color="#3F681C" />;
      case false:
        return <Feather name="x-circle" size={48} color="tomato" />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center"
  }
});
