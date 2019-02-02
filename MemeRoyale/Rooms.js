import React from "react";
import { StyleSheet, View } from "react-native";
import { Header, Button, Icon, Text, ListItem } from "react-native-elements";
import { Google } from "expo";
import { clientID } from "./secret";
import { getRooms } from './API/Rooms';

const styles = StyleSheet.create({
  margin: 15
});
export default class Rooms extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [{ name: 'room1'}, {name: 'room2'}], 
    };
  }

  componentDidMount() {
      getRooms()
        .then(rooms => this.setState({rooms}));
  }

  handleRoomPress = () => {
    alert('hi');
}

  render() {
    const { rooms } = this.state;

    return (
      <View>
        <Header leftComponent={{ icon: "menu", color: "#fff" }} />
        <Text h4 style={styles}>
          Available Rooms
        </Text>

        {rooms.map((room, i) => (
          <ListItem key={i} title={room.name} onLongPress={this.handleRoomPress}/>
        ))}
      </View>
    );
  }
}
