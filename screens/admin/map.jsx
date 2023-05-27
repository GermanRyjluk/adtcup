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
import { collection, doc, getDocs, or, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { colors } from "../../shared/colors";

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
      const snapshot = getDocs(
        collection(db, "/events", eventID, "/teams")
      ).then((QuerySnapshot) => {
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

  const boxColorStatus = (status) => {
    if (status == "pending") return "#DF2A2A";
    if (status == "pay") return colors.secondary;
    if (status == "waiting team") return "#FF6033";
    if (status == "can play") return "#3B9BE1";
    if (status == "playing") return "#2ADF7D";
  };

  const handleUpgradeState = async (status, uid) => {
    navigation.navigate("MapPlayers", { teamID: "1" });
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
          status: "can play", //waiting team
        });
        Alert.alert("Aggiornato!", "Ora può giocare");
      } catch (e) {
        console.error(e);
      }
    }
    // else if (status == "waiting team") {
    // try {
    //   await updateDoc(doc(db, "/events", eventID, "/bookings", uid), {
    //     status: "can play",
    //   });
    //   Alert.alert("Aggiornato!", "Ora può giocare");
    // } catch (e) {
    //   console.error(e);
    // }
    // }
    else if (status == "can play") {
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
    // getTeamsFromDB();
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
        <Text style={{ fontSize: 20, fontWeight: "800" }}>{player.name}</Text>
        <View style={{ flexDirection: "row" }}>
          {player.status == "waiting team" ? (
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                padding: 10,
                borderRadius: 10,
                borderColor: "black",
                borderWidth: 2,
              }}
              onPress={() => {
                navigation.navigate("PlayerSettings", {
                  playerID: player.uid,
                });
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontSize: 15,
                  fontWeight: "800",
                }}
              >
                edit
              </Text>
            </TouchableOpacity>
          ) : null}
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
      </View>
    );
  };

  return (
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
            marginVertical: 15,
            justifyContent: "space-around",
          }}
        >
          <CheckBox
            style={{ width: 30, height: 30, borderRadius: 5 }}
            value={red}
            onValueChange={(state) => setRed(state)}
            color={"#DF2A2A"}
          />
          <CheckBox
            style={{ width: 30, height: 30, borderRadius: 5 }}
            value={yellow}
            onValueChange={(state) => setYellow(state)}
            color={colors.secondary}
          />
          <CheckBox
            style={{ width: 30, height: 30, borderRadius: 5 }}
            value={orange}
            onValueChange={(state) => setOrange(state)}
            color={"#FF6033"}
          />
          <CheckBox
            style={{ width: 30, height: 30, borderRadius: 5 }}
            value={blue}
            onValueChange={(state) => setBlue(state)}
            color={"#3B9BE1"}
          />
          <CheckBox
            style={{ width: 30, height: 30, borderRadius: 5 }}
            value={green}
            onValueChange={(state) => setGreen(state)}
            color={"#2ADF7D"}
          />
        </View>
      </View>
      {players.map((player, i) => {
        if (search == "") {
          if (red && player.status == "pending") {
            return render(player, i);
          } else if (yellow && player.status == "can pay") {
            return render(player, i);
          } else if (orange && player.status == "waiting team") {
            return render(player, i);
          } else if (blue && player.status == "can play") {
            return render(player, i);
          } else if (green && player.status == "playing") {
            return render(player, i);
          } else if (!red && !yellow && !orange && !blue && !green) {
            return render(player, i);
          }
        } else if (player.name.toLowerCase().includes(search.toLowerCase())) {
          if (red && player.status == "pending") {
            return render(player, i);
          } else if (yellow && player.status == "can pay") {
            return render(player, i);
          } else if (orange && player.status == "waiting team") {
            return render(player, i);
          } else if (blue && player.status == "can play") {
            return render(player, i);
          } else if (green && player.status == "playing") {
            return render(player, i);
          } else if (!red && !yellow && !orange && !blue && !green) {
            return render(player, i);
          }
        } else return null;
      })}
    </ScrollView>
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
