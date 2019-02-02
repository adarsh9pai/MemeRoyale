import { StyleSheet, View } from "react-native";

export const defaultStyles = StyleSheet.create({
  text: {
    margin: 15
  },
  textCenter: {
    textAlign: "center"
  },
  button: {
    margin: 15,
    width: "60%",
    alignSelf: 'center',
  },
  buttonRight: {
    alignSelf: "flex-end",
    margin: 15,
    width: "60%"
  },
  imageContainer: {
    height: 100,
    width: 100,
    margin: 5
    // flex: 1,
    // flexDirection: "row"
  },
  image: {
    height: "100%",
    width: "100%"
  }, 
  meme: {
    width: "100%",
    height: 200,
    margin: 15,
    alignSelf: "center"
  }
});
