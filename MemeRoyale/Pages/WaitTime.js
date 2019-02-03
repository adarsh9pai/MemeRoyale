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
import {PacmanIndicator} from 'react-native-indicators';

const styles = StyleSheet.create({
    ...defaultStyles
  });
  
  export default class CreateMeme extends React.Component {
    constructor(props) {
      super(props);
    }
    render(){
        <Loader />
    }
}
  

const Loader = props =>{
    return(
        <View style={{backgroundColor:'#f15c5c'}}>
            <PacmanIndicator size="large" color="#f9c00c" />
        </View>
    )
}