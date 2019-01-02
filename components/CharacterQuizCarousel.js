import PropTypes from "prop-types";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import Carousel from "react-native-snap-carousel";
import config from "../config";
import CharacterQuizItem from "../models/CharacterQuizItem";
import CharacterQuizCard from "./CharacterQuizCard";

export default class CharacterQuizCarousel extends React.Component {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.instanceOf(CharacterQuizItem),
        PropTypes.element
      ])
    ).isRequired,
    parentLayout: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number
    })
  };

  constructor(props) {
    super(props);
    this.playFirstOnce = this.playFirstOnce.bind(this);
  }

  render() {
    const batchSize = 2;
    const { items, parentLayout } = this.props;

    if (!parentLayout) {
      return (
        <ActivityIndicator size="large" color={config.colors.quiz.primary} />
      );
    }

    const itemHeight = parentLayout.height * 0.9;
    const itemWidth = parentLayout.width * 0.9;
    const itemLayout = { height: itemHeight, width: itemWidth };

    return (
      <View style={{ height: itemHeight }}>
        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          loop={false}
          sliderWidth={parentLayout.width}
          itemWidth={itemWidth}
          initialNumToRender={batchSize}
          maxToRenderPerBatch={batchSize}
          windowSize={batchSize}
          data={items}
          renderItem={({ item }) => {
            if (item instanceof CharacterQuizItem) {
              return (
                <CharacterQuizCard
                  charItem={item}
                  parentLayout={itemLayout}
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
