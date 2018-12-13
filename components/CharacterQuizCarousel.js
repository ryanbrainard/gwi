import PropTypes from "prop-types";
import React from "react";
import { View } from "react-native";
import Carousel from "react-native-snap-carousel";
import Character from "../models/Character";
import CharacterQuizCard from "./CharacterQuizCard";
import { DimensionsConsumer } from "./DimensionsContext";

export default class CharacterQuizCarousel extends React.Component {
  static propTypes = {
    characters: PropTypes.arrayOf(PropTypes.instanceOf(Character)).isRequired
  };

  render() {
    const { characters } = this.props;

    return (
      <DimensionsConsumer>
        {({ window: { width, height } }) =>
          this.renderInternal(width, height, characters)
        }
      </DimensionsConsumer>
    );
  }

  renderInternal(width, height, characters) {
    return (
      <View style={{ height: height * 0.8 }}>
        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          loop={true}
          sliderWidth={width}
          itemWidth={width * 0.9}
          data={characters}
          renderItem={({ item }) => (
            <CharacterQuizCard
              char={item}
              universe={item.group}
              gotoNext={this._carousel.snapToNext.bind(this._carousel)}
            />
          )}
          onLayout={this.playFirstOnce.bind(this)}
          onSnapToItem={index => characters[index].play()}
        />
      </View>
    );
  }

  playFirstOnce() {
    if (this.playedFirstOnce) {
      return;
    }
    this.props.characters[0].play();
    this.playedFirstOnce = true;
  }
}
