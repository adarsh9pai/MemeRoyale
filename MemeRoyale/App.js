import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Homepage from './Homepage';
import { Font, AppLoading } from 'expo';
import SafeAreaView from 'react-native-safe-area-view';
import { Button, registerCustomIconType } from 'react-native-elements';
import {Google} from 'expo'
import Rooms from './Rooms'

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      loggedIn : true,
      email : 'NaN',
      image: 'img://'
    }
  }
  
  googleOAuthLogin = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: clientID.android,
        iosClientId: clientID.ios,
        scopes: ["profile", "email"],
        behavior: 'web'
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
  }

  componentDidMount() {
    Font.loadAsync({
      'barlow': require('./assets/fonts/Barlow/Barlow-Medium.ttf'),
      'Roboto': require('./assets/fonts/roboto/Roboto-Medium.ttf')
    })
  }

  render() {
    const { isLoading, loggedIn } = this.state;

    if(!loggedIn) {
      return(
      <SafeAreaView style={styles.container}>
        <LoginScreen googleOAuthLogin = {this.googleOAuthLogin}/> 
      </SafeAreaView>
      )
    }
    else{
      return <Rooms />
    }
  }
}

const LoginScreen = props =>{
  return(
  <View>
    <Button title = "Continue with Google" onPress = {()=>props.googleOAuthLogin()}></Button>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});






