import React from "react";
import {
  StyleSheet,
  View,
  Image,
  ActivityIndicator,
  ScrollView
} from "react-native";
import {
  Button,
  Text,
  ListItem,
  Divider,
  Badge
} from "react-native-elements";
import { defaultStyles } from "./styles";
import { getWinner, getRoom } from "../API/Rooms";

const styles = StyleSheet.create({
  ...defaultStyles
});

export default class MemeResults extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      winner: "",
      memeURL: "",
      captions: [],
    };
  }

  componentDidMount() {
    this.user = this.props.navigation.getParam("user", null);
    this.room = this.props.navigation.getParam("room", null);

    getWinner(this.room.code).then(user => {
      getRoom(this.room.code).then(room => {
        this.setState({
          captions: room.captions,
          isLoading: false,
          memeURL: room.currentMeme,
          winner: user.name
        });
      });
    });
  }

  render() {
    const { isLoading, memeURL, winner, captions } = this.state;

    if (isLoading) {
      return (
        <View style={styles.background}>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <View>
          <ScrollView>
            <Text h4 style={styles.textCenter}>
              Congrats {winner}
            </Text>
            <Image
              style={styles.meme}
              resizeMode="contain"
              source={{ uri: memeURL }}
            />

            <Badge
              status="success"
              value="+1"
              containerStyle={{ position: "relative" }}
            />

            <Button title="Next" buttonStyle={styles.button} />

            <Divider />
            <Text style={styles.textCenter}>Other captions</Text>
            {captions.map((caption, i) => (
              <ListItem key={i} title={caption.caption} subtitle={caption.name} />
            ))}
          </ScrollView>
        </View>
      );
    }
  }
}
