import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Header,
  Button,
  Icon,
  Text,
  ListItem,
  PricingCard
} from "react-native-elements";
import { getRooms } from "../API/Rooms";
import { defaultStyles } from "./styles";
import { ScrollView } from "react-native-gesture-handler";
import SocketIOClient from "socket.io-client";

const styles = StyleSheet.create({
  ...defaultStyles,
  margin: 15
});

export default class Rooms extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "adarsh9pai@gmail.com", // update later from oAUth
      rooms: []
    };

    // Setup the socket
    this.socket = SocketIOClient("http://34.238.153.107");
    this.socket.emit("user", this.state.username);
  }

  refresh = () => {
    getRooms().then(rooms => this.setState({ rooms }));
  };

  componentDidMount() {
    getRooms().then(rooms => this.setState({ rooms }));
  }

  handleRoomPress = room => () => {
    const { username } = this.state;

    // Set the joined room to the state
    this.setState({ room: room }, () => {
      
      // Setup the room once it has been selected
      this.socket.emit("room", {
        name: room.name,
        code: room.code
      });

      this.socket.on("debug", data => {
        console.log(data);

        // Navigate to the page that displays which users are in the room
        this.props.navigation.navigate("RoomLoading", {
          room: room,
          user: username,
          socket: this.socket
        });
      });
    });
  };

  handleAddRoom = () => {
    // Navigate to the page that lets the user create a room
    this.props.navigation.navigate("NewRoom");
  };

  render() {
    const { rooms } = this.state;

    return (
      <View style={styles.background}>
        <ScrollView>
          <Text h4 style={styles.text}>
            Available Rooms
          </Text>

          {rooms.map((room, i) => (
            <PricingCard
              key={i}
              color="#4F86C6"
              containerStyle={{ borderRadius: 10 }}
              infoStyle={styles.text}
              title={room.name}
              price={room.numPeople}
              info={["Members"]}
              button={{ title: "JOIN", icon: "check" }}
              onButtonPress={this.handleRoomPress(room)}
            />
          ))}

          <Button
            title="Add Room"
            buttonStyle={styles.buttonSecondary}
            onPress={this.handleAddRoom}
          />
        </ScrollView>
      </View>
    );
  }
}
