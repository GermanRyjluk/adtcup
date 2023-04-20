import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/FontAwesome5'; //Trophy (trophy)
import Icon2 from 'react-native-vector-icons/FontAwesome';

// import { Svg, Path } from 'react-native-svg';

// import { auth } from '../../firebase/firebase';
// import { signInWithEmailAndPassword } from 'firebase/auth';

import { Register } from './register';

// import { fonts } from '../../shared/fonts.js';
// const font = fonts;

import { colors } from '../shared/colors';
const primaryColor = colors.primary;
const secondaryColor = colors.secondary;

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const user = { user: 'user' };

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       navigation.navigate('mainDrawer', {
  //         userData: auth.currentUser?.email,
  //       });
  //     }
  //   });

  //   return () => {
  //     unsubscribe;
  //   };
  // }, []);

  const UserLogIn = () => {
    // if (email.length != 0 && password.length != 0) {
    //   signInWithEmailAndPassword(auth, email, password)
    //     .then((UserCredential) => {
    //       navigation.navigate('mainDrawer', {
    //         userData: UserCredential.user.email,
    //       });
    //     })
    //     .catch((e) => {
    //       if (e.code == 'auth/user-not-found') {
    //         Alert.alert('Email incorretto o inesistente');
    //       }
    //       if (e.code == 'auth/wrong-password') {
    //         Alert.alert('Password errata');
    //       }
    //     });
    // } else {
    //   Alert.alert('Inserire credenziali');
    // }
  };

  const pressHandlerRegister = () => {
    navigation.navigate('Register');
  };
  const pressHandlerSkip = () => {
    // navigation.navigate('mainDrawer', { userData: '' });
  };

  const passwordIsVisible = () => {
    if (!isPasswordVisible) {
      return <Icon2 name="eye" size={20} color="white" />;
    } else if (isPasswordVisible) {
      return <Icon2 name="eye-slash" size={20} color="white" />;
    }
  };
  return (
    <KeyboardAwareScrollView style={styles.backGround}>
      <ScrollView style={styles.backGround}>
        <View style={styles.box}>
          <View style={styles.topZone}>
            {/* <Svg viewBox="206.77 115 136.5 136.3" height={70} width={70}>
              <Path
                d="m 278.8202 115 c 16.787 0.927 32.641 8.014 44.5259 19.906 l -0.021 -0.064 c 21.532 21.616 26.108 54.8939 11.211 81.5199 c -14.898 26.625 -45.6539 40.1339 -75.3399 33.091 c -29.541 -7.007 -50.8859 -32.672 -52.4259 -62.9579 v -0.844 c 0.076 -0.644 0.35 -1.252 0.79 -1.738 c 0.553 -0.597 1.32 -0.95 2.133 -0.981 c 1.681 -0.05 3.098 1.244 3.201 2.923 c 1.413 33.522 29.155 59.8849 62.7069 59.5889 c 33.551 -0.296 60.8239 -27.144 61.6459 -60.6859 c 0.823 -33.543 -25.102 -61.6949 -58.5979 -63.6349 c -1.681 -0.114 -2.956 -1.561 -2.859 -3.243 c 0.057 -1.594 1.354 -2.856 2.939 -2.88 z m 53.5499 70.1419 c -1.035 30.86 -26.45 55.2859 -57.3269 55.0959 c -15.122 0.009 -29.623 -6.019 -40.2809 -16.748 c -1.127 -1.199 -1.127 -3.068 0 -4.267 c 1.191 -1.149 3.077 -1.149 4.267 0 c 15.982 15.964 40.572 19.488 60.3929 8.654 c 19.821 -10.834 30.132 -33.434 25.324 -55.5049 c -4.809 -22.071 -23.587 -38.334 -46.1179 -39.9409 c -1.685 -0.065 -2.999 -1.483 -2.934 -3.168 c 0.065 -1.685 1.483 -2.999 3.168 -2.934 c 30.82 1.879 54.5429 27.953 53.5079 58.8129 z m -53.5929 -41.403 c 20.876 1.983 36.5999 19.873 35.8879 40.831 c -0.712 20.957 -17.614 37.7389 -38.5759 38.301 c -1.664 0.047 -2.988 1.409 -2.987 3.073 c 0.035 1.664 1.407 2.989 3.072 2.965 c 24.02 -0.854 43.2859 -20.143 44.1109 -44.1629 c 0.826 -24.021 -17.071 -44.5869 -40.9749 -47.0879 h -0.554 c -1.631 0.04 -2.963 1.317 -3.073 2.944 c -0.06 1.603 1.173 2.96 2.774 3.051 z m 16.727 59.9519 c 8.287 -8.278 10.77 -20.733 6.291 -31.556 c -4.48 -10.822 -15.039 -17.88 -26.752 -17.88 c -11.713 0 -22.272 7.058 -26.751 17.88 c -4.479 10.823 -1.996 23.278 6.291 31.556 c 11.313 11.268 29.607 11.268 40.9209 0 z"
                fill="#FFFFFF"
              />
            </Svg> */}
            {/* <Image source={require('../../assets/icon-white.png')} /> */}
            {/* <Icon name="speaker" size={70} color="white" /> */}
            <View
              style={{
                // flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                marginTop: 50,
              }}
            >
              {/* <Text style={styles.logoText}>ADT</Text> */}
              <Icon1 name="trophy" size={50} color={colors.secondary} />
              <Text style={styles.logoText}>ADT CUP</Text>
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
                  returnKeyType={'next'}
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
              <TouchableOpacity style={styles.loginButton} onPress={UserLogIn}>
                <Text style={styles.buttonText}>ACCEDI</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={pressHandlerSkip}>
                <Text style={styles.loginSubTextSkip}>Salta</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.bottomZone}>
            <View style={{ flexDirection: 'row', marginBottom: 2 }}>
              <Text style={styles.loginSubText}>Non hai un'account?</Text>
              <TouchableOpacity onPress={pressHandlerRegister}>
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
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: primaryColor,
  },

  box: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '15%',
    paddingTop: '20%',
  },
  topZone: {
    width: '100%',
    height: '100%',
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  midZone: {
    width: '100%',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomZone: {
    position: 'absolute',
    bottom: '5%',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  midOne: {
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    margin: 15,
  },
  midTwo: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
    marginBottom: 40,
  },

  loginText: {
    color: colors.secondary,
    // fontFamily: font,
    fontSize: 30,
    marginLeft: 5,
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
    color: colors.secondary,
    fontSize: 40,
    fontWeight: '800',
    marginHorizontal: 10,
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
