import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, ListItem, Divider, Input } from "react-native-elements";
import { defaultStyles } from "./styles";
import { createRoom, getUsersinRoom, startGame } from "../API/Rooms";
import { setCreator, connectRoom } from "../socket";

const styles = StyleSheet.create({
  ...defaultStyles
});

export default class NewRoom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isRoomActive: false,
      users: [],
      roomName: ""
    };

    this.user = this.props.navigation.getParam("user", null);
  }

  componentDidMount() {
    this.getUsersinRoomFunc = null; // set in the createRoom handler
  }

  componentWillUnmount() {
    // Destroy the timer functions that is set during the creation of a room
    clearInterval(this.getUsersinRoomFunc);
  }

  handleTextChange = id => text => {
    this.setState({ [id]: text });
  };

  handleCreateRoom = () => {
    createRoom(this.state.roomName).then(room => {
      // Set the creator of the room
      setCreator(this.user, room.code);
      connectRoom(room);

      // Set an interval to check for new people in the room every 2 seconds
      this.getUsersinRoomFunc = setInterval(() => {
        getUsersinRoom(room.code).then(users => {
          this.setState({ users });
        });
      }, 1000 * 2);

      // Set the state to show that it is active
      this.setState({
        isRoomActive: true,
        room
      });
    });
  };

  handleStartGame = () => {
    const { room } = this.state;
    
    startGame(room.code);
    this.props.navigation.navigate("SelectMeme", {
      room: room,
      user: this.user
    });
  };

  render() {
    const { isRoomActive, users, roomName } = this.state;

    return (
      <View style={styles.background}>
        {// If the game has started then display the users in the game, otherwise show the 'create' button
        isRoomActive ? (
          <View>
            <Text h4 style={styles.text}>
              {roomName}'s Players ({users.length})
            </Text>
            <Divider />
            {users.map((user, i) => (
              <ListItem key={i} title={user.name} />
            ))}
            <Button
              buttonStyle={styles.buttonSecondary}
              title="Start"
              onPress={this.handleStartGame}
            />
          </View>
        ) : (
          <View>
            <Text style={styles.textCenter}>
              Create a new room that you and your friends can play in
            </Text>
            <Input
              placeholder="Room Name"
              style={styles.text}
              onChangeText={this.handleTextChange("roomName")}
            />
            <Button
              title="Create"
              buttonStyle={styles.button}
              onPress={this.handleCreateRoom}
            />
          </View>
        )}
      </View>
    );
  }
}
