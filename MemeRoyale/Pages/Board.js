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
  Divider,
  ActivityIndicator
} from "react-native-elements";
import { defaultStyles } from "./styles";
import { getRoom } from "../API/Rooms";

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
      index: 0,
      images: [1, 2, 3, 4, 5],
      isChooser: false
    };

    this.user = this.props.navigation.getParam("user", null);
    this.room = this.props.navigation.getParam("room", null);
  }

  componentDidMount() {
    getRoom(this.room.code).then(room => {
      // Check if the room's current meme chooser is this user's email address
      if (room.currentChooser === this.user) {
        this.setState({ isChooser: true });
      }
    });
  }

  handleMemePress = meme => {};

  handleBack = () => {
    this.setState({ index: this.state.index - 1 });
  };

  handleNext = () => {
    this.setState({ index: this.state.index + 1 });
  };

  handleSelectMeme = () => {
    // Handle API select MEME
    this.props.navigation.navigate("CreateMeme", {
      room: this.room,
      user: this.user,
    });
  };

  render() {
    const { images, index, isChooser } = this.state;

    // Display the carousel for the person to choose a meme
    if (isChooser) {
      return (
        <View style={styles.background}>
          <Text h4 style={styles.textCenter}>
            Select an image to meme
          </Text>
          <Image
            style={styles.meme}
            resizeMode="contain"
            source={require("../assets/images/elephant.jpg")}
          />

          <View>
            <Button
              title="Back"
              disabled={index === 0}
              onPress={this.handleBack}
              buttonStyle={styles.button}
            />
            <Button
              title="Next"
              disabled={index === images.length - 1}
              onPress={this.handleNext}
              buttonStyle={styles.button}
            />
            <Button
              title="Select"
              onPress={this.handleSelectMeme}
              buttonStyle={styles.buttonSecondary}
            />
          </View>
        </View>
      );
    }

    // Display a loading icon that they should wait until the person has chosen their meme
    else {
      return (
        <View>
          <Text style={styles.textCenter}>
            Please wait until everyone has submitted their caption
          </Text>
          <ActivityIndicator style={styles.loading} />
        </View>
      );
    }
  }
}
