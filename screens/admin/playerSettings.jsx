import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { colors } from "../../shared/colors";
import { TextInput } from "react-native-gesture-handler";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export default function PlayerSettings({ route }) {
  const eventID = "1VgaAztg9yvbzRLuIjql";
  const playerID = route.params.playerID;
  const [teamNum, setTeamNum] = useState("");
  const handlePress = async (team) => {
    if (team != "") {
      try {
        const docRef = setDoc(
          doc(db, "/events", eventID, "/teams", teamNum, "/players", playerID),
          {
            status: "can play",
          }
        );
        await updateDoc(doc(db, "/events", eventID, "/bookings", playerID), {
          status: "can play",
        });
        Alert.alert("Aggiornato!");
      } catch (e) {
        console.error(e);
      }
    } else {
      Alert.alert("Inserire una squadra");
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primary,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: colors.bg, fontSize: 20, fontWeight: "800" }}>
        Inserire squadra del giocatore
      </Text>
      <TextInput
        style={{
          width: 70,
          marginTop: 10,
          padding: 10,
          backgroundColor: colors.bg,
          borderRadius: 10,
          fontSize: 15,
          fontWeight: "800",
        }}
        onChangeText={(data) => setTeamNum(data)}
      ></TextInput>
      <TouchableOpacity
        onPress={() => handlePress(teamNum)}
        style={{
          backgroundColor: colors.secondary,
          padding: 20,
          borderRadius: 10,
          marginTop: 10,
        }}
      >
        <Text
          style={{ color: colors.primary, fontSize: 20, fontWeight: "800" }}
        >
          Invia
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
