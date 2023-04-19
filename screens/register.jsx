import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// import { auth, db } from '../../firebase/firebase.js';
// import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
// import { doc, setDoc } from 'firebase/firestore';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';

// import { fonts } from '../../shared/fonts.js';
// const font = fonts;

import { colors } from '../shared/colors';
const primaryColor = colors.primary;
const secondaryColor = colors.secondary;

export const Register = () => {
  const pressHandler = () => {
    // navigation.goBack();
  };

  const [newUserEmail, setUserEmail] = useState('');
  const [newUserName, setUserName] = useState('');
  const [newUserPassword, setUserPassword] = useState('');
  const [newUserConfirmPassword, setUserConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const UserRegistration = async () => {
    // if (newUserPassword.length >= 6) {
    //   if (
    //     newUserPassword.length != 0 &&
    //     newUserName.length != 0 &&
    //     newUserEmail.length != 0
    //   ) {
    //     if (newUserConfirmPassword === newUserPassword) {
    //       try {
    //         await createUserWithEmailAndPassword(
    //           auth,
    //           newUserEmail,
    //           newUserPassword
    //         )
    //           .then((userCredential) => {
    //             const docRef = setDoc(
    //               doc(db, 'users/' + userCredential.user.uid),
    //               {
    //                 name: newUserName,
    //                 email: newUserEmail,
    //               }
    //             );
    //             console.log(docRef.name);
    //             navigation.navigate('mainDrawer', {
    //               userData: userCredential.user.email,
    //             });
    //           })
    //           .catch((e) => console.log(e));
    //         await updateProfile(auth.currentUser, {
    //           displayName: newUserName,
    //           // phoneNumber : 'asdasdasd',
    //           // photoURL: 'asdasdas',
    //         }).catch((err) => console.log(err));
    //       } catch (e) {
    //         if (e.code == 'auth/email-already-in-use') {
    //           Alert.alert('Email già in uso');
    //         }
    //         if (e.code == 'auth/invalid-email') {
    //           Alert.alert('Formato email errato (esempio@mail.com)');
    //         }
    //         console.log(e.code);
    //       }
    //       // fetch("http://192.168.1.10:80/app/login/register.php", {
    //       //   method: "POST",
    //       //   headers: {
    //       //     Accept: "application/json",
    //       //     "Content-Type": "application/json",
    //       //   },
    //       //   body: JSON.stringify({
    //       //     userName: newUserName,
    //       //     email: newUserEmail,
    //       //     password: newUserPassword,
    //       //   }),
    //       // })
    //       //   .then((response) => response.json())
    //       //   .then((responseJson) => {
    //       //     if (responseJson == "success") {
    //       //       navigation.navigate("mainDrawer", { role: "user" });
    //       //     }
    //       //   })
    //       //   .catch((error) => {
    //       //     console.error(error);
    //       //   });
    //     } else {
    //       Alert.alert('Le password non coincidono');
    //     }
    //   } else {
    //     Alert.alert('Inserire credenziali');
    //   }
    // } else {
    //   Alert.alert('Password troppo corta');
    // }
  };

  const passwordIsVisible = () => {
    if (!isPasswordVisible) {
      return <Icon2 name="eye" size={20} color="white" />;
    } else if (isPasswordVisible) {
      return <Icon2 name="eye-slash" size={20} color="white" />;
    }
  };

  return (
    <View style={styles.backGround}>
      <View style={styles.box}>
        <TouchableOpacity style={styles.goBack} onPress={pressHandler}>
          <Icon name="arrow-back-ios" size={20} color="white" />
        </TouchableOpacity>
        <View style={styles.topZone}>
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
                placeholder="Nome"
                placeholderTextColor="rgba(200, 200, 200,0.7)"
                returnKeyType={'next'}
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
                returnKeyType={'next'}
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
                returnKeyType={'next'}
              />
              <TouchableOpacity
                style={{ position: 'absolute', right: 10 }}
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
                placeholder="Conferma Password"
                placeholderTextColor="rgba(200, 200, 200,0.7)"
                onSubmitEditing={() => UserRegistration()}
              />
              <TouchableOpacity
                style={{ position: 'absolute', right: 10 }}
                onPress={() => {
                  setIsPasswordVisible(!isPasswordVisible);
                }}
              >
                {passwordIsVisible()}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.midTwo}>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={UserRegistration}
            >
              <Text style={styles.buttonText}>REGISTRATI</Text>
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
    </View>
  );
};
const styles = StyleSheet.create({
  backGround: {
    flex: 1,
    backgroundColor: primaryColor,
  },

  box: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20%',
    paddingTop: '15%',
  },
  topZone: {
    width: '100%',
    height: '100%',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  midZone: {
    width: '100%',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomZone: {
    position: 'absolute',
    bottom: 40,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  midOne: {
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginBottom: 15,
  },
  midTwo: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
  },

  goBack: {
    position: 'absolute',
    left: 50,
    top: 30,
  },
  loginText: {
    // fontFamily: font,
    fontSize: 30,
    marginLeft: 5,
    color: colors.secondary,
    fontWeight: '800',
  },
  loginSubText: {
    color: '#CDCDCD',
    // fontFamily: font,
    fontSize: 15,
    marginLeft: 5,
  },
  loginSubTextSkip: {
    color: '#CDCDCD',
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 60,
    borderRadius: 10,
    backgroundColor: 'rgba(210, 210, 210, 0.2)',
    marginBottom: 20,
    padding: 10,
  },
  input: {
    width: '90%',
    height: 40,
    color: 'white',
    // fontFamily: font,
    fontSize: 15,
    marginLeft: 10,
  },

  logoText: {
    // fontFamily: font,
    color: 'white',
    marginTop: -10,
    fontSize: 35,
  },
  loginButton: {
    width: 220,
    height: 70,
    backgroundColor: secondaryColor,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    // fontFamily: font,
    color: colors.primary,
    fontSize: 25,
    fontWeight: '800',
  },
});
