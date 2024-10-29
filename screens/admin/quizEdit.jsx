import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { colors } from "../../shared/colors";
import { font } from "../../shared/fonts";
import { Header } from "../../components/header";

import Icon from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import CheckBox from "expo-checkbox";

import Ionicons from "react-native-vector-icons/Ionicons";

import { Picker } from "@react-native-picker/picker";

export default function QuizEdit({ navigation, route }) {
  const eventID = useSelector((state) => state.eventID.value);

  const [quiz, setQuiz] = useState(route.params.quiz);

  const [message, setMessage] = useState(quiz.message);
  const [photo, setPhoto] = useState(quiz.photo);
  const [type, setType] = useState(quiz.type);
  const [number, setNumber] = useState(quiz.number);
  const [giornata, setGiornata] = useState(quiz.day);

  const handleModifiy = () => {
    // Logica per la creazione del nuovo quiz (es: invio al database)
    const newQuiz = {
      message,
      photo,
      type,
      number: parseInt(number),
      giornata: parseInt(giornata),
    };
    console.log(newQuiz); // Puoi sostituire questo con una funzione che invia il quiz al database
  };

  if (quiz != "") {
    return (
      <>
        <Header />
        <View style={styles.container}>
          {/* Titolo */}
          <Text style={styles.title}>Modifica quiz</Text>

          {/* Input per il messaggio */}
          <TextInput
            style={styles.input}
            placeholder="Messaggio"
            placeholderTextColor="gray"
            value={message}
            onChangeText={(text) => setMessage(text)}
          />

          {/* Input per la foto */}
          <TextInput
            style={styles.input}
            placeholder="URL della foto"
            placeholderTextColor="gray"
            value={photo}
            onChangeText={(text) => setPhoto(text)}
          />

          {/* Input per il numero */}
          <TextInput
            style={styles.input}
            placeholder="Numero"
            placeholderTextColor="gray"
            value={number}
            keyboardType="numeric"
            onChangeText={(text) => setNumber(text)}
          />

          {/* Input per la giornata */}
          <TextInput
            style={styles.input}
            placeholder="Giornata"
            placeholderTextColor="gray"
            value={giornata}
            keyboardType="numeric"
            onChangeText={(text) => setGiornata(text)}
          />
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={type}
              onValueChange={(itemValue) => setType(itemValue)} // Cambia stato in base alla selezione
              style={styles.picker}
            >
              <Picker.Item label="Entrambi" value="both" />
              <Picker.Item label="Solo Testo" value="message" />
              <Picker.Item label="Solo Foto" value="photo" />
              <Picker.Item label="Bonus" value="bonus" />
              <Picker.Item label="Malus" value="malus" />
            </Picker>
          </View>

          <TouchableOpacity
            style={{
              width: "100%",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 10,
            }}
            onPress={() => {
              handleModifiy();
            }}
          >
            <View style={[styles.button]}>
              <Ionicons name="pencil" size={30} color={colors.primary} />
              <Text
                style={{
                  fontSize: 25,
                  color: colors.primary,
                  fontWeight: "bold",
                  marginLeft: 10,
                }}
              >
                Modifica
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </>
    );
  } else {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 70,
    backgroundColor: colors.secondary,
    marginBottom: 0,
    paddingHorizontal: 15,
    borderRadius: 10,
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  container: {
    flex: 1,
    padding: 20,
    width: "100%",
    backgroundColor: colors.primary,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: colors.secondary,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: colors.bg,
  },
  pickerContainer: {
    flex: 1,
    backgroundColor: colors.bg,
    marginBottom: 15,
    borderRadius: 5,
  },
  picker: {
    height: 50,
    width: "100%",
    color: "black",
  },
});
