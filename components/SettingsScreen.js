import React from "react";
import { Switch, Text, View } from "react-native";
import Settings from "../models/Settings";

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "Settings"
  };

  constructor(props) {
    super(props);
    this.state = {
      settings: {}
    };
  }

  componentWillMount() {
    Settings.getAll().then(settings => {
      this.setState({ settings: settings });
    });
  }

  toggleFor(key) {
    return value => {
      Settings.set(key, value).then(() =>
        this.setState({
          settings: Object.assign(this.state.settings, {
            [key]: value
          })
        })
      );
    };
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {Object.entries(this.state.settings).map(([key, value]) => (
          <View key={key}>
            <Text>{key}</Text>
            <Switch
              onValueChange={this.toggleFor(key).bind(this)}
              value={value}
            />
          </View>
        ))}
      </View>
    );
  }
}
