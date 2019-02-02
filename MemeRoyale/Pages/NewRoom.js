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
      roomName: '',
    };
  }

  handleTextChange = id => text => {
    this.setState({ [id]: text });
  };

  handleCreateRoom = () => {
    createRoom(this.state.roomName);
    this.setState({ isRoomActive: true });
  };

  render() {
    const { isRoomActive, users } = this.state;

    return (
      <View>
        <Header leftComponent={{ icon: "menu", color: "#fff" }} />

        <Text style={styles.text}>
          This is a description of what a new room is{" "}
        </Text>
        <Input
          key="roomName"
          placeholder="Room Name"
          style={styles.text}
          onChangeText={this.handleTextChange("roomName")}
        />

        {// If the game has started then display the users in the game, otherwise show the 'create' button
        isRoomActive ? (
          <View>
            <Text h4 style={styles.text}>
              Players ({users.length})
            </Text>
            <Divider />
            {users.map((user, i) => (
              <ListItem key={i} title={user.name} />
            ))}
          </View>
        ) : (
          <Button
            title="Create"
            buttonStyle={styles.button}
            onPress={this.handleCreateRoom}
          />
        )}
      </View>
    );
  }
}
