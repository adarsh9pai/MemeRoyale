import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Header,
  Button,
  Icon,
  Text,
  ListItem,
  Divider,
  Image,
  Input
} from "react-native-elements";
import { getRooms } from "../API/Rooms";
import { defaultStyles } from "./styles";
import SocketIOClient from 'socket.io-client';


const styles = StyleSheet.create({
  ...defaultStyles
});

export default class CreateMeme extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        caption: '',
        username: 'adarsh9pai@gmail.com',
        roomName:'3F41',
        roomNumber: '3F41',
        data: ''
    };

    this.socket = SocketIOClient('http://34.238.153.107')
    this.socket.emit('user',this.state.username)
    this.socket.emit('room', {
      name:this.state.roomName,
      code:this.state.roomNumber
    })
    this.socket.on('debug',(data)=>{
      console.log(data)
    })
  }

  handleTextChange = id => text => {
      this.handleTextChange({[id]: text});
  }

  render() {
    return (
      <View>
        <Header leftComponent={{ icon: "menu", color: "#fff" }} />

          <Image
            style={styles.meme}
            resizeMode="contain"
            source={require("../assets/images/elephant.jpg")}
          />

          <Input
            placeholder="Caption"
            style={styles.text}
            onChangeText={(data)=>{
              this.setState({data})  
            }}
          />

          <Button buttonStyle={styles.button} title='Submit' onPress = {
            ()=>{
              this.socket.emit('caption',{
                name:this.state.username,
                code:this.state.roomNumber,
                caption:this.state.data
              })
            }
          }></Button>
      </View>
    );
  }
}
