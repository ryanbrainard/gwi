import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import CharacterGrid from "./components/CharacterGrid";

export default class App extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <CharacterGrid
          data={[
            { key: "기", color: "red" },
            { key: "키", color: "orange" },
            { key: "끼", color: "yellow" },
            { key: "삼", color: "green" },
            { key: "쌈", color: "blue" }
          ]}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  }
});
