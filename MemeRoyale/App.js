import React from "react";
import { Font } from "expo";
import Rooms from "./Pages/Rooms";
import RoomLoading from "./Pages/RoomLoading";
import Board from "./Pages/Board";
import MemeResults from "./Pages/MemeResults";
import NewRoom from "./Pages/NewRoom";
import CreateMeme from "./Pages/CreateMeme";
import { createStackNavigator, createAppContainer } from "react-navigation";
import MemeVoting from "./Pages/MemeVoting";
import { createSocket } from "./socket";
import LoginScreen from './Pages/Login';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    // Setup the socket
    createSocket();
  }

  componentDidMount() {
    Font.loadAsync({
      barlow: require("./assets/fonts/Barlow/Barlow-Medium.ttf"),
      Roboto: require("./assets/fonts/roboto/Roboto-Medium.ttf")
    });
  }

  render() {
    return <AppContainer/>;
  }
}

const AppNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen
  },
  SelectMeme: {
    screen: Board
  },
  Rooms: {
    screen: Rooms
  },
  RoomLoading: {
    screen: RoomLoading
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
  MemeResults: {
    screen: MemeResults
  }
});
const AppContainer = createAppContainer(AppNavigator);
