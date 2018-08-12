import { Feather } from "@expo/vector-icons";
import _ from "lodash";
import PropTypes from "prop-types";
import React from "react";
import { Button, StyleSheet, View } from "react-native";
import Character from "../models/Character";
import CharacterTile from "./CharacterTile";
import Settings from "../models/Settings";

export default class CharacterQuizCard extends React.Component {
  static propTypes = {
    char: PropTypes.instanceOf(Character).isRequired,
    universe: PropTypes.arrayOf(PropTypes.instanceOf(Character)).isRequired,
    gotoNext: PropTypes.func,
    numChoices: PropTypes.number,
    _shuffle: PropTypes.func
  };

  static defaultProps = {
    numChoices: 3,
    _shuffle: _.shuffle
  };

  constructor(props) {
    super(props);

    this.state = {
      charChoices: this.generateChoices(),
      success: undefined
    };
  }

  generateChoices() {
    const { char, universe, numChoices, _shuffle } = this.props;

    const others = universe.filter(cu => cu !== char);
    const shuffledOthers = _shuffle(others);
    const enoughShuffledOthers = shuffledOthers.slice(0, numChoices - 1);
    const choices = enoughShuffledOthers.concat(char);
    const shuffledChoices = _shuffle(choices);

    return shuffledChoices;
  }

  componentDidUpdate(_, prevState) {
    if (this.props.gotoNext && this.state.success && !prevState.success) {
      Settings.get(Settings.KEYS.ADVANCE_ON_SUCCESS).then(
        setting => setting && this.props.gotoNext()
      );
    }
  }

  render() {
    const { char, gotoNext } = this.props;
    const { charChoices, success } = this.state;

    return (
      <View style={styles.container}>
        <CharacterTile char={char} show={!!success} />

        {charChoices.map(cc => {
          const ccSuccess = cc === char;
          return (
            <Button
              key={cc.key}
              title={cc.name}
              onPress={() => {
                if (!ccSuccess) {
                  cc.play();
                }
                this.setState({ success: ccSuccess });
              }}
            />
          );
        })}

        {this.renderSuccess(success)}
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
