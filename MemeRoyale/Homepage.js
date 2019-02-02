import React from "react";
import { Toolbar } from "react-native-material-ui";
import { StyleSheet, Text, View } from "react-native";

class Homepage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Toolbar leftElement="menu"/>
    );
  }
}

export default Homepage;
