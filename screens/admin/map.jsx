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
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { colors } from "../../shared/colors";
import { font } from "../../shared/fonts";
import { Header } from "../../components/header";

import Icon from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";

// const eventID = "1VgaAztg9yvbzRLuIjql";

export default function Map({ navigation }) {
  const eventID = useSelector((state) => state.eventID.value);

  const [players, setPlayers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");

  const getTeamsFromDB = useCallback(async () => {
    setRefreshing(true);
    try {
      const snapshot = getDocs(
        query(
          collection(db, "events", eventID, "teams"),
          orderBy("lastQuizNum", "desc")
        )
      ).then((snapshot) => {
        setPlayers(snapshot.docs.map((doc) => doc.data()));
      });
    } catch (e) {
      console.error(e);
    }
    setRefreshing(false);
  }, []);

  useEffect(() => {
    getTeamsFromDB();
  }, []);

  const handleSkipStage = async (lastQuizNum, teamNumber) => {
    try {
      await getDocs(
        query(
          collection(db, "events", eventID, "quiz"),
          where("number", "==", (lastQuizNum + 1).toString())
        )
      ).then(async (snapshot) => {
        let nextStageID = snapshot.docs.map((doc) => doc.id);
        try {
          await updateDoc(doc(db, "events/", eventID, "teams/", teamNumber), {
            lastQuiz: nextStageID[0],
            lastQuizNum: lastQuizNum + 1,
          });
          await setDoc(
            doc(
              db,
              "events",
              eventID,
              "teams",
              teamNumber,
              "quiz",
              nextStageID[0]
            ),
            {
              scanned: true,
              time: serverTimestamp(),
            }
          );
          Alert.alert(
            "Aggiornato!",
            "Aggiornamento quiz avvenuto correttamente"
          );
          getTeamsFromDB();
        } catch (e) {
          console.error("Errore aggiornando valore quiz squadra: " + e);
        }
      });
    } catch (e) {
      console.error("Errore trovando nuovo quiz: " + e);
    }
  };

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
        <View>
          <Text style={{ fontSize: 20, fontFamily: font.bold }}>
            {player.number} - {player.name}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{
              paddingVertical: 5,
              paddingHorizontal: 10,
              backgroundColor: colors.secondary,
              borderRadius: 10,
              marginRight: 15,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => handleSkipStage(player.lastQuizNum, player.number)}
          >
            <Icon name="caret-forward" size={35} color="white" />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontFamily: font.bold }}>
            {player.lastQuizNum}
          </Text>
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
          ></View>
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
