import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useCallback, useState } from "react";
import { CustomTextInput, SolidButton, Loading } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/userSlice";
import colors from "../../constants/color";

const SignUpPage = ({ navigation }) => {
  const [page, setPage] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [about, setAbout] = useState("");

  const dispatch = useDispatch();

  const { isLoading, signUpError } = useSelector((state) => state.user);

  const handlePhoneNumberChange = (text) => {
    const cleanedText = text.replace(/[^0-9]/g, "");
    setPhoneNumber(cleanedText);
  };

  const handleRegister = () => {
    dispatch(
      register({
        first_name: firstName,
        last_name: lastName,
        password,
        phone_number: phoneNumber,
        email,
        role,
        about,
      })
    );
  };

  const nextPage = useCallback(() => {
    if (page != 0) {
      return;
    }

    if (!firstName) {
      return;
    }
    if (!lastName) {
      return;
    }
    if (!role) {
      return;
    }

    setPage(1);
  }, [firstName, lastName, role, about, page]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <View style={styles.root}>
      {page == 0 ? (
        <>
          <View style={styles.header}>
            <Text style={styles.title}>Sign up</Text>
            <Text style={styles.subtitle}>Let's start together.</Text>
          </View>
          <View style={styles.main}>
            <View style={styles.textInputContainer}>
              <CustomTextInput
                title="First Name"
                isSecureText={false}
                handleOnChangeText={setFirstName}
                handleValue={firstName}
                handlePlaceholder="Enter Your First Name"
              />
              <CustomTextInput
                title="Last Name"
                isSecureText={false}
                handleOnChangeText={setLastName}
                handleValue={lastName}
                handlePlaceholder="Enter Your Last Name"
              />
              <CustomTextInput
                title="Role"
                isSecureText={false}
                handleOnChangeText={setRole}
                handleValue={role}
                handlePlaceholder="Enter Your Role"
              />
              <CustomTextInput
                title="About"
                isSecureText={false}
                handleOnChangeText={setAbout}
                handleValue={about}
                handlePlaceholder="Enter Your About"
              />

              <SolidButton
                buttonText="Next"
                widthInPercentage={80}
                buttonColor="blue"
                pressedButtonColor="gray"
                handleOnPress={nextPage}
                rootStyle={{ marginTop: 16, backgroundColor: colors.blue }}
              />
            </View>

            <Pressable onPress={() => navigation.navigate("login")}>
              <Text style={{ fontWeight: "bold", marginTop: 64 }}>
                Already have an account? Login
              </Text>
            </Pressable>
          </View>
        </>
      ) : (
        <></>
      )}
      {page == 1 ? (
        <>
          <View style={styles.header}>
            <Text style={styles.title}>Welcome</Text>
            <Text style={styles.subtitle}>{firstName}</Text>
          </View>
          <View style={styles.main}>
            <View style={styles.textInputContainer}>
              <CustomTextInput
                title="Phone Number"
                isSecureText={false}
                handleOnChangeText={handlePhoneNumberChange}
                handleValue={phoneNumber}
                handlePlaceholder="Enter Your Phone Number"
                keyboardType="number-pad"
              />

              <CustomTextInput
                title="Email"
                isSecureText={false}
                handleOnChangeText={setEmail}
                handleValue={email}
                handlePlaceholder="Enter Your Email"
                keyboardType="email-address"
              />

              <CustomTextInput
                title="Password"
                isSecureText={true}
                handleOnChangeText={setPassword}
                handleValue={password}
                handlePlaceholder="Create Your Password"
              />

              {signUpError ? (
                <Text style={{ marginTop: 24, color: colors.red }}>
                  {"Please fill in the required fields!"}
                </Text>
              ) : null}

              <SolidButton
                buttonText="Sign Up"
                widthInPercentage={80}
                buttonColor="blue"
                pressedButtonColor="gray"
                handleOnPress={handleRegister}
                rootStyle={{ marginTop: 16, backgroundColor: colors.blue }}
              />
            </View>

            <Pressable onPress={() => setPage(0)}>
              <Text style={{ fontWeight: "bold", marginTop: 64 }}>Back</Text>
            </Pressable>
          </View>
        </>
      ) : (
        <></>
      )}
    </View>
  );
};

export default SignUpPage;

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
    paddingTop: 8,
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
