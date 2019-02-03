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
      caption: "",
      isSubmitted: false
    };
  }

  handleTextChange = id => text => {
    this.handleTextChange({ [id]: text });
  };

  handleSubmitCaption = () => {
      this.setState({isSubmitted: true});

      // API call to check when all users have completed their captions
  }

  render() {
    const { isSubmitted } = this.state;

    return (
      <View>
        <Header />

        {!isSubmitted ? (
            // Let the user create their own caption
          <View>
            <Image
              style={styles.meme}
              resizeMode="contain"
              source={require("../assets/images/elephant.jpg")}
            />

            <Input
              placeholder="Caption"
              style={styles.text}
              onChangeText={this.handleTextChange("caption")}
            />

            <Button buttonStyle={styles.button} title="Submit" onPress={this.handleSubmitCaption}/>
          </View>
        ) : (
            // tell the user that they need to wait until all other users have finished their captions
          <View>
            <Text style={styles.text}>
              Please wait until everyone has submitted their caption
            </Text>
            <ActivityIndicator style={styles.loading}/>
          </View>
        )}
      </View>
    );
  }
}
