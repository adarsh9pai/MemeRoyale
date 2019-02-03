import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, PricingCard } from "react-native-elements";
import { getRooms } from "../API/Rooms";
import { defaultStyles } from "./styles";
import { ScrollView } from "react-native-gesture-handler";
import { connectRoom } from "../socket";

const styles = StyleSheet.create({
  ...defaultStyles,
  margin: 15
});

export default class Rooms extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: []
    };

    this.getRoomsInterval = null;
    this.user = this.props.navigation.getParam("user", null);
  }

  refresh = () => {
    getRooms().then(rooms => this.setState({ rooms }));
  };

  componentDidMount() {
    getRooms().then(rooms => this.setState({ rooms }));

    this.getRoomsInterval = setInterval(
      () => getRooms().then(rooms => this.setState({ rooms })),
      1000 * 2
    );
  }

  handleRoomPress = room => () => {
    // Set the joined room to the state
    this.setState({ room: room }, () => {
      connectRoom(room);
      clearInterval(this.getRoomsInterval);

      // Navigate to the page that displays which users are in the room
      this.props.navigation.navigate("RoomLoading", {
        room: room,
        user: this.user
      });
    });
  };

  handleAddRoom = () => {
    // Navigate to the page that lets the user create a room
    clearInterval(this.getRoomsInterval);
    this.props.navigation.navigate("NewRoom", {
      user: this.user
    });
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
