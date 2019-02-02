import React from "react";
import { Toolbar } from "react-native-material-ui";
import { StyleSheet, Text, View, Button } from "react-native";
import { Google } from 'expo';
import { clientID } from './secret';

class Homepage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false
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
      return <View />;
    }

    return (
      <View>
        <Toolbar leftElement="menu" centerElement="Searchable" />

        <Text>Sign in with Google</Text>
        <Button
          primary
          title="Sign in with Google"
          onPress={this.googleOAuthLogin}
        />
      </View>
    );
  }
}

export default Homepage;
