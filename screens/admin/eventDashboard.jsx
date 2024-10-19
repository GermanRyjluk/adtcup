import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { colors } from "../../shared/colors";
import { font } from "../../shared/fonts";

import Ionicons from "react-native-vector-icons/Ionicons";
import { Header } from "../../components/header";
import Loading from "@//components/loading";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "@//firebase/firebase";
import { useSelector } from "react-redux";

export default function Dashboard({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [teamIndexes, settTeamIndexes] = useState([]);

  const eventID = useSelector((state) => state.eventID.value);

  const updateLastQuizNumber = async () => {
    setLoading(true);
    try {
      await getDocs(collection(db, "events", eventID, "teams")).then(
        (snapshot) => {
          settTeamIndexes(snapshot.docs.map((doc) => doc.id));
        }
      );
    } catch (e) {
      console.error(e);
    } finally {
      try {
        for (let i = 0; i < teamIndexes.length; i++) {
          // console.log(teamIndexes[i]);
          await updateDoc(doc(db, "events", eventID, "teams", teamIndexes[i]), {
            lastQuizNum: 0,
          }).then(() => {
            // console.log("Aggiornate", i + 1, "squadre.");
          });
        }
      } catch (e) {
        console.error(e);
      }

      setLoading(false);
    }
  };

  const handleRestart = () => {
    Alert.alert(
      "Riavvia Gioco",
      "Tutte le squadre potranno giocare alla nuova giornata, sei sicuro?",
      [
        {
          text: "Si",
          onPress: () => {
            Alert.alert(
              "Pie, sei sicuro di quello che stai a fa?",
              "Tutte le squadre potranno giocare, procedere?",
              [
                {
                  text: "Si",
                  onPress: async () => {
                    updateLastQuizNumber();
                    Alert.alert("Gioco riavviato");
                  },
                  style: "cancel",
                },
                {
                  text: "Anulla",
                  onPress: () => null,
                  style: "cancel",
                },
              ],
              {
                cancelable: true,
              },
              [],
              {
                cancelable: true,
                onDismiss: () =>
                  Alert.alert(
                    "This alert was dismissed by tapping outside of the alert dialog."
                  ),
              }
            );
          },
          style: "cancel",
        },
        {
          text: "Anulla",
          onPress: () => null,
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      },
      [],
      {
        cancelable: true,
        onDismiss: () =>
          Alert.alert(
            "This alert was dismissed by tapping outside of the alert dialog."
          ),
      }
    );
  };

  if (loading) {
    return <Loading color={colors.primary} />;
  } else {
    return (
      <>
        <Header screen={"home"} />
        <View style={{ backgroundColor: colors.primary, flex: 1 }}>
          <View style={styles.container}>
            <TouchableOpacity
              style={[
                styles.box,
                { marginBottom: 15, width: "100%", backgroundColor: "#B438FF" },
              ]}
              onPress={() => navigation.navigate("Scoreboard")}
            >
              <Text style={styles.text}>Classifica</Text>
              <Ionicons name="bar-chart" size={50} />
            </TouchableOpacity>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <TouchableOpacity
                style={[
                  styles.box,
                  {
                    marginBottom: 15,
                    marginRight: 15,
                    flex: 1,
                    backgroundColor: "#229D5B",
                  },
                ]}
                onPress={() => navigation.navigate("Map")}
              >
                <Text style={styles.text}>Mappa</Text>
                <Ionicons name="book" size={40} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.box,
                  {
                    marginBottom: 15,
                    flex: 1,
                    backgroundColor: "#73bbff",
                  },
                ]}
                onPress={() => navigation.navigate("Quiz")}
              >
                <Text style={styles.text}>Quiz</Text>
                <Ionicons name="search" size={40} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[
                styles.box,
                {
                  backgroundColor: colors.bg,
                  marginBottom: 15,
                },
              ]}
              onPress={() => navigation.navigate("Bookings")}
            >
              <Text style={styles.text}>Prenotazioni</Text>
              <Ionicons name="list" size={50} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.box,
                {
                  backgroundColor: "orange",
                  marginBottom: 15,
                },
              ]}
              onPress={() => navigation.navigate("QrReader", { admin: true })}
            >
              <Text style={styles.text}>Lettore Qr</Text>
              <Ionicons name="qr-code" size={50} />
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={[
                styles.box,
                { marginBottom: 15, width: "100%", backgroundColor: "#FF6738" },
              ]}
              onPress={() => navigation.navigate("Teams")}
            >
              <Text style={styles.text}>Squadre</Text>
              <Ionicons name="people" size={50} />
            </TouchableOpacity> */}
            {/* <TouchableOpacity
              style={[styles.box, {
                backgroundColor: colors.secondary,
                marginBottom: 15,
              }]}
              onPress={() => navigation.navigate("Stats")}
            >
              <Text style={styles.text}>Statistiche</Text>
              <Ionicons name="analytics" size={50} />
            </TouchableOpacity> */}
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity
                style={[styles.box, { backgroundColor: "#B52F2F" }]}
                onPress={() => {
                  handleRestart();
                }}
              >
                <Ionicons name="flash" size={50} />
              </TouchableOpacity>
              <View style={{ width: 10, height: 100 }} />
              <TouchableOpacity
                style={[styles.box, { backgroundColor: "grey" }]}
                onPress={() => navigation.navigate("AdminSettings")}
              >
                <Ionicons name="cog" size={50} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
    borderRadius: 10,
    padding: 10,
  },
  box: {
    flex: 1,
    height: 100,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  text: {
    fontSize: 25,
    fontFamily: font.bold,
  },
});
