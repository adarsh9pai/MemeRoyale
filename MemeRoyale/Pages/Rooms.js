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

const styles = StyleSheet.create({
  ...defaultStyles,
  margin: 15
});

export default class Rooms extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [
        {name: 'Room #1', numPeople: 12},
        {name: 'Room #2', numPeople: 5},
        {name: 'Room #3', numPeople: 8},
        {name: 'Room #4', numPeople: 2},
      ]
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
      <View style={styles.background}>
        <ScrollView>
          <Text h4 style={styles.text}>
            Available Rooms
          </Text>

          {rooms.map((room, i) => (
            <PricingCard
              key={i}
              color='#4F86C6'
              containerStyle={{borderRadius: 10}}
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
            onPress={() => this.props.navigation.navigate("NewRoom")}
          />
        </ScrollView>
      </View>
    );
  }
}
