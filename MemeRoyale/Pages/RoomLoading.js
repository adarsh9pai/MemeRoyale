import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Header,
  Button,
  Icon,
  Text,
  ListItem,
  Divider,
  registerCustomIconType
} from "react-native-elements";
import { getUsersinRoom, getRoom } from "../API/Rooms";
import { defaultStyles } from "./styles";

const styles = StyleSheet.create({
  ...defaultStyles
});

export default class RoomLoading extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    };
  }

  componentDidMount() {
    // const room = this.props.state.params.state.room;
    const room = this.props.navigation.getParam("room", null);
    const user = this.props.navigation.getParam("user", null);

    // Set an interval to periodically check if anyone is in the room
    this.getUsersinRoomFunc = setInterval(() => {
      getUsersinRoom(room.code).then(users => {
        this.setState({ users });
      });
    }, 1000 * 2);

    // Set an iterval to check if the game has started
    this.checkIfGameStartedTimer = setInterval(() => {
      getRoom(room.code).then(room => {
        console.log("hasstarted", room.hasStarted);
        // If the game has started, then navigate to the game
        if (room.hasStarted) {
          clearInterval(this.getUsersinRoomFunc);
          clearInterval(this.checkIfGameStartedTimer);
          this.props.navigation.navigate("SelectMeme", {
            room: room,
            user: user
          });
        }
      });
    }, 1000 * 1);
  }

  componentWillUnmount() {}

  render() {
    const { users } = this.state;
    return (
      <View style={styles.background}>
        <Text h4 style={styles.text}>
          Lords
        </Text>
        <Divider />
        <View>
          {users.map((user, i) => (
            <ListItem key={i} title={user.name} />
          ))}
        </View>
      </View>
    );
  }
}
