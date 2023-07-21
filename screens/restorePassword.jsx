import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Header } from '../components/header'

import { auth, db } from "../firebase/firebase";
import { createUserWithEmailAndPassword, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";

// import { fonts } from '../../shared/fonts.js';
// const font = fonts;

import { colors } from "../shared/colors";
const primaryColor = colors.primary;
const secondaryColor = colors.secondary;

export default function RestorePWD({ navigation, route }) {
  const [email, setUserEmail] = useState("");

  // if (route.params.email != undefined) {
  //   setUserEmail(route.params.email);
  // }

  const UserRegistration = async () => {
    if (email.length != 0) {
      sendPasswordResetEmail(auth, email).then(() => {
        Alert.alert(
          "Email inviata",
          "Controlla la tua casella email per recuparare la password",
          [
            {
              text: "OK",
              onPress: () => {
                navigation.navigate("Login");
              },
            },
          ],
          { cancelable: false }
        );
      }).catch((e) => {
        if (e.code == "auth/user-not-found") {
          Alert.alert("Email incorretto o inesistente");
        }
        if (e.code == "auth/wrong-password") {
          Alert.alert("Password errata");
        }
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
    } else {
      Alert.alert("Inserire credenziali");
    }
  };

  return (
    <>
      <Header />
      <KeyboardAwareScrollView style={styles.backGround}>
        <View style={styles.box}>
          <View style={styles.topZone}>
            <TouchableOpacity
              style={{ marginBottom: 50 }} onPress={() => navigation.navigate("Login")}>

              <Ionicons
                name="arrow-back"
                size={40}
                color={colors.secondary}
              />
            </TouchableOpacity>
            <Text style={styles.loginText}>Recupera password</Text>
            <Text style={styles.loginSubText}>
              Inserisci l'email, controlla la casella e segui i passi!
            </Text>
          </View>

          <View style={styles.midZone}>
            <View style={styles.midOne}>

              <View style={styles.inputBox}>
                <Icon name="alternate-email" size={20} color="white" />
                <TextInput
                  style={styles.input}
                  onChangeText={(tryEmail) => setUserEmail(tryEmail)}
                  underlineColorAndroid="transparent"
                  placeholder="Email"
                  placeholderTextColor="rgba(200, 200, 200,0.7)"
                  keyboardType="email-address"
                  returnKeyType={"next"}
                />
              </View>
            </View>
            <View style={styles.midTwo}>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={UserRegistration}
              >
                <Text style={styles.buttonText}>RECUPERA</Text>
              </TouchableOpacity>
            </View>
          </View>


        </View>
        {/* <StatusBar style="light" /> */}
      </KeyboardAwareScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  backGround: {
    flex: 1,
    backgroundColor: primaryColor,
  },

  box: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: "20%",
    paddingTop: "0%",
  },
  topZone: {
    width: "100%",
    height: "100%",
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: 50,
  },
  midZone: {
    width: "100%",
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  bottomZone: {
    position: "absolute",
    bottom: 40,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
  },

  midOne: {
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
    marginBottom: 15,
  },
  midTwo: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    margin: 15,
  },

  goBack: {
    position: "absolute",
    left: 50,
    top: 30,
  },
  loginText: {
    // fontFamily: font,
    fontSize: 30,
    marginLeft: 5,
    color: colors.secondary,
    fontWeight: "800",
  },
  loginSubText: {
    color: "#CDCDCD",
    // fontFamily: font,
    fontSize: 15,
    marginLeft: 5,
    marginTop: 10
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
    padding: 20,
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
    color: "white",
    marginTop: -10,
    fontSize: 35,
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
