import React from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableHighlight,
  ScrollView
} from "react-native";
import {
  Header,
  Button,
  Icon,
  Text,
  ListItem,
  Divider
} from "react-native-elements";
import { defaultStyles } from "./styles";

const styles = StyleSheet.create({
  ...defaultStyles,
  container: {
    display: "flex"
  }
});

export default class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        index:0,
     images: [1, 2, 3, 4, 5],

    };
  }

  handleMemePress = meme => {};

  handleBack = ()=>{
      this.setState({index : this.state.index-1})
  }

  handleNext = ()=>{
    this.setState({index : this.state.index+1})
}

handleSelectMeme = ()=>{
    // Handle API select MEME
    this.props.navigation.navigate("CreateMeme");
}

  render() {
    const { images,index } = this.state;

    return (
      <View>
          <Text h4 style={styles.textCenter}>Select an image to meme</Text>
          <Image
              style={styles.meme}
              resizeMode="contain"
              source={require("../assets/images/elephant.jpg")}>
             </Image>

             <View>
                 <Button title="Back" disabled={index===0} onPress={this.handleBack}></Button>
                 <Button title="Next" disabled = {index===images.length-1} onPress={this.handleNext}></Button>
                 <Button title = "Select" onPress={this.handleSelectMeme}></Button>
             </View>
      </View>
    );
  }
}
