import React from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableHighlight,
  ScrollView
} from "react-native";
import {
  Header,
  Button,
  Icon,
  Text,
  ListItem,
  Divider
} from "react-native-elements";
import { defaultStyles } from "./styles";

const styles = StyleSheet.create({
  ...defaultStyles,
  container: {
    display: "flex"
  }
});

export default class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [1, 2, 3, 4, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    };
  }

  handleMemePress = meme => {};

  render() {
    const { images } = this.state;

    return (
      <View>
        <Header leftComponent={{ icon: "menu", color: "#fff" }} />

        <View style={styles.container}>
          {images.map((image, i) => (
            <TouchableHighlight
              key={i}
              style={styles.imageContainer}
              onPress={this.handleMemePress}
            >
              <Image
                style={styles.image}
                source={require("../assets/images/elephant.jpg")}
              />
            </TouchableHighlight>
          ))}
        </View>
      </View>
    );
  }
}
