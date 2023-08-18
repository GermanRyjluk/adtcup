import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { colors } from "../../shared/colors";
import { TextInput } from "react-native-gesture-handler";
import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";
import { Header } from "../../components/header";
import { font } from "../../shared/fonts";

export default function PlayerSettings({ navigation, route }) {
  const eventID = "1VgaAztg9yvbzRLuIjql";
  const playerID = route.params.playerID;
  const playerName = route.params.playerName;
  const playerStatus = route.params.playerStatus;
  const [teamNum, setTeamNum] = useState("");
  const handlePress = async (team) => {
    if (team != "") {
      if (playerStatus == 'can play' || playerStatus == 'playing') {
        try {
          await getDoc(doc(db, "users", playerID, "bookings", eventID)).then(async (snapshot) => {
            if (teamNum != snapshot.data()["team"]) {
              await deleteDoc(doc(db, "events", eventID, "teams", snapshot.data()["team"], "players", playerID))
            }
          })
        } catch (e) {
          console.error("Error deleting: " + e)
        }
      }
      try {
        // create events/teams/1/players/playerID
        const docRef = setDoc(
          doc(db, "/events", eventID, "/teams", teamNum, "/players", playerID),
          {
            status: "can play",
            name: playerName,
          }
        );
        await updateDoc(doc(db, "/events", eventID, "/bookings", playerID), {
          status: "can play",
        });
        await setDoc(doc(db, "/users", playerID, "/bookings", eventID), {
          team: teamNum,
        });
        await setDoc(doc(db, "/events", eventID, "/teams", teamNum), {
          name: "Squadra " + teamNum,
          lastQuiz: "vErhQU5ApvBVNfQwD8Td",
          lastQuizNum: 1,
          number: teamNum,
          points: 0,
          timeOfScan: new Date(),
          startingPoint: "https://goo.gl/maps/MqjWxfvu7nMN6Pjk6",
          startingPointCoords: { latitude: '42.22799298389713', longitude: '14.396967792527494' }
        });
        Alert.alert("Aggiornato!");
        navigation.goBack();
      } catch (e) {
        console.error(e);
      }
    } else {
      Alert.alert("Inserire una squadra");
    }
  };
  return (
    <>
      <Header />
      <View
        style={{
          flex: 1,
          backgroundColor: colors.primary,
          justifyContent: "center",
          alignItems: "center",
          padding: 30
        }}
      >
        <Text style={{ color: colors.bg, fontSize: 20, fontFamily: font.bold, textAlign: 'center' }}>
          Inserire squadra del giocatore:
        </Text>
        <Text style={{ color: colors.secondary, fontSize: 20, fontFamily: font.bold, textAlign: 'center', marginTop: 10, marginBottom: 20 }}>
          {playerName}
        </Text>
        <TextInput
          style={{
            width: 70,
            marginTop: 10,
            padding: 15,
            backgroundColor: colors.bg,
            borderRadius: 10,
            fontSize: 20,
            fontWeight: "800",
          }}
          onChangeText={(data) => setTeamNum(data)}
        ></TextInput>
        <TouchableOpacity
          onPress={() => handlePress(teamNum)}
          style={{
            backgroundColor: colors.secondary,
            padding: 20,
            width: 200,
            borderRadius: 10,
            marginTop: 40,
            alignItems: 'center'
          }}
        >
          <Text
            style={{ color: colors.primary, fontSize: 25, fontFamily: font.bold }}
          >
            Invia
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
