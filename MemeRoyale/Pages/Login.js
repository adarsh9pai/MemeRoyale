import React from "react";
import SafeAreaView from "react-native-safe-area-view";
import {
  SocialIcon,
  Image
} from "react-native-elements";
import {StyleSheet} from 'react-native';
import { Google } from "expo";
import clientID from '../secret';
import { connectUser } from '../socket';
import { createUser } from "../API/Rooms";
import { defaultStyles } from "./styles";

const styles = StyleSheet.create({
    ...defaultStyles,
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
      },
})

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  googleOAuthLogin = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: clientID.android,
        iosClientId: clientID.ios,
        scopes: ["profile", "email"],
        behavior: "web"
      });
      if (result.type === "success") {
        createUser(result.user.email);
        connectUser(result.user.email);
        
        // Send the user to the navigator
        console.log('saving user', result.user.email);
        this.props.navigation.navigate("Rooms", {
            user: result.user.email,
        })
      } else {
        console.log("cancelled");
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Image
          source={require("../assets/images/logo.png")}
          resizeMode="contain"
          style={{ width: 200 }}
        />
        <SocialIcon
          title="Sign in with G+"
          button
          type="google"
          onPress={this.googleOAuthLogin}
          style={{ width: 200, backgroundColor: "#dd4b39" }}
        />
      </SafeAreaView>
    );
  }
}
