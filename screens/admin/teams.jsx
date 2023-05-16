import { Alert, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { colors } from "../../shared/colors";

const eventID = "1VgaAztg9yvbzRLuIjql";

export default function Teams() {
  const [players, setPlayers] = useState([]);
  const getTeamsFromDB = useCallback(async () => {
    try {
      const snapshot = getDocs(
        collection(db, "/events", eventID, "/bookings")
      ).then((QuerySnapshot) => {
        setPlayers(QuerySnapshot.docs.map((doc) => doc.data()));
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    getTeamsFromDB();
  }, []);

  const boxColorStatus = (status) => {
    if (status == "pending") return "#DF2A2A";
    if (status == "pay") return colors.secondary;
    if (status == "can play") return "#3B9BE1";
    if (status == "playing") return "#2ADF7D";
  };

  const handleUpgradeState = async (status, uid) => {
    if (status == "pending") {
      try {
        await updateDoc(doc(db, "/events", eventID, "/bookings", uid), {
          status: "pay",
        });
        Alert.alert("Aggiornato!", "Ora puo pagare");
      } catch (e) {
        console.error(e);
      }
    } else if (status == "pay") {
      try {
        await updateDoc(doc(db, "/events", eventID, "/bookings", uid), {
          status: "can play",
        });
        Alert.alert("Aggiornato!", "Ora può giocare");
      } catch (e) {
        console.error(e);
      }
    } else if (status == "can play") {
      Alert.alert("Il giocatore ancora avvia il gioco");
    } else if (status == "playing") {
      Alert.alert(
        "Giocatore in gioco",
        "Vuoi squalificarlo?",
        [
          {
            text: "Si",
            onPress: () => Alert.alert("Squalificato"),
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
        }
      );
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: colors.primary,
        padding: 10,
      }}
    >
      {players.map((player, i) => {
        return (
          <View
            style={{
              width: "100%",
              height: 70,
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              backgroundColor: boxColorStatus(player.status),
              marginBottom: 10,
              paddingHorizontal: 20,
              borderRadius: 10,
            }}
            key={i}
          >
            <Text style={{ fontSize: 20, fontWeight: "800" }}>
              {player.name}
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                padding: 10,
                borderRadius: 10,
                borderColor: "black",
                borderWidth: 2,
              }}
              onPress={() => {
                handleUpgradeState(player.status, player.uid);
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontSize: 15,
                  fontWeight: "800",
                }}
              >
                --{">"}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({});
