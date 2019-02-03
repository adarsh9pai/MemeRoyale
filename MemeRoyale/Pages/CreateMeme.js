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
    this.handleTextChange({ [id]: text });
  };

  handleSubmitCaption = () => {
    // Uncomment this line below once it is time for API work
    //this.setState({isSubmitted: true});

    // API call to check when all users have completed their captions
    // on completion navigate to the voting page
    this.props.navigation.navigate("Vote");
  };

  render() {
    const { isSubmitted } = this.state;

    return (
      <View>
        <Header />

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
              onChangeText={this.handleTextChange("caption")}
            />

            <Button
              buttonStyle={styles.button}
              title="Submit"
              onPress={this.handleSubmitCaption}
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
