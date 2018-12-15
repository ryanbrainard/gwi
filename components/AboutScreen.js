import React from "react";
import {
  Linking,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Segment } from "expo";
import config from "../config";
import { DimensionsConsumer } from "./DimensionsContext";
import appJson from "../app.json";

export default class AboutScreen extends React.Component {
  static navigationOptions = {
    title: "About"
  };

  render() {
    return (
      <DimensionsConsumer>
        {({ window: { width, height }, isPortrait }) =>
          this.renderInternal(Math.min(width, height), isPortrait)
        }
      </DimensionsConsumer>
    );
  }

  renderInternal(size, isPortrait) {
    const logoSize = size / 2.5;

    const LinkButton = ({ text, href }) => (
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          Linking.openURL(href);
          Segment.trackWithProperties("about-link-button-press", {
            text,
            href
          });
        }}
      >
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    );

    return (
      <View style={styles.container}>
        <Image
          source={require("../assets/images/gwi-logo-green-trans-1200.png")}
          style={{ width: logoSize, height: logoSize }}
        />
        <Text style={styles.titleText}>{appJson.expo.name}</Text>
        <Text>Made in cooperation with Motivate Korean</Text>
        <Text>Apache License 2.0 Open Source Licensed</Text>
        <Text>© 2018 Ryan Brainard</Text>
        <Text>v{appJson.expo.version}</Text>
        <Text />
        <View
          style={[
            styles.bodyContainer,
            { flexDirection: isPortrait ? "column" : "row" }
          ]}
        >
          <LinkButton
            text="Korean Coaching"
            href="http://www.motivatekorean.com/hire-us"
          />
          <LinkButton
            text="Report an Issue"
            href={`${appJson.expo.githubUrl}/issues`}
          />
          <LinkButton text="Source Code" href={appJson.expo.githubUrl} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  bodyContainer: {
    flex: 1,
    alignItems: "center"
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold"
  },
  button: {
    backgroundColor: config.colors.about.primary,
    borderRadius: 75,
    padding: 12,
    justifyContent: "center",
    margin: 10
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 14,
    color: config.colors.text
  }
});
