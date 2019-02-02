import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Homepage from './Homepage';
import { Font, AppLoading } from 'expo';


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      loggedIn : false,
      email : 'NaN',
      image: 'img://'
    }
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
  
  componentDidMount() {
    Font.loadAsync({
      'barlow': require('./assets/fonts/Barlow/Barlow-Medium.ttf'),
    })
  }

  render() {
    const { isLoading, loggedIn } = this.state;

    if (isLoading) {
      return <View><Homepage /></View>
    }

    else if (!loggedIn) {
      <View style={styles.container}>
        <Homepage /> 
      </View>
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






