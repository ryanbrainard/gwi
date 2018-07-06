import PropTypes from "prop-types";
import React from "react";
import { Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel";
import Character from "../models/Character";
import CharacterQuizCard from "./CharacterQuizCard";

export default class CharacterQuizCarousel extends React.Component {
  static propTypes = {
    chars: PropTypes.arrayOf(PropTypes.instanceOf(Character)).isRequired
  };

  render() {
    const { chars } = this.props;
    const windowDims = Dimensions.get("window");

    return (
      <Carousel
        ref={c => {
          this._carousel = c;
        }}
        sliderWidth={windowDims.width * 0.9}
        // sliderHeight={windowDims.height * 0.9}
        itemWidth={windowDims.width * 0.7}
        // itemHeight={windowDims.height * 0.7}
        data={chars}
        renderItem={({ item, index }) => (
          <CharacterQuizCard
            char={item}
            gotoNext={this._carousel.snapToNext.bind(this._carousel)}
          />
        )}
        onLayout={() => chars[0].play()}
        onSnapToItem={index => chars[index].play()}
      />
    );
  }
}
