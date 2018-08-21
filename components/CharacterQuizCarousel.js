import PropTypes from "prop-types";
import React from "react";
import { Dimensions, View } from "react-native";
import Carousel from "react-native-snap-carousel";
import Character from "../models/Character";
import CharacterQuizCard from "./CharacterQuizCard";

export default class CharacterQuizCarousel extends React.Component {
  static propTypes = {
    characters: PropTypes.arrayOf(PropTypes.instanceOf(Character)).isRequired
  };

  render() {
    const { characters } = this.props;
    const windowDims = Dimensions.get("window");

    return (
      <View style={{ height: windowDims.height * 0.75 }}>
        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          loop={true}
          sliderWidth={windowDims.width}
          itemWidth={windowDims.width * 0.9}
          data={characters}
          renderItem={({ item }) => (
            <CharacterQuizCard
              char={item}
              universe={item.group}
              gotoNext={this._carousel.snapToNext.bind(this._carousel)}
            />
          )}
          onLayout={() => characters[0].play()}
          onSnapToItem={index => characters[index].play()}
        />
      </View>
    );
  }
}
