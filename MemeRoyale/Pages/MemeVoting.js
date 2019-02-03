import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import {
  Header,
  Button,
  Icon,
  Text,
  ListItem,
  Divider,
  Image,
  Input,
  CheckBox
} from "react-native-elements";
import { defaultStyles } from "./styles";
import { ScrollView } from "react-native-gesture-handler";
import { getRoom, castVote } from "../API/Rooms";

const styles = StyleSheet.create({
  ...defaultStyles,
  checkBox: {
    width: "100%"
  }
});

export default class MemeVoting extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      captions: [],
      checkedCaption: -1,
      hasSubmitted: false,
      memeURL: "",
      isLoading: true
    };

    this.user = this.props.navigation.getParam("user", null);
    this.room = this.props.navigation.getParam("room", null);
  }

  componentDidMount() {
    // Get all of the captions, url
    getRoom(this.room.code).then(room => {
      this.setState({
        captions: room.captions,
        memeURL: room.currentMeme,
        currentChooser: room.currentChooser,
        isLoading: false
      });
    });
  }

  handleCaptionPress = i => () => {
    this.setState({ checkedCaption: i });
  };

  handleSubmitPress = () => {
    // Submit a vote to the API
    const { captions, checkedCaption } = this.state;

    castVote(this.room.code, captions[checkedCaption].name);
    this.setState({ hasSubmitted: true });

    // Set a timer that will wait for all voting to finish before going to the results
    this.waitForVotingToFinishTimer = setInterval(() => {
      getRoom(this.room.code).then(room => {
        if (room.isVotingEnded) {
          clearInterval(this.waitForVotingToFinishTimer);

          this.props.navigation.navigate("MemeResults", {
            user: this.user,
            room: this.room
          });
        }
      });
    }, 1000 * 1);
  };

  render() {
    const {
      captions,
      checkedCaption,
      hasSubmitted,
      memeURL,
      isLoading,
      currentChooser,
    } = this.state;

    if (isLoading) {
      return (
        <View>
          <Text style={styles.textCenter}>Loading...</Text>
          <ActivityIndicator style={styles.loading} />
        </View>
      );
    } else if (!hasSubmitted) {
      return (
        <View style={styles.background}>
          <View>
            <ScrollView>
              <Text style={styles.textCenter}>{currentChooser}'s Pick</Text>
              <Image
                style={styles.meme}
                resizeMode="contain"
                source={{ uri: memeURL }}
              />

              <Text style={styles.textCenter}>Pick the best caption</Text>

              {captions.map((caption, i) => (
                <ListItem
                  key={i}
                  title={caption.caption}
                  leftElement={
                    <CheckBox
                      center
                      checkedIcon="dot-circle-o"
                      uncheckedIcon="circle-o"
                      onPress={this.handleCaptionPress(i)}
                      checked={checkedCaption === i}
                    />
                  }
                />
              ))}

              <Button
                title="SUBMIT"
                buttonStyle={styles.button}
                onPress={this.handleSubmitPress}
              />
            </ScrollView>
          </View>
        </View>
      );
    } else {
      return (
        <View>
          <Text style={styles.textCenter}>
            Not every Meme Lord is as quick in the fingers as you...
          </Text>
          <ActivityIndicator style={styles.loading} />
        </View>
      );
    }
  }
}
