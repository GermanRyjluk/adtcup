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
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { colors } from "../../shared/colors";
import { font } from "../../shared/fonts";
import { Header } from "../../components/header";

const eventID = "1VgaAztg9yvbzRLuIjql";

// status = pending - can pay - waiting team - can play - playing

export default function Map({ navigation }) {
  const [players, setPlayers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");

  const [red, setRed] = useState(false);
  const [yellow, setYellow] = useState(false);
  const [orange, setOrange] = useState(false);
  const [blue, setBlue] = useState(false);
  const [green, setGreen] = useState(false);

  const getTeamsFromDB = useCallback(async () => {
    setRefreshing(true);
    try {
      const snapshot = getDocs(query(collection(db, "/events", eventID, "/teams"), orderBy("number", "asc")))
        .then((QuerySnapshot) => {
          setPlayers(QuerySnapshot.docs.map((doc) => doc.data()));
        });
    } catch (e) {
      console.error(e);
    }
    setRefreshing(false);
  }, []);

  useEffect(() => {
    getTeamsFromDB();
  }, []);

  const render = (player, i) => {
    return (
      <View
        style={{
          width: "100%",
          height: 70,
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          backgroundColor: colors.bg,
          marginBottom: 10,
          paddingHorizontal: 20,
          borderRadius: 10,
        }}
        key={i}
      >
        <Text style={{ fontSize: 20, fontFamily: font.bold }}>{player.number} - {player.name}</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 20, fontFamily: font.bold }}>{player.lastQuizNum}</Text>
        </View>
      </View>
    );
  };

  return (
    <>
      <Header />
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: colors.primary,
          padding: 10,
        }}
        contentContainerStyle={{
          alignItems: "center",
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getTeamsFromDB} />
        }
      >
        <View
          style={{
            width: "100%",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <TextInput
            style={[styles.input]}
            onChangeText={(search) => setSearch(search)}
            placeholder="Cerca per nome.."
            placeholderTextColor="rgba(200, 200, 200,0.9)"
          />
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              // marginVertical: 15,
              justifyContent: "space-around",
            }}
          >
          </View>
        </View>
        {players.map((player, i) => {
          if (search == "") {
            return render(player, i);
          } else if (player.name.toLowerCase().includes(search.toLowerCase())) {
            return render(player, i);
          } else return null;
        })}
      </ScrollView>
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
