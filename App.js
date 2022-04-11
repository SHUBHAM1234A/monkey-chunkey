import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Header } from "react-native-elements";
import db from "./localdb";
import PhonicSoundsBtn from "./components/phonicSoundBtn";
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      text: "",
      chunks: [],
      phonicSounds: [],
    };
  }
  render() {
    return (
      <SafeAreaProvider>
        <View style={styles.container}>
          <Header
            backgroundColor={"#7d98c9"}
            centerComponent={{
              text: "Monkey Chunky",
              style: { color: "#fff", fontSize: 20 },
            }}
          />
          <Image
            style={styles.imgIcon}
            source={{
              uri: "https://www.shareicon.net/data/128x128/2015/08/06/80805_face_512x512.png",
            }}
          />
          <TextInput
            onChangeText={(text) => {
              this.setState({
                text: text,
              });
            }}
            value={this.state.text}
            style={styles.input}
          />
          <Text style={styles.displayText}>{this.state.displayText}</Text>
          <TouchableOpacity
            style={styles.goBtn}
            onPress={() => {
              var word = this.state.text.toLocaleLowerCase();

              db[word]
                ? (this.setState({
                    chunks: db[word].chunks,
                  }),
                  this.setState({
                    phonicSounds: db[word].phones,
                  }))
                : Alert.alert("The word does not exist in our database");
            }}
          >
            <Text style={styles.btnText}> GO </Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", alignSelf: "center" }}>
            {this.state.chunks.map((item, index) => {
              return (
                <PhonicSoundsBtn
                  wordChunk={this.state.chunks[index]}
                  soundChunk={this.state.phonicSounds[index]}
                  buttonIndex={index}
                />
              );
            })}
          </View>
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b8b8b8",
  },
  input: {
    marginTop: 20,
    width: "80%",
    alignSelf: "center",
    height: 40,
    textAlign: "center",
    borderWidth: 20,
    outline: "none",
  },
  goBtn: {
    width: "50%",
    height: 55,
    alignSelf: "center",
    padding: 8,
    marginTop: 30,
    marginBottom: 30,
    backgroundColor: "#797979",
    borderRadius: 30,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },

  imgIcon: {
    width: 150,
    height: 150,
    marginLeft: "27%",
  },
});
