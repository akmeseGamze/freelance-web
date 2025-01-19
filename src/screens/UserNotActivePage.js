import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../components";
import { logout } from "../redux/userSlice";
import colors from "../constants/color";
import { SolidButton } from "../components/button";

const UserNotActivePage = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);

  return (
    <>
      <View style={styles.root}>
        <View style={styles.header}>
          <Text style={styles.title}> {"Pending \n Approval"}</Text>
        </View>

        <View style={styles.main}>
          <Text style={styles.info}>{"We are reviewing your Request."}</Text>
        </View>
        <View style={styles.footer}>
          <SolidButton
            buttonText="Exit"
            rootStyle={{ backgroundColor: colors.blue }}
            handleOnPress={() => dispatch(logout())}
          />
        </View>
      </View>
      {isLoading ? <Loading /> : null}
    </>
  );
};

export default UserNotActivePage;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "space-between",
  },
  header: {
    padding: 24,
  },
  main: {
    paddingTop: 24,
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    padding: 24,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 48,
    textAlign: "left",
    color: colors.baseText,
  },
  info: {
    fontWeight: "normal",
    fontSize: 18,
    textAlign: "center",
    color: colors.baseText,
  },
});
