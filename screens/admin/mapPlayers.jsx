import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  TextInput,
} from "react-native";
import CheckBox from "expo-checkbox";
import React, { useCallback, useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  or,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { colors } from "../../shared/colors";
import { Header } from "../../components/header";

const eventID = "1VgaAztg9yvbzRLuIjql";

// status = pending - can pay - waiting team - can play - playing

export default function MapPlayers({ navigation, route }) {
  const [players, setPlayers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");

  const [red, setRed] = useState(false);
  const [yellow, setYellow] = useState(false);
  const [orange, setOrange] = useState(false);
  const [blue, setBlue] = useState(false);
  const [green, setGreen] = useState(false);

  const teamID = route.params.teamID;

  const getPlayers = useCallback(async () => {
    try {
      await getDocs(
        collection(db, "events", eventID, "teams", teamID, "players")
      ).then((QuerySnapshot) => {
        setPlayers(QuerySnapshot.docs.map((doc) => doc.data()));
      });
    } catch (e) {
      console.error(e);
    }
  });

  useEffect(() => {
    getPlayers();
  }, []);

  return (
    <>
      <Header />
      <View>
        <Text>AAAAAA</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginBottom: 0,
    paddingHorizontal: 15,
    borderRadius: 10,
    color: "white",
    letterSpacing: 1,
  },
});
