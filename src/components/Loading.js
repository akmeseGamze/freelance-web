import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React from "react";
import colors from "../constants/color";

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={"small"} color={colors.blue} />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },

  loadingText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "black",
    marginTop: 20,
  },
});
