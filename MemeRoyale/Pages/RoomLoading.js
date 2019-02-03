import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Header,
  Button,
  Icon,
  Text,
  ListItem,
  Divider
} from "react-native-elements";
import { getUsersinRoom } from "../API/Rooms";
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
    const socket = this.props.navigation.getParam("socket", null);
    //console.log(room, user, socket);

    getUsersinRoom(room.code).then(users => {
      console.log('users', users);
      this.setState({ users });
    });
  }

  render() {
    const { users } = this.state;
    return (
      <View style={styles.background}>
        <Text h4 style={styles.text}>
          Lords
        </Text>
        <Divider />
        <View>
          {users.length ? <Text>No one in the room yet!</Text> : null}
          {users.map((user, i) => (
            <ListItem key={i} title={user.name} />
          ))}
        </View>
      </View>
    );
  }
}
