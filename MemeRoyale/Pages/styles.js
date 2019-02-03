import { StyleSheet, View } from "react-native";

export const defaultStyles = StyleSheet.create({
  background: {
    backgroundColor: '#c4c4c4',
  },
  text: {
    margin: 15,
    color: '#454552',
  },
  textCenter: {
    textAlign: "center",
    color: '#454552',
  },
  button: {
    backgroundColor: '#4F86C6',
    margin: 15,
    width: "60%",
    alignSelf: 'center',
    borderRadius: 10,
  },
  buttonRight: {
    backgroundColor: '#4F86C6',
    alignSelf: "flex-end",
    margin: 15,
    width: "60%",
    borderRadius: 10,
  },
  buttonSecondary: {
    backgroundColor: '#6C49B8',
    margin: 15,
    width: "60%",
    alignSelf: 'center',
    borderRadius: 10,
  },
  buttonRight: {
    backgroundColor: '#6C49B8',
    alignSelf: "flex-end",
    margin: 15,
    width: "60%",
    borderRadius: 10,
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
  },
  loading: {
    margin: 20,
  }
});
