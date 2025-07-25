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
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
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

  const [id, setId] = useState(quiz.id ? quiz.id : "");
  const [message, setMessage] = useState(quiz.message ? quiz.message : "");
  const [photo, setPhoto] = useState(quiz.photo ? quiz.photo : "");
  const [type, setType] = useState(quiz.type ? quiz.type : "");
  const [number, setNumber] = useState(quiz.number ? quiz.number : "");
  const [giornata, setGiornata] = useState(quiz.day ? quiz.day : "");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const handleModifiy = async (mode) => {
    try {
      if (mode == "new") {
        await setDoc(doc(db, "events", eventID, "quiz", id), {
          type: type,
          message: message,
          photo: photo,
          number: parseInt(number),
          day: parseInt(giornata),
          geolocationCheck: true,
          quizCoords: {
            latitude: latitude,
            longitude: longitude,
          },
        });
      } else {
        console.log("modify");
      }
    } catch (e) {
      console.error(e);
    }
    const newQuiz = {
      id,
      message,
      photo,
      type,
      number: parseInt(number),
      giornata: parseInt(giornata),
    };
    console.log(newQuiz);
  };

  return (
    <>
      <Header />
      <ScrollView style={styles.container}>
        {/* Titolo */}
        <Text style={styles.title}>
          {quiz == "" ? "Crea" : "Modifica"} quiz
        </Text>

        {/* Input per l'id */}
        <TextInput
          style={styles.input}
          placeholder="ID"
          placeholderTextColor="gray"
          value={id}
          onChangeText={(text) => setId(text)}
        />

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
        <TextInput
          style={styles.input}
          placeholder="Latitude"
          placeholderTextColor="gray"
          value={latitude}
          keyboardType="numeric"
          onChangeText={(text) => setLatitude(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Longitude"
          placeholderTextColor="gray"
          value={longitude}
          keyboardType="numeric"
          onChangeText={(text) => setLongitude(text)}
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
            if (quiz == "") {
              handleModifiy("new");
            } else {
              handleModifiy("modify");
            }
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
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 70,
    backgroundColor: colors.secondary,
    marginBottom: 50,
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
    height: 200,
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
