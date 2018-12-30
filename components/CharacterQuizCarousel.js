import PropTypes from "prop-types";
import React from "react";
import { View } from "react-native";
import Carousel from "react-native-snap-carousel";
import CharacterQuizItem from "../models/CharacterQuizItem";
import CharacterQuizCard from "./CharacterQuizCard";
import { DimensionsConsumer } from "./DimensionsContext";

export default class CharacterQuizCarousel extends React.Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.instanceOf(CharacterQuizItem)).isRequired
  };

  constructor(props) {
    super(props);
    this.playFirstOnce = this.playFirstOnce.bind(this);
  }

  render() {
    const { items } = this.props;

    return (
      <DimensionsConsumer>
        {({ window: { width, height } }) =>
          this.renderInternal(width, height, items)
        }
      </DimensionsConsumer>
    );
  }

  renderInternal(width, height, items) {
    return (
      <View style={{ height: height * 0.8 }}>
        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          loop={true}
          sliderWidth={width}
          itemWidth={width * 0.9}
          data={items}
          renderItem={({ item }) => (
            <CharacterQuizCard
              charItem={item}
              gotoNext={this._carousel.snapToNext.bind(this._carousel)}
            />
          )}
          onLayout={this.playFirstOnce}
          onSnapToItem={index => items[index].character.play()}
        />
      </View>
    );
  }

  // TODO: find a more elegant way to deal w/ this
  playFirstOnce() {
    if (this.playedFirstOnce) {
      return;
    }
    this.props.items[0].character.play();
    this.playedFirstOnce = true;
  }
}
