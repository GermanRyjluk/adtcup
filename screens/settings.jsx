import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import React from "react";
import { Header } from "../components/header";
import { font } from "../shared/fonts";
import { deleteUser, sendEmailVerification } from "firebase/auth";
import { db, auth } from "../firebase/firebase";
import { colors } from "../shared/colors";
import { deleteDoc, doc } from "firebase/firestore";

import { useSelector, useDispatch } from "react-redux";
import { logoutAccount } from '../store/authSlice';

export default function Settings({ navigation }) {
  const dispatch = useDispatch();

  const handleDeleteData = () => {
    deleteUser(auth.currentUser);
    deleteDoc(doc(db, "users", auth.currentUser.uid));
    dispatch(logoutAccount());
    navigation.navigate("Home");
    Alert.alert("Account eliminato", "Tutti i dati relativi al tuo account sono stati eliminati");
  }
  return (
    <>
      <Header />
      <View style={styles.container}>
        <Text style={[styles.text, {
          fontSize: 30,
          marginBottom: 20,
          color: colors.secondary
        }]}>Impostazioni</Text>
        {auth.currentUser ? auth.currentUser?.emailVerified ? null :
          <TouchableOpacity style={styles.box} onPress={() => { sendEmailVerification(auth.currentUser); Alert.alert("Email di verificazione inviata", "Verifica il tuo account per poter accedere ai servizi ADT CUP!") }}>
            <Text style={[styles.text, { fontFamily: font.medium }]}>Richiedi email di verifica</Text>
          </TouchableOpacity> : null}
        {auth.currentUser ? <TouchableOpacity style={styles.box} onPress={() => handleDeleteData()}>
          <Text style={[styles.text, { fontFamily: font.medium }]}>Cancella dati</Text>
        </TouchableOpacity> : null}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.primary,
  },
  box: {
    backgroundColor: colors.bg,
    justifyContent: 'center',
    borderRadius: 10,
    padding: 15,
    marginVertical: 5
  },
  text: {
    fontFamily: font.bold,
    fontSize: 17
  },
})