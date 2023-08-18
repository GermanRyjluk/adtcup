import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { colors } from "../../shared/colors";
import { font } from "../../shared/fonts";

import Ionicons from "react-native-vector-icons/Ionicons";
import { Header } from "../../components/header";
import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export default function Dashboard({ navigation }) {

  const number = 3;
  let i = 1;

  const handleRestart = () => {
    Alert.alert(
      "Riavvia Gioco",
      "Tutti i giocatori potranno giocare, sei sicuro?",
      [
        {
          text: "Si",
          onPress: () => {
            Alert.alert(
              "Pie, sei sicuro di quello che stai a fa?",
              "Tutti i giocatori potranno giocare, procedere?",
              [
                {
                  text: "Si",
                  onPress: async () => {
                    Alert.alert("Gioco riavviato")
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
  }

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
          <TouchableOpacity
            style={[
              styles.box,
              { marginBottom: 15, width: "100%", backgroundColor: "#229D5B" },
            ]}
            onPress={() => navigation.navigate("Map")}
          >
            <Text style={styles.text}>Mappa</Text>
            <Ionicons name="book" size={50} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.box, {
              backgroundColor: colors.bg,
              marginBottom: 15,
            }]}
            onPress={() => navigation.navigate("Bookings")}
          >
            <Text style={styles.text}>Prenotazioni</Text>
            <Ionicons name="list" size={50} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.box, {
              backgroundColor: 'orange',
              marginBottom: 15,
            }]}
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
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <TouchableOpacity
              style={[styles.box, { backgroundColor: "#B52F2F" }]}
              onPress={() => { handleRestart() }}
            >
              <Ionicons name="flash" size={50} />
            </TouchableOpacity>
            <View style={{ width: 10, height: 100 }} />
            <TouchableOpacity
              style={[styles.box, { backgroundColor: "grey" }]}
              onPress={() => navigation.navigate("Settings")}
            >
              <Ionicons name="cog" size={50} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
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
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  text: {
    fontSize: 25,
    fontFamily: font.bold,
  },
});