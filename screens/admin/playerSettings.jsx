import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import CheckBox from "expo-checkbox";
import { TextInput } from "react-native-gesture-handler";
import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { Header } from "../../components/header";
import { colors } from "../../shared/colors";
import { font } from "../../shared/fonts";
import { useSelector } from "react-redux";

export default function PlayerSettings({ navigation, route }) {
  const eventID = useSelector((state) => state.eventID.value);

  const { playerID, playerName, playerStatus } = route.params;

  const [teamNum, setTeamNum] = useState("");
  const [createTeam, setCreateTeam] = useState(false);

  const handlePress = async (team) => {
    if (team !== "") {
      // If the player's status is "can play" or "playing", delete them from a previous team if needed
      if (playerStatus === "can play" || playerStatus === "playing") {
        try {
          const bookingDoc = await getDoc(
            doc(db, "users", playerID, "bookings", eventID)
          );
          if (bookingDoc.exists()) {
            if (teamNum !== bookingDoc.data().team) {
              await deleteDoc(
                doc(
                  db,
                  "events",
                  eventID,
                  "teams",
                  bookingDoc.data().team,
                  "players",
                  playerID
                )
              );
            }
          }
        } catch (e) {
          console.error("Error deleting previous team entry: " + e);
        }
      }
      try {
        // Create/Update the player's team document
        await setDoc(
          doc(db, "events", eventID, "teams", teamNum, "players", playerID),
          {
            status: "can play",
            name: playerName,
          }
        );
        // Update the booking status for the event
        await updateDoc(doc(db, "events", eventID, "bookings", playerID), {
          status: "can play",
        });
        // Update the player's booking to record the team
        await setDoc(doc(db, "users", playerID, "bookings", eventID), {
          team: teamNum,
        });
        // Create the team document if it doesn't exist (if the checkbox is checked)
        if (createTeam) {
          await setDoc(doc(db, "events", eventID, "teams", teamNum), {
            name: "Squadra " + teamNum,
            lastQuiz: "",
            lastQuizNum: 1,
            number: teamNum,
            points: 0,
            timeOfScan: new Date(),
            startingPoint: "",
            startingPointCoords: {
              latitude: "",
              longitude: "",
            },
          });
        }
        Alert.alert(
          "Aggiornato!",
          "Le impostazioni sono state aggiornate correttamente."
        );
        navigation.goBack();
      } catch (e) {
        console.error("Error updating settings: ", e);
      }
    } else {
      Alert.alert("Errore", "Inserire un numero di squadra valido");
    }
  };

  return (
    <>
      <Header />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Inserisci la squadra del giocatore:</Text>
        <Text style={styles.playerName}>{playerName}</Text>
        <TextInput
          style={styles.input}
          onChangeText={(data) => setTeamNum(data)}
          placeholder="Numero squadra"
          placeholderTextColor="rgba(0,0,0,0.5)"
          value={teamNum}
        />
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={createTeam}
            onValueChange={() => {
              if (!createTeam) {
                Alert.alert(
                  "Attenzione!",
                  "Se non sei German, chiedi conferma a lui prima di fare questo",
                  [
                    { text: "Anulla", style: "cancel" },
                    {
                      text: "Continua",
                      style: "default",
                      onPress: () => setCreateTeam(true),
                    },
                  ],
                  { cancelable: true }
                );
              } else {
                setCreateTeam(false);
              }
            }}
            color={createTeam ? colors.secondary : undefined}
          />
          <Text style={styles.checkboxLabel}>Crea squadra se non esiste</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handlePress(teamNum)}
        >
          <Text style={styles.buttonText}>Invia</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  title: {
    color: colors.bg,
    fontSize: 22,
    fontFamily: font.bold,
    textAlign: "center",
  },
  playerName: {
    color: colors.secondary,
    fontSize: 22,
    fontFamily: font.bold,
    textAlign: "center",
    marginVertical: 10,
  },
  input: {
    width: 150,
    padding: 15,
    backgroundColor: colors.bg,
    borderRadius: 10,
    fontSize: 14,
    fontWeight: "800",
    color: colors.primary,
    textAlign: "center",
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  checkboxLabel: {
    marginLeft: 10,
    color: colors.bg,
    fontSize: 16,
    fontFamily: font.regular,
  },
  button: {
    backgroundColor: colors.secondary,
    padding: 20,
    width: 200,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: colors.primary,
    fontSize: 25,
    fontFamily: font.bold,
  },
});
