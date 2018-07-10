import PropTypes from "prop-types";
import React from "react";
import { Dimensions, View } from "react-native";
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
      <View style={{ height: windowDims.height * 0.7 }}>
        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          loop={true}
          sliderWidth={windowDims.width}
          itemWidth={windowDims.width * 0.8}
          data={chars}
          renderItem={({ item, index }) => (
            <CharacterQuizCard
              char={item}
              universe={chars}
              gotoNext={this._carousel.snapToNext.bind(this._carousel)}
            />
          )}
          onLayout={() => chars[0].play()}
          onSnapToItem={index => chars[index].play()}
        />
      </View>
    );
  }
}
