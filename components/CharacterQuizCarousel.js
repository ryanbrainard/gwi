import _ from "lodash";
import PropTypes from "prop-types";
import React from "react";
import { Dimensions, View } from "react-native";
import Carousel from "react-native-snap-carousel";
import CharacterSet from "../models/CharacterSet";
import CharacterQuizCard from "./CharacterQuizCard";

export default class CharacterQuizCarousel extends React.Component {
  static propTypes = {
    charSet: PropTypes.instanceOf(CharacterSet).isRequired
  };

  render() {
    const { charSet } = this.props;
    const items = _.shuffle(charSet.charsWithGroups());
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
          data={items}
          renderItem={({ item: [char, group] }) => (
            <CharacterQuizCard
              char={char}
              universe={group}
              gotoNext={this._carousel.snapToNext.bind(this._carousel)}
            />
          )}
          onLayout={() => items[0][0].play()}
          onSnapToItem={index => items[index][0].play()}
        />
      </View>
    );
  }
}
