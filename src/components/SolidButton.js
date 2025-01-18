import { StyleSheet, Text, Pressable } from "react-native";
import React from "react";
import colors from "../constants/color";

const SolidButton = ({
  buttonText,
  handleOnPress,
  rootStyle,
  textStyle,
  disabled = false,
}) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={handleOnPress ? () => handleOnPress() : null}
      style={[styles.button, rootStyle]}
    >
      <Text style={[styles.buttonText, textStyle]}>{buttonText}</Text>
    </Pressable>
  );
};

export default SolidButton;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 50,
    borderRadius: 1000,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    fontWeight: "bold",
    color: "white",
  },
});
