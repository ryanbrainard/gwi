import React from 'react';
import { StyleSheet, View } from 'react-native';
import CharacterTile from "./CharacterTile";

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <CharacterTile char='키'/>
                <CharacterTile char='끼'/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
