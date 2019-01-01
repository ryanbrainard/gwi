import _ from "lodash";
import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, View } from "react-native";
import CharacterQuizItem from "../models/CharacterQuizItem";
import CharacterQuizCarousel from "./CharacterQuizCarousel";
import QuizScore from "./QuizScore";

export default class QuizDetailScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    _shuffle: PropTypes.func,
    _genKey: PropTypes.func
  };

  static defaultProps = {
    _shuffle: _.shuffle,
    _genKey: undefined // use default of CharacterQuizItem
  };

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

  initializeItem(char) {
    const { _shuffle, _genKey } = this.props;

    return new CharacterQuizItem(
      char,
      this.setCharacterItemState,
      _genKey,
      _shuffle
    );
  }

  initializeItems() {
    const { navigation, _shuffle, _genKey } = this.props;

    return _shuffle(navigation.getParam("charSet").characters).reduce(
      (items, char) => {
        const item = this.initializeItem(char);
        items[item.key] = item;
        return items;
      },
      {}
    );
  }

  setCharacterItemState(item) {
    const { _shuffle, _genKey } = this.props;

    this.setState(state => {
      const items = { ...state.items };
      items[item.key] = item;

      if (!item.success) {
        const newItem = this.initializeItem(item.character);
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
