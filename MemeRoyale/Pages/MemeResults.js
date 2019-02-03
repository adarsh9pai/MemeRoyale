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
  Divider,
  Badge,
} from "react-native-elements";
import { defaultStyles } from "./styles";

const styles = StyleSheet.create({
  ...defaultStyles,
});

export default class MemeResults extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      memes: [
        { user: "Robert Brady", caption: "Meme caption 1", points: 6 },
        { user: "James Brady", caption: "Meme caption 1", points: 6 },
        { user: "Adarsh", caption: "Meme caption 1", points: 6 },
        { user: "Nahian", caption: "Meme caption 1", points: 6 },
        { user: "Adarsh", caption: "Meme caption 1", points: 6 },
        { user: "Adarsh", caption: "Meme caption 1", points: 6 }
      ]
    };
  }

  render() {
    const { memes } = this.state;

    return (
      <View>
        <Header />

        <ScrollView>
          <Text h4 style={styles.textCenter}>
            Congrats
          </Text>
          <Image
            style={styles.meme}
            resizeMode="contain"
            source={require("../assets/images/elephant.jpg")}
          />

          <Badge
            status="success"
            value='+4'
            containerStyle={{ position: "relative",  }}
          />

          <Button title="Next" buttonStyle={styles.button} />

          <Divider />
          <Text style={styles.textCenter}>Other captions</Text>
          {memes.map((meme, i) => (
            <ListItem key={i} title={meme.caption} subtitle={meme.user} />
          ))}
        </ScrollView>
      </View>
    );
  }
}
