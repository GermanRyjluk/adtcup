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
import { Header } from "../components/header";

import { auth, db } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";

// import { fonts } from '../../shared/fonts.js';
// const font = fonts;

import { colors } from "../shared/colors";
import { font } from "../shared/fonts";
import Checkbox from "expo-checkbox";

import { registerAccount } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";

const primaryColor = colors.primary;
const secondaryColor = colors.secondary;

export default function Register({ navigation }) {
  const pressHandler = () => {
    navigation.navigate("Login");
  };

  const [newUserEmail, setUserEmail] = useState("");
  const [newUserName, setUserName] = useState("");
  const [newUserPassword, setUserPassword] = useState("");
  const [newUserConfirmPassword, setUserConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [loading, setLoading] = useState(false);

  const [checked, setChecked] = useState(false);
  const [gender, setGender] = useState(null);

  //Redux
  const dispatch = useDispatch();
  const UserRegistration = async (values) => {
    setLoading(true);
    // console.log(values)
    if (newUserPassword.length >= 6) {
      if (
        newUserPassword.length != 0 &&
        newUserName.length != 0 &&
        newUserEmail.length != 0 &&
        checked
      ) {
        if (newUserConfirmPassword === newUserPassword) {
          dispatch(registerAccount(values));
          // try {
          //   await createUserWithEmailAndPassword(
          //     auth,
          //     newUserEmail,
          //     newUserPassword
          //   )
          //     .then(async (userCredential) => {
          //       const docRef = setDoc(
          //         doc(db, "users/" + userCredential.user.uid),
          //         {
          //           name: newUserName,
          //           email: newUserEmail,
          //           photoURL: gender == 'm' ? "https://static.vecteezy.com/system/resources/previews/009/749/751/original/avatar-man-icon-cartoon-male-profile-mascot-illustration-head-face-business-user-logo-free-vector.jpg" : gender == 'f' ? 'https://static.vecteezy.com/system/resources/previews/009/749/643/non_2x/woman-profile-mascot-illustration-female-avatar-character-icon-cartoon-girl-head-face-business-user-logo-free-vector.jpg' : gender == 'n' ? 'https://media.istockphoto.com/id/1326784239/vector/gender-neutral-profile-avatar-front-view-of-an-anonymous-person-face.jpg?s=612x612&w=0&k=20&c=_uqGw8h0Zhd3m4ImdedpdXZ8-UPxejbc2lGP5J5iTRs=' : null,
          //         }
          //       );
          //       console.log(docRef.name); //undefined :(
          //       // navigation.navigate('Home', {
          //       //   userData: userCredential.user.email,
          //       // });
          //       await updateProfile(auth.currentUser, {
          //         displayName: newUserName,
          //         photoURL: gender == 'm' ? "https://static.vecteezy.com/system/resources/previews/009/749/751/original/avatar-man-icon-cartoon-male-profile-mascot-illustration-head-face-business-user-logo-free-vector.jpg" : gender == 'f' ? 'https://static.vecteezy.com/system/resources/previews/009/749/643/non_2x/woman-profile-mascot-illustration-female-avatar-character-icon-cartoon-girl-head-face-business-user-logo-free-vector.jpg' : gender == 'n' ? 'https://media.istockphoto.com/id/1326784239/vector/gender-neutral-profile-avatar-front-view-of-an-anonymous-person-face.jpg?s=612x612&w=0&k=20&c=_uqGw8h0Zhd3m4ImdedpdXZ8-UPxejbc2lGP5J5iTRs=' : null,
          //       }).catch((err) => console.log(err));

          //       await signInWithEmailAndPassword(auth, newUserEmail, newUserPassword).then(async () => {
          //         await sendEmailVerification(auth.currentUser).catch((e) => console.error("Verification error: " + e))

          //       }).catch((e) => console.error("Signin error: " + e))
          //       Alert.alert("Email di verificazione inviata", "Verifica il tuo account per poter accedere ai servizi ADT CUP!");

          //     })
          //     .catch((e) => console.log(e));

          // } catch (e) {
          //   console.log(e.code);
          //   if (e.code == "auth/email-already-in-use") {
          //     Alert.alert("Email già utilizzato", "Torna alla schermata di login per recuperare la tua password o scegli una nuova mail");
          //   }
          //   if (e.code == "auth/invalid-email") {
          //     Alert.alert("Formato email errato (esempio@mail.com)");
          //   }
          // }
        } else {
          Alert.alert("Le password non coincidono");
        }
      } else {
        Alert.alert("Inserire credenziali");
      }
    } else {
      Alert.alert(
        "Password troppo debole",
        "Lunghezza minima 6 caratteri, alemeno una lettera e un numero"
      );
    }
    setLoading(false);
  };

  const passwordIsVisible = () => {
    if (!isPasswordVisible) {
      return <Icon2 name="eye" size={20} color="white" />;
    } else if (isPasswordVisible) {
      return <Icon2 name="eye-slash" size={20} color="white" />;
    }
  };

  return (
    <>
      {/* <Header /> */}
      <KeyboardAwareScrollView style={styles.backGround}>
        <View style={styles.box}>
          <View style={styles.topZone}>
            <TouchableOpacity
              style={{ marginBottom: 50 }}
              onPress={() => navigation.navigate("Login")}
            >
              <Ionicons name="arrow-back" size={40} color={colors.secondary} />
            </TouchableOpacity>
            <Text style={styles.loginText}>Crea un'account</Text>
            <Text style={styles.loginSubText}>
              Riempire correttamente tutti i campi
            </Text>
          </View>

          <View style={styles.midZone}>
            <View style={styles.midOne}>
              <View style={styles.inputBox}>
                <Icon name="person" size={20} color="white" />
                <TextInput
                  style={styles.input}
                  onChangeText={(tryName) => setUserName(tryName)}
                  underlineColorAndroid="transparent"
                  placeholder="Nome e Cognome"
                  placeholderTextColor="rgba(200, 200, 200,0.7)"
                  returnKeyType={"next"}
                />
              </View>
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
              <View style={styles.inputBox}>
                <Icon name="lock" size={20} color="white" />
                <TextInput
                  style={styles.input}
                  secureTextEntry={!isPasswordVisible}
                  onChangeText={(tryUserPassword) =>
                    setUserPassword(tryUserPassword)
                  }
                  underlineColorAndroid="transparent"
                  placeholder="Password"
                  placeholderTextColor="rgba(200, 200, 200,0.7)"
                  returnKeyType={"next"}
                />
                <TouchableOpacity
                  style={{ position: "absolute", right: 10, padding: 10 }}
                  onPress={() => {
                    setIsPasswordVisible(!isPasswordVisible);
                  }}
                >
                  {passwordIsVisible()}
                </TouchableOpacity>
              </View>
              <View style={styles.inputBox}>
                <Icon name="lock" size={20} color="white" />
                <TextInput
                  style={styles.input}
                  secureTextEntry={!isPasswordVisible}
                  onChangeText={(tryUserPassword) =>
                    setUserConfirmPassword(tryUserPassword)
                  }
                  underlineColorAndroid="transparent"
                  placeholder="Conferma"
                  placeholderTextColor="rgba(200, 200, 200,0.7)"
                  onSubmitEditing={() =>
                    UserRegistration({
                      newUserEmail,
                      newUserPassword,
                      newUserName,
                      gender,
                    })
                  }
                />
                <TouchableOpacity
                  style={{ position: "absolute", right: 10, padding: 10 }}
                  onPress={() => {
                    setIsPasswordVisible(!isPasswordVisible);
                  }}
                >
                  {passwordIsVisible()}
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <Text style={styles.checkBoxText}>Uomo</Text>
                <Checkbox
                  style={{ borderRadius: 50 }}
                  value={checked && gender == "m"}
                  onValueChange={(state) => {
                    setChecked(state);
                    if (state) setGender("m");
                  }}
                  color={colors.secondary}
                />
                <Text style={styles.checkBoxText}>Donna</Text>
                <Checkbox
                  style={{ borderRadius: 50 }}
                  value={checked && gender == "f"}
                  onValueChange={(state) => {
                    setChecked(state);
                    if (state) setGender("f");
                  }}
                  color={colors.secondary}
                />
                <Text style={styles.checkBoxText}>Altro</Text>
                <Checkbox
                  style={{ borderRadius: 50 }}
                  value={checked && gender == "n"}
                  onValueChange={(state) => {
                    setChecked(state);
                    if (state) setGender("n");
                  }}
                  color={colors.secondary}
                />
              </View>
            </View>
            <View style={styles.midTwo}>
              <TouchableOpacity
                style={[
                  styles.loginButton,
                  { backgroundColor: loading ? "gray" : colors.secondary },
                ]}
                onPress={() =>
                  UserRegistration({
                    newUserEmail,
                    newUserPassword,
                    newUserName,
                    gender,
                  })
                }
                disabled={auth?.loading == true || loading}
              >
                <Text
                  style={[
                    styles.buttonText,
                    {
                      color:
                        auth?.loading == true || loading
                          ? "#474747"
                          : colors.primary,
                    },
                  ]}
                >
                  REGISTRATI
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.bottomZone}>
            <Text style={styles.loginSubText}>Hai già un'account?</Text>
            <TouchableOpacity onPressOut={pressHandler}>
              <Text style={styles.loginSubTextLink}>Accedi</Text>
            </TouchableOpacity>
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
    padding: "15%",
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
    fontFamily: font.bold,
    fontSize: 30,
    marginLeft: 5,
    color: colors.secondary,
    fontWeight: "800",
  },
  loginSubText: {
    color: "#CDCDCD",
    fontFamily: font.medium,
    fontSize: 15,
    marginLeft: 5,
  },
  loginSubTextLink: {
    color: secondaryColor,
    fontFamily: font.bold,
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
    fontFamily: font.bold,
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
    fontFamily: font.bold,
    color: colors.primary,
    fontSize: 25,
  },
  checkBoxText: {
    fontFamily: font.medium,
    color: colors.bg,
  },
});
