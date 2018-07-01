import React from "react";
import { StyleSheet, View, FlatList, SafeAreaView } from "react-native";
import CharacterTile from "./CharacterTile";

export default class App extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <FlatList
            data={[
              { key: "기", color: "red" },
              { key: "키", color: "orange" },
              { key: "끼", color: "yellow" },
              { key: "삼", color: "green" },
              { key: "쌈", color: "blue" }
            ]}
            renderItem={({ item }) => (
              <CharacterTile char={item.key} color={item.color} />
            )}
            numColumns={3}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center"
  }
});
