import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Homepage from './Homepage';
import { Font, AppLoading } from 'expo';
import SafeAreaView from 'react-native-safe-area-view';

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
  
  componentDidMount() {
    Font.loadAsync({
      'barlow': require('./assets/fonts/Barlow/Barlow-Medium.ttf'),
    })
  }

  render() {
    const { isLoading, loggedIn } = this.state;

    if (isLoading) {
      return <SafeAreaView><Homepage /></SafeAreaView>
    }

    else if (!loggedIn) {
      <SafeAreaView style={styles.container}>
        <Homepage /> 
      </SafeAreaView>
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






