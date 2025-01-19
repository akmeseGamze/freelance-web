import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Loading, Divider } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { autoLogin } from "../../redux/userSlice";
import colors from "../../constants/color";
import { SolidButton, GhostButton } from "../../components/button";

const AuthPage = ({ navigation }) => {
  const { isLoading } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(autoLogin());
  }, []);

  return (
    <>
      <View style={styles.root}>
        <View style={styles.header}>
          <Text style={styles.title}>Freelancer</Text>
          <Text style={styles.subtitle}>{"Work from \n anywhere"}</Text>
        </View>

        <View style={styles.main}>
          <Text style={styles.info}>
            {"Create an account or login to \n an existing account"}
          </Text>

          <Divider rootStyle={{ marginTop: 32, width: "60%" }} />

          <View style={styles.mainSelector}>
            <SolidButton
              buttonText="Sign In"
              widthInPercentage={80}
              handleOnPress={() => navigation.navigate("login")}
              rootStyle={{
                backgroundColor: colors.blue,
              }}
            />

            <Text style={{ marginTop: 24, marginBottom: 12 }}>or</Text>

            <GhostButton
              textStyle={{ textDecorationLine: "underline" }}
              buttonText="Create Account"
              widthInPercentage={30}
              handleOnPress={() => navigation.navigate("signup")}
              buttonColor="gray"
              pressedButtonColor="lightgray"
            />
          </View>
        </View>
        <View style={styles.footer}>
          <GhostButton
            textStyle={{
              textDecorationLine: "underline",
              fontWeight: "normal",
            }}
            buttonText="Terms Of Use"
            widthInPercentage={30}
            buttonColor="gray"
            pressedButtonColor="lightgray"
          />
          <GhostButton
            textStyle={{
              textDecorationLine: "underline",
              fontWeight: "normal",
            }}
            buttonText="Rrivacy Policy"
            widthInPercentage={30}
            buttonColor="gray"
            pressedButtonColor="lightgray"
          />
        </View>
      </View>

      {isLoading ? <Loading /> : null}
    </>
  );
};

export default AuthPage;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: colors.background,
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
  mainSelector: {
    paddingTop: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    paddingBottom: 24,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  title: {
    fontWeight: "bold",
    fontSize: 48,
    textAlign: "left",
    color: colors.baseText,
  },
  subtitle: {
    fontWeight: "normal",
    fontSize: 24,
    textAlign: "left",
    color: colors.baseText,
  },
  info: {
    fontWeight: "normal",
    fontSize: 12,
    textAlign: "center",
    color: colors.baseText,
  },
});
