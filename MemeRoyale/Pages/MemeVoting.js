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
  Input,
  CheckBox
} from "react-native-elements";
import { defaultStyles } from "./styles";
import { ScrollView } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  ...defaultStyles,
  checkBox: {
      width: '100%',
  }
});

export default class MemeVoting extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      captions: [
        { caption: "Please tell me more" },
        {
          caption:
            "I recorded you breathing at night and it made it my ringtone"
        },
        { caption: "Bad luck Brian" },
        {
          caption: "Notice you left yourself logged into Facebook, Logs you out"
        },
        { caption: "You can't be late if you don't show up" },
        { caption: "Almost time for that New Year, New Me crap" }
      ],
      checkedCaption: -1
    };
  }

  handleCaptionPress = i => () => {
    this.setState({ checkedCaption: i });
  };

  handleSubmitPress = ()=>{
    this.props.navigation.navigate("MemeResults");
  }

  render() {
    const { captions, checkedCaption } = this.state;

    return (
      <View style={styles.background}>
        <View>
          <ScrollView>
            <Text style={styles.textCenter}>{}'s Pick</Text>
            <Image
              style={styles.meme}
              resizeMode="contain"
              source={require("../assets/images/elephant.jpg")}
            />

            <Text style={styles.textCenter}>Pick the best caption</Text>

            {captions.map((caption, i) => (
              <ListItem
                key={i}
                title={caption.caption}
                leftElement={
                  <CheckBox
                    center
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    onPress={this.handleCaptionPress(i)}
                    checked={checkedCaption === i}
                  />
                }
              />
            ))}

            <Button title="SUBMIT" buttonStyle={styles.button} onPress={this.handleSubmitPress}/>
          </ScrollView>
        </View>
      </View>
    );
  }
}
