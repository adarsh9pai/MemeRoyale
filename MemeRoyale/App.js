import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Font, AppLoading } from "expo";
import SafeAreaView from "react-native-safe-area-view";
import {
  Button,
  registerCustomIconType,
  SocialIcon,
  Image
} from "react-native-elements";
import { Google } from "expo";
import Rooms from "./Pages/Rooms";
import RoomLoading from "./Pages/RoomLoading";
import Board from "./Pages/Board";
import MemeResults from "./Pages/MemeResults";
import NewRoom from "./Pages/NewRoom";
import CreateMeme from "./Pages/CreateMeme";
import { createStackNavigator, createAppContainer } from "react-navigation";
import MemeVoting from "./Pages/MemeVoting";
import { defaultStyles } from "./Pages/styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  ...defaultStyles
});

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      loggedIn: false,
      email: "NaN",
      image: "img://"
    };
  }

  googleOAuthLogin = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: clientID.android,
        iosClientId: clientID.ios,
        scopes: ["profile", "email"],
        behavior: "web"
      });
      if (result === "success") {
        this.setState({
          loggedIn: true,
          email: result.user.email,
          image: result.user.photoUrl
        });
      } else {
        alert("Oof");
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  componentDidMount() {
    Font.loadAsync({
      barlow: require("./assets/fonts/Barlow/Barlow-Medium.ttf"),
      Roboto: require("./assets/fonts/roboto/Roboto-Medium.ttf")
    });
  }

  render() {
    const { isLoading, loggedIn } = this.state;

    if (!loggedIn) {
      return (
        <SafeAreaView style={styles.container}>
          <LoginScreen googleOAuthLogin={this.googleOAuthLogin} />
        </SafeAreaView>
      );
    } else {
      return <AppContainer style={styles.background} />;
    }
  }
}

const LoginScreen = props => {
  return (
    <View>
      <Image source={require('./assets/images/logo.png')} resizeMode='contain' style={{width: 200}}/>
      <SocialIcon
        title="Sign in with G+"
        button
        type="google"
        onPress={props.googleOAuthLogin}
        style={{ width: 200, backgroundColor: "#dd4b39" }}
      />
    </View>
  );
};

const AppNavigator = createStackNavigator({
  Rooms: {
    screen: Rooms
  },
  CreateMeme: {
    screen: CreateMeme
  },
  NewRoom: {
    screen: NewRoom
  },
  Vote: {
    screen: MemeVoting
  },
  SelectMeme: {
    screen: Board
  },
  MemeResults: {
    screen: MemeResults
  }
});
const AppContainer = createAppContainer(AppNavigator);
