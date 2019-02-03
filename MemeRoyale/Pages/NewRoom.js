import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Header,
  Button,
  Icon,
  Text,
  ListItem,
  Divider,
  Input
} from "react-native-elements";
import { getRooms } from "../API/Rooms";
import { defaultStyles } from "./styles";
import { createRoom } from "../API/Rooms";

const styles = StyleSheet.create({
  ...defaultStyles
});

export default class NewRoom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isRoomActive: false,
      users: [{ name: "Robert Brady" }],
      roomName: ""
    };
  }

  handleTextChange = id => text => {
    this.setState({ [id]: text });
  };

  handleCreateRoom = () => {
    createRoom(this.state.roomName);
    this.setState({ isRoomActive: true });
  };

  handleStartGame = () => {
    this.props.navigation.navigate("SelectMeme");
  }

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
            <Button buttonStyle={styles.buttonSecondary} title='Start' onPress={this.handleStartGame}></Button>
          </View>
        ) : (
          <View>
            <Text style={styles.text}>
              This is a description of what a new room is{" "}
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
