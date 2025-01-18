import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";

const CustomTextInput = ({
  title,
  isSecureText,
  handleOnChangeText,
  handleValue,
  handlePlaceholder,
  rootStyle,
}) => {
  return (
    <View style={[styles.inputContainer, rootStyle]}>
      <Text style={styles.inputBoxTitle}>{title}</Text>
      <TextInput
        secureTextEntry={isSecureText}
        placeholder={handlePlaceholder}
        style={styles.textInputStyle}
        onChangeText={handleOnChangeText}
        value={handleValue}
      />
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  inputBoxTitle: {
    fontWeight: "normal",
    textAlign: "left",
    color: "#cccccc",
  },
  textInputStyle: {
    marginTop: 2,
    backgroundColor: "#efefef",
    width: "100%",
    paddingLeft: 24,
    paddingVertical: 12,
    borderRadius: 1000,
    textAlign: "left",
    color: "black",
    fontWeight: "normal",
  },
});
