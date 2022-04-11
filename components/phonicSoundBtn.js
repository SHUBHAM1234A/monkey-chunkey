import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Audio } from 'expo-av';

export default class PhonicSoundsBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pressButtonIndex: ""
    }
  }
  playSound = async (soundChunk) => {
    console.log(soundChunk);
    var soundLink =
      'https://s3-whitehatjrcontent.whjr.online/phones/' + soundChunk + '.mp3';
    await Audio.Sound.createAsync({ uri: soundLink }, { shouldPlay: true });
  };

  render() {
    return (
      <TouchableOpacity
        style={
          this.props.buttonIndex === this.state.pressButtonIndex
            ? [styles.chunkBtn, { backgroundColor: 'white' }]
            : [styles.chunkBtn, { backgroundColor: 'red' }]
        }
        onPress={() => {
          this.setState({
            pressButtonIndex: this.props.buttonIndex,
          });
          this.playSound(this.props.soundChunk);
        }}>
        <Text
          style={
            this.props.buttonIndex === this.state.pressButtonIndex
              ? [styles.displayText, { color: 'red' }]
              : [styles.displayText, { color: 'white' }]
          }>
          {this.props.wordChunk}
        </Text>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  displayText: {
    textAlign: 'center',
    fontSize: 30,
    margin: 0,
  },
  chunkBtn: {
    width: 100,
    height: 50,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3,
    backgroundColor: '#7d98c9',
    borderRadius: 10,
  },
});
