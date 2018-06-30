import React from 'react';
import Expo from 'expo';
import PropTypes from 'prop-types';
import { StyleSheet, Button, View } from 'react-native';
import assets from './assets'

export default class CharacterTile extends React.Component {
    static propTypes = {
      char: PropTypes.string,
    };

    render() {
        const { char } = this.props;

        return (
            <View style={styles.container}>
                <Button
                    title={char}
                    onPress={()=> {
                        Expo.Audio.Sound.create(
                            assets.sounds[char],
                            { shouldPlay: true }
                        );
                    }}
                />
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
