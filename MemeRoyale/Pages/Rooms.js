import React from "react";
import { StyleSheet, View } from "react-native";
import { Header, Button, Icon, Text, ListItem } from "react-native-elements";
import { getRooms } from "../API/Rooms";
import { defaultStyles } from './styles'

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
  }

  componentDidMount() {
    getRooms().then(rooms => this.setState({ rooms }));
  }

  handleRoomPress = room => () => {
    alert(room.name);
  };

  handleAddRoom = () => {
    
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
          <ListItem
            key={i}
            title={room.name}
            onPress={this.handleRoomPress(room)}
          />
        ))}

        <Button title="Add Room" buttonStyle={styles.button} onPress={() => this.props.navigation.navigate('NewRoom')} />
      </View>
    );
  }
}
