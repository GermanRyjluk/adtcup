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
import { font } from '../shared/fonts'

import { db } from "../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";

import Icon from "react-native-vector-icons/MaterialIcons";

// import { fonts } from '../../shared/fonts.js';
// const font = fonts;

import { colors } from "../shared/colors";
const primaryColor = colors.primary;
const secondaryColor = colors.secondary;

export default function EditTeamInfo({ navigation, route }) {
  const [nome, setNome] = useState(route.params.nome);
  const teamNumber = route.params.number;

  const changeName = async () => {
    if (nome.length != 0 && nome != route.params.nome) {
      try {
        await updateDoc(doc(db, "events", "1VgaAztg9yvbzRLuIjql", "teams", teamNumber.toString()), { name: nome });
        Alert.alert("Nome squadra cambiato con successo!", 'Il nuovo nome "' + nome + '" verrà applicato se fai refresh"')
        navigation.goBack();
      } catch (e) {
        console.error(e);
      }
    } else {
      if (nome.length == 0)
        Alert.alert("Inserire credenziali");
      else
        Alert.alert("Inserire un nome diverso");
    }
  };

  return (
    <>
      <Header />
      <KeyboardAwareScrollView style={styles.backGround}>
        <View style={styles.box}>
          <View style={styles.topZone}>
            <Text style={styles.loginText}>Modifica nome</Text>
            <Text style={styles.loginSubText}>
              Inserisci il nuovo nome che vuoi dare alla tua squadra!
            </Text>
          </View>

          <View style={styles.midZone}>
            <View style={styles.midOne}>
              <View style={styles.inputBox}>
                <Icon name="groups" size={20} color="white" />
                <TextInput
                  style={styles.input}
                  onChangeText={(nome) => setNome(nome)}
                  underlineColorAndroid="transparent"
                  placeholderTextColor="rgba(200, 200, 200,0.7)"
                  returnKeyType={"next"}
                >{nome}</ TextInput>
              </View>
            </View>
            <View style={styles.midTwo}>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => changeName()}
              >
                <Text style={styles.buttonText}>CAMBIA</Text>
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
    marginTop: 10
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
