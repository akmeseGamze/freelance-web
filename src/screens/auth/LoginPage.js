import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { Loading, CustomTextInput, SolidButton } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { login, autoLogin } from "../../redux/userSlice";
import GhostButton from "../../components/GhostButton";
import Divider from "../../components/Divider";
import colors from "../../constants/color";

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isLoading, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(autoLogin());
  }, []);

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.title}>Sign in</Text>
        <Text style={styles.subtitle}>Welcome back.</Text>
      </View>
      <View style={styles.main}>
        <CustomTextInput
          title="Email"
          isSecureText={false}
          handleOnChangeText={(text) => setEmail(text.toLowerCase())}
          handleValue={email}
          handlePlaceholder="Enter Your Email"
        />

        <CustomTextInput
          rootStyle={{ marginTop: 12 }}
          title="Password"
          isSecureText={true}
          handleOnChangeText={(password) => setPassword(password)}
          handleValue={password}
          handlePlaceholder="Enter Your Password"
        />

        {error ? (
          <Text style={{ paddingTop: 24, color: colors.red }}>
            {"Please enter your user information!"}
          </Text>
        ) : null}

        <Divider rootStyle={{ marginTop: 24 }} />
        <SolidButton
          rootStyle={{ marginTop: 24, backgroundColor: colors.blue }}
          buttonText="Sign in"
          widthInPercentage={80}
          handleOnPress={() => dispatch(login({ email, password }))}
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
      {isLoading ? <Loading /> : null}
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: colors.background,
  },
  header: {
    padding: 24,
  },
  main: {
    paddingHorizontal: 24,
    paddingTop: 24,
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
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
});
