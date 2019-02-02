import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Header,
  Button,
  Icon,
  Text,
  ListItem,
  Divider,
  Image,
  Input
} from "react-native-elements";
import { getRooms } from "../API/Rooms";
import { defaultStyles } from "./styles";

const styles = StyleSheet.create({
  ...defaultStyles
});

export default class CreateMeme extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        caption: '',
    };
  }

  handleTextChange = id => text => {
      this.handleTextChange({[id]: text});
  }

  render() {
    return (
      <View>
        <Header leftComponent={{ icon: "menu", color: "#fff" }} />

          <Image
            style={styles.meme}
            resizeMode="contain"
            source={require("../assets/images/elephant.jpg")}
          />

          <Input
            placeholder="Caption"
            style={styles.text}
            onChangeText={this.handleTextChange('caption')}
          />

          <Button buttonStyle={styles.button} title='Submit'></Button>
      </View>
    );
  }
}
