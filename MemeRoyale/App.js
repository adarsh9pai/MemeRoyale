import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import clientID from './secret'
import Expo from 'expo'

export default class App extends React.Component {


  state = {
    loggedIn : false,
    email : 'NaN',
    image: 'img://'
  }

  googleOAuthLogin = async() =>{
    try{
      const result = await Google.logInAsync({
        androidClientId = clientID.android,
        iosClientId: clientID.ios,
        scopes: ['profile','email']
      })
      if(result === "success"){
        this.setState({
          loggedIn:true,
          email:result.user.email,
          image: result.user.photoUrl
        })
      }
      else{
        alert("Oof")
      }
    }
    catch(e){
      console.log("error",e)
    }
  }

  render() {
    if(this.state.loggedIn){
      
    }
    else{
      <LoginScreen />
    }    
  }
}

const LoginScreen = props =>{

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
