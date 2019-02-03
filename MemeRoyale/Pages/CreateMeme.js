import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { Button, Text, Image, Input } from "react-native-elements";
import { defaultStyles } from "./styles";
import { getRoom } from "../API/Rooms";
import { addCaption } from "../socket";
import Loader from "./WaitTime";

const styles = StyleSheet.create({
  ...defaultStyles
});

export default class CreateMeme extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSubmitted: false,
      memeURL: null,
      caption: "",
      isLoading: true,
    };
  }

  componentDidMount() {
    this.room = this.props.navigation.getParam("room", null);
    this.user = this.props.navigation.getParam("user", null);

    getRoom(this.room.code).then(room => {
      // Get the current meme that was selected
      this.setState({ memeURL: room.currentMeme, isLoading: false });
    });
  }

  handleSubmit = () => {
    const { caption } = this.state;

    addCaption(this.user, this.room.code, caption);
    this.setState({ isSubmitted: true });

    // Create a timer to wait for everyone to finish submitting their captions
    this.waitToFinishCaptionsTimer = setInterval(() => {
      console.log('interval parent');
      getRoom(this.room.code).then(room => {
        console.log('interval child');
        if (room.isSubmissionEnded) {
          clearInterval(this.waitToFinishCaptionsTimer);

          this.props.navigation.navigate("Vote", {
            room: this.room,
            user: this.user
          });
        }
      });
    }, 1000 * 1);
  };

  handleTextChange = id => text => {
    this.setState({ [id]: text });
  };

  render() {
    const { isSubmitted, memeURL, isLoading } = this.state;

    if (isLoading) {
      return (
        <View style={styles.background}>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <View style={styles.background}>
          {!isSubmitted ? (
            // Let the user create their own caption
            <View>
              <Image
                style={styles.meme}
                resizeMode="contain"
                source={{ uri: memeURL }}
              />

              <Input
                placeholder="Caption"
                style={styles.text}
                onChangeText={this.handleTextChange("caption")}
              />

              <Button
                buttonStyle={styles.buttonSecondary}
                title="Submit"
                onPress={this.handleSubmit}
              />
            </View>
          ) : (
            // tell the user that they need to wait until all other users have finished their captions
            <View>
              <Text style={styles.textCenter}>
                Please wait until all Meme Lord's have finished meme-ing
              </Text>
              <ActivityIndicator style={styles.loading} />
            </View>
          )}
        </View>
      );
    }
  }
}
