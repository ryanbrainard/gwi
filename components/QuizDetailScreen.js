import _ from "lodash";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CharacterQuizItem from "../models/CharacterQuizItem";
import CharacterQuizCarousel from "./CharacterQuizCarousel";
import QuizScore from "./QuizScore";

export default class QuizDetailScreen extends React.Component {
  // TODO: how to do prop types on navigation params

  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("charSet").name
  });

  constructor(props) {
    super(props);
    this.setCharacterItemState = this.setCharacterItemState.bind(this);
    this.restartQuiz = this.restartQuiz.bind(this);

    this.state = {
      items: this.initializeItems(),
      version: 0
    };
  }

  initializeItems() {
    return _.shuffle(
      this.props.navigation.getParam("charSet").characters
    ).reduce((items, char) => {
      const item = new CharacterQuizItem(char, this.setCharacterItemState);
      items[item.key] = item;
      return items;
    }, {});
  }

  setCharacterItemState(item) {
    this.setState(state => {
      const items = { ...state.items };
      items[item.key] = item;

      if (!item.success) {
        const newItem = new CharacterQuizItem(
          item.character,
          this.setCharacterItemState
        );
        items[newItem.key] = newItem;
      }

      return {
        items
      };
    });
  }

  restartQuiz() {
    this.setState(({ version }) => ({
      items: this.initializeItems(),
      version: version + 1
    }));
  }

  componentDidMount() {
    Object.values(this.state.items).forEach(item =>
      item.character.preloadPlay()
    );
  }

  render() {
    const { items, version } = this.state;

    const charItems = Object.values(items);
    const scoreItem = (
      <QuizScore items={charItems} restartQuiz={this.restartQuiz} />
    );
    const carouselItems = charItems.concat(scoreItem);

    return (
      <View key={version} style={styles.container}>
        <CharacterQuizCarousel items={carouselItems} />
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
