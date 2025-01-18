import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../constants/color";

const ProfilePage = () => {
  return (
    <View style={styles.container}>
      <Text style={{ color: colors.baseText }}>ProfilePage</Text>
    </View>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
});
