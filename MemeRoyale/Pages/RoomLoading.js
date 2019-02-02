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
import { getRooms } from "../API/Rooms";
import { defaultStyles } from './styles';

const styles = StyleSheet.create({
    ...defaultStyles,
    
})

export default class RoomLoading extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View>
        <Header leftComponent={{ icon: "menu", color: "#fff" }}/>

        <Text h4 style={styles.text}>Lords</Text>
        <Divider></Divider>
      </View>
    );
  }
}
