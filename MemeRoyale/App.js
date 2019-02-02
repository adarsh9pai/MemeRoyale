import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Homepage from './Homepage';
import { Font, AppLoading } from 'expo';


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    }
  }
  
  componentDidMount() {
    Font.loadAsync({
      'barlow': require('./assets/fonts/Barlow/Barlow-Medium.ttf'),
    })
  }

  render() {
    const { isLoading } = this.state;

    if (isLoading) {
      return <View><Homepage /></View>
    }

    return (
      <View style={styles.container}>
        <Homepage /> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
