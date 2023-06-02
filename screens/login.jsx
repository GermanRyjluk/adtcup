import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
  Image,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";

import { auth, db } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import { colors } from "../shared/colors";
const primaryColor = colors.primary;
const secondaryColor = colors.secondary;

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const passwordIsVisible = () => {
    if (!isPasswordVisible) {
      return <Icon2 name="eye" size={20} color="white" />;
    } else if (isPasswordVisible) {
      return <Icon2 name="eye-slash" size={20} color="white" />;
    }
  };

  const UserLogIn = () => {
    if (email.length != 0 && password.length != 0) {
      signInWithEmailAndPassword(auth, email, password).catch((e) => {
        if (e.code == "auth/user-not-found") {
          Alert.alert("Email incorretto o inesistente");
        }
        if (e.code == "auth/wrong-password") {
          Alert.alert("Password errata");
        }
      });
    } else {
      Alert.alert("Inserire credenziali");
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.backGround}>
      <ScrollView style={styles.backGround}>
        <View style={styles.box}>
          <View style={styles.topZone}>
            <View
              style={{
                // flexDirection: 'row',
                alignItems: "center",
                justifyContent: "space-evenly",
                marginTop: 50,
              }}
            >
              <View
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 50,
                  borderWidth: 3,
                  borderColor: colors.secondary,
                  padding: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons
                  name="person-outline"
                  size={50}
                  color={colors.secondary}
                />
                {/* <Icon1 name="trophy" size={50} color={colors.secondary} /> */}
              </View>
              <Text style={styles.logoText}>Login</Text>
              {/* <Image
                source={require("../assets/logo-trophy-text.png")}
                style={{ width: 300, height: 90 }}
              /> */}
            </View>
          </View>

          <View style={styles.midZone}>
            <View style={styles.midOne}>
              <Text style={styles.loginText}>Accedi</Text>
              <Text style={styles.loginSubText}>
                Accedi o crea un'account per continuare
              </Text>
            </View>
            <View style={styles.midOne}>
              <View style={styles.inputBox}>
                <Icon name="alternate-email" size={20} color="white" />
                <TextInput
                  style={styles.input}
                  onChangeText={(email) => setEmail(email)}
                  underlineColorAndroid="transparent"
                  placeholder="Email"
                  placeholderTextColor="rgba(200, 200, 200,0.7)"
                  keyboardType="email-address"
                  returnKeyType={"next"}
                />
              </View>
              <View style={styles.inputBox}>
                <Icon name="lock" size={20} color="white" />
                <TextInput
                  style={styles.input}
                  secureTextEntry={!isPasswordVisible}
                  onChangeText={(password) => setPassword(password)}
                  onSubmitEditing={() => UserLogIn()}
                  underlineColorAndroid="transparent"
                  placeholder="Password"
                  placeholderTextColor="rgba(200, 200, 200,0.7)"
                />
                <TouchableOpacity
                  style={{ position: "absolute", right: 10 }}
                  onPress={() => {
                    setIsPasswordVisible(!isPasswordVisible);
                  }}
                >
                  {passwordIsVisible()}
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.midTwo}>
              <TouchableOpacity style={styles.loginButton} onPress={UserLogIn}>
                <Text style={styles.buttonText}>ACCEDI</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <Text style={styles.loginSubTextSkip}>Salta</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.bottomZone}>
            <View style={{ flexDirection: "row", marginBottom: 2 }}>
              <Text style={styles.loginSubText}>Non hai un'account?</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Register");
                }}
              >
                <Text style={styles.loginSubTextLink}>Registrati</Text>
              </TouchableOpacity>
            </View>
            {/* <View style={{ flexDirection: 'row' }}>
              <Text style={styles.loginSubText}>Password dimenticata?</Text>
              <TouchableOpacity>
                <Text style={styles.loginSubTextLink}>Recupera</Text>
              </TouchableOpacity>
            </View> */}
          </View>
        </View>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  backGround: {
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor: primaryColor,
  },

  box: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: "15%",
    paddingTop: "0%",
  },
  topZone: {
    width: "100%",
    height: "100%",
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    marginTop: 30,
  },
  midZone: {
    width: "100%",
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomZone: {
    position: "absolute",
    bottom: "5%",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
  },

  midOne: {
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
    margin: 15,
  },
  midTwo: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    margin: 15,
    marginBottom: 40,
  },

  loginText: {
    color: colors.secondary,
    // fontFamily: font,
    fontSize: 30,
    marginLeft: 5,
    fontWeight: "800",
  },
  loginSubText: {
    color: "#CDCDCD",
    // fontFamily: font,
    fontSize: 15,
    marginLeft: 5,
  },
  loginSubTextSkip: {
    color: "#CDCDCD",
    // fontFamily: font,
    fontSize: 13,
    marginLeft: 5,
    marginTop: 20,
  },
  loginSubTextLink: {
    color: secondaryColor,
    // fontFamily: font,
    fontSize: 15,
    marginLeft: 5,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 60,
    borderRadius: 10,
    backgroundColor: "rgba(210, 210, 210, 0.2)",
    marginBottom: 20,
    padding: 10,
  },
  input: {
    width: "90%",
    height: 40,
    color: "white",
    // fontFamily: font,
    fontSize: 15,
    marginLeft: 10,
  },

  logoText: {
    // fontFamily: font,
    color: colors.secondary,
    fontSize: 40,
    fontWeight: "800",
    marginHorizontal: 10,
  },
  loginButton: {
    width: 220,
    height: 70,
    backgroundColor: secondaryColor,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    // fontFamily: font,
    color: colors.primary,
    fontSize: 25,
    fontWeight: "800",
  },
});
