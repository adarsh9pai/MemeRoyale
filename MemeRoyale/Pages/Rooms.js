import React from "react";
import { StyleSheet, View } from "react-native";
import { Header, Button, Icon, Text, ListItem } from "react-native-elements";
import { getRooms } from "../API/Rooms";
import { defaultStyles } from "./styles";
import { ScrollView } from "react-native-gesture-handler";

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

  refresh = ()=>{
    getRooms().then(rooms => this.setState({ rooms }));
  }

  componentDidMount() {
    getRooms().then(rooms => this.setState({ rooms }));
  }

  handleRoomPress = room => () => {
    alert(room.name);
  };

  handleAddRoom = () => {};

  render() {
    const { rooms } = this.state;

    return (
      <View>
        <ScrollView>
          <Header />
          <Text h4 style={styles.text}>
            Available Rooms
          </Text>

          {rooms.map((room, i) => (
            <ListItem
              key={i}
              title={room.name}
              onPress={this.handleRoomPress(room)}
            />
          ))}

          <Button
            title="Add Room"
            buttonStyle={styles.button}
            onPress={() => this.props.navigation.navigate("NewRoom")}
          />
        </ScrollView>
      </View>
    );
  }
}
