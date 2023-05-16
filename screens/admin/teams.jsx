import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { QuerySnapshot, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { colors } from "../../shared/colors";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Teams() {
  const [players, setPlayers] = useState([]);
  const getTeamsFromDB = useCallback(async () => {
    try {
      const snapshot = getDocs(
        collection(db, "/events", "1VgaAztg9yvbzRLuIjql", "/bookings")
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

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: colors.primary,
        padding: 10,
      }}
    >
      {players.map((player) => {
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
