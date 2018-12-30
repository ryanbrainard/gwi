import _ from "lodash";
import React from "react";
import { StyleSheet, View } from "react-native";
import CharacterQuizItem from "../models/CharacterQuizItem";
import CharacterQuizCarousel from "./CharacterQuizCarousel";

export default class QuizDetailScreen extends React.Component {
  // TODO: how to do prop types on navigation params

  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("charSet").name
  });

  constructor(props) {
    super(props);
    this.setCharacterState = this.setCharacterState.bind(this);

    this.state = {
      items: _.shuffle(
        this.props.navigation
          .getParam("charSet")
          .characters.reduce((items, char) => {
            const item = new CharacterQuizItem(char, this.setCharacterState);
            items[char.key] = item;
            return items;
          }, {})
      )
    };
  }

  setCharacterState(char) {
    this.setState(state => {
      const items = { ...state.items };
      items[char.key] = char;
      return {
        items
      };
    });
  }

  componentDidMount() {
    this.props.navigation
      .getParam("charSet")
      .characters.forEach(char => char.preloadPlay());
  }

  render() {
    return (
      <View style={styles.container}>
        <CharacterQuizCarousel items={Object.values(this.state.items)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
