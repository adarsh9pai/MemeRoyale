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
import { getWinner, getRoom, nextRound, getUsersinRoom } from "../API/Rooms";

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
      users: [],
    };
  }

  componentDidMount() {
    this.user = this.props.navigation.getParam("user", null);
    this.room = this.props.navigation.getParam("room", null);

    console.log('in results', this.user, this.room);

    getUsersinRoom(this.room.code).then(users => {
      //const maxScore = Math.max(users.map(user => user.score));
      //const winner = users.find(user => user.score === maxScore);

      getRoom(this.room.code).then(room => {
        this.setState({
          captions: room.captions,
          isLoading: false,
          memeURL: room.currentMeme,
          //winner: winner.name,
          users: users,
        });
      });
    })
  }

  handleNextRound = () => {
    nextRound(this.room.code).then(res => {
      console.log(res, 'going to next round');
      this.props.navigation.navigate('SelectMeme', {
        room: this.room,
        user: this.user,
      })
    })
  }

  render() {
    const { isLoading, memeURL, winner, captions, users } = this.state;

    if (isLoading) {
      return (
        <View style={styles.background}>
        <Text>Results</Text>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <View>
          <ScrollView>
            <Text h4 style={styles.textCenter}>
              Results! {winner}
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

            <Divider />
            <Text style={styles.textCenter}>All captions</Text>
            {captions.map((caption, i) => (
              <ListItem key={i} title={caption.caption} subtitle={`${caption.name} - ${users.find(user => user.name === caption.name).score} Pts`} />
            ))}

            <Button buttonStyle={styles.buttonSecondary} title='Next Round' onPress={this.handleNextRound}></Button>
          </ScrollView>
        </View>
      );
    }
  }
}
