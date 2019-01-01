import PropTypes from "prop-types";
import React from "react";
import { View } from "react-native";
import Carousel from "react-native-snap-carousel";
import CharacterQuizItem from "../models/CharacterQuizItem";
import CharacterQuizCard from "./CharacterQuizCard";
import { DimensionsConsumer } from "./DimensionsContext";

export default class CharacterQuizCarousel extends React.Component {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.instanceOf(CharacterQuizItem),
        PropTypes.element
      ])
    ).isRequired
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
    const batchSize = 2;

    return (
      <View style={{ height: height * 0.8 }}>
        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          loop={false}
          sliderWidth={width}
          itemWidth={width * 0.9}
          initialNumToRender={batchSize}
          maxToRenderPerBatch={batchSize}
          windowSize={batchSize}
          data={items}
          renderItem={({ item }) => {
            if (item instanceof CharacterQuizItem) {
              return (
                <CharacterQuizCard
                  charItem={item}
                  gotoNext={this._carousel.snapToNext.bind(this._carousel)}
                />
              );
            } else {
              return item;
            }
          }}
          onLayout={this.playFirstOnce}
          onSnapToItem={index => {
            if (items[index] instanceof CharacterQuizItem) {
              return items[index].character.play();
            }
          }}
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
