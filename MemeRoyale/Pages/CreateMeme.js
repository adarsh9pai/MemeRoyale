import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
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
import { defaultStyles } from "./styles";
import SocketIOClient from 'socket.io-client';


const styles = StyleSheet.create({
  ...defaultStyles
});

export default class CreateMeme extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

        caption: 'Sample Caption',
        username: 'adarsh9pai@gmail.com',
        roomName:'A2A41',
        roomNumber: 'A2A41',

    };

    // this.socket = SocketIOClient('http://34.238.153.107')
    // this.socket.emit('user',this.state.username)
    // this.socket.emit('room', {
    //   name:this.state.roomName,
    //   code:this.state.roomNumber
    // })
    // this.socket.on('debug',(data)=>{
    //   console.log(data)
    // })
  }


  render() {
    const { isSubmitted } = this.state;

    return (
      <View style={styles.background}>
        {!isSubmitted ? (
          // Let the user create their own caption
          <View>
            <Image
              style={styles.meme}
              resizeMode="contain"
              source={require("../assets/images/elephant.jpg")}
            />


            <Input
              placeholder="Caption"
              style={styles.text}
              onChangeText={(data)=>{
                this.setState({
                  caption:data
                })
              }}
            />

            <Button
              buttonStyle={styles.buttonSecondary}
              title="Submit"
              onPress={()=>{
                this.socket.emit('caption',{
                  name:this.state.username,
                  caption:this.state.caption,
                  code: this.state.roomNumber
                })
                this.props.navigation.navigate("Vote");
              }}
            />
          </View>
        ) : (
          // tell the user that they need to wait until all other users have finished their captions
          <View>
            <Text style={styles.textCenter}>
              Please wait until everyone has submitted their caption
            </Text>
            <ActivityIndicator style={styles.loading} />
          </View>
        )}

      </View>
    );
  }
}
