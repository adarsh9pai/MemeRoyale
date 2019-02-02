import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Header, Button, Icon } from "react-native-elements";
import { Google } from "expo";
import { clientID } from "./secret";
import Rooms from './Rooms';

class Homepage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: true
    };
  }

  googleOAuthLogin = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: clientID.android,
        iosClientId: clientID.ios,
        scopes: ["profile", "email"]
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

  render() {
    const { loggedIn } = this.state;

    if (loggedIn) {
      return <Rooms />;
    }

    return (
      <View>
        <Header leftComponent={{ icon: "menu", color: "#fff" }} />

        <Button
          icon={<Icon name="arrow-right" size={15} color="white" />}
          iconRight
          title="Login with Google"
        />

        {/* <Text>Sign in with Google</Text>
        <Button
          primary
          title="Sign in with Google"
          onPress={this.googleOAuthLogin}
        /> */}
      </View>
    );
  }
}

export default Homepage;
