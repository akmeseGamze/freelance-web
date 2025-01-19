import { StyleSheet, Text, Pressable } from "react-native";
import React from "react";
import colors from "../../constants/color";

const GhostButton = ({ buttonText, handleOnPress, textStyle, rootStyle }) => {
  return (
    <Pressable
      onPress={() => handleOnPress()}
      style={[styles.button, rootStyle]}
    >
      <Text style={[styles.buttonText, textStyle]}>{buttonText}</Text>
    </Pressable>
  );
};

export default GhostButton;

const styles = StyleSheet.create({
  button: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    fontWeight: "bold",
    color: colors.baseText,
  },
});
