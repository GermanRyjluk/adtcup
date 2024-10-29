import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import { useSelector } from "react-redux";
import CheckBox from "expo-checkbox";
import React, { useCallback, useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  or,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { colors } from "../../shared/colors";
import { Header } from "../../components/header";

import Ionicons from "react-native-vector-icons/Ionicons";

// const eventID = "1VgaAztg9yvbzRLuIjql";

// status = pending - can pay - waiting team - can play - playing

export default function Bookings({ navigation }) {
  const eventID = useSelector((state) => state.eventID.value);

  const [players, setPlayers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");

  const [red, setRed] = useState(false);
  const [yellow, setYellow] = useState(false);
  const [orange, setOrange] = useState(false);
  const [blue, setBlue] = useState(false);
  const [green, setGreen] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const getTeamsFromDB = useCallback(async () => {
    setRefreshing(true);
    try {
      const snapshot = getDocs(
        collection(db, "/events", eventID, "/bookings")
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
    if (status == "eliminated") return "#7d7d7d";
  };

  const handleDelete = async (uid) => {
    Alert.alert(
      "Elimina giocatore",
      "Attenzione, quest'azione è irreversibile!",
      [
        {
          text: "Conferma",
          onPress: async () => {
            try {
              await deleteDoc(doc(db, "/events", eventID, "/bookings", uid));
              Alert.alert("Eliminato!", "Giocatore eliminato permanentemente");
            } catch (e) {
              console.error(e);
            }
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
      }
    );
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
          status: "waiting team",
        });
        Alert.alert("Aggiornato!", "Ora può giocare");
      } catch (e) {
        console.error(e);
      }
    } else if (status == "waiting team") {
      try {
        Alert.alert(
          "Inserire squadra!",
          "inserire prima il numero della squadra a cui appartiene il giocatore (se gia fatto ricarica la pagina)"
        );
      } catch (e) {
        console.error(e);
      }
    } else if (status == "can play") {
      Alert.alert(
        "Aspettando partenza",
        "Il giocatore ancora avvia il gioco, avviare manualmente?",
        [
          {
            text: "Si",
            onPress: async () => {
              try {
                await updateDoc(doc(db, "/events", eventID, "/bookings", uid), {
                  status: "playing",
                });
                Alert.alert("Aggiornato!", "Ora sta giocando");
              } catch (e) {
                console.error(e);
              }
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
        }
      );
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
          backgroundColor: boxColorStatus(player.status),
          marginBottom: 10,
          paddingHorizontal: 20,
          borderRadius: 10,
        }}
        key={i}
      >
        <Text style={{ fontSize: 20, fontWeight: "800" }}>{player.name}</Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              padding: 10,
            }}
            onPress={() => handleDelete(player.uid)}
          >
            <Ionicons name="trash" size={30} />
          </TouchableOpacity>
          {player.status == "waiting team" ||
          player.status == "can play" ||
          player.status == "playing" ? (
            <TouchableOpacity
              style={{
                padding: 10,
              }}
              onPress={() => {
                navigation.navigate("PlayerSettings", {
                  playerID: player.uid,
                  playerName: player.name,
                  playerStatus: player.status,
                });
              }}
            >
              <Ionicons name="build" size={35} />
            </TouchableOpacity>
          ) : null}
          {player.status != "waiting team" && player.status != "playing" ? (
            <TouchableOpacity
              style={{
                padding: 10,
              }}
              onPress={() => {
                handleUpgradeState(player.status, player.uid);
              }}
            >
              <Ionicons name="arrow-forward" size={40} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  };

  return (
    <>
      <Header />

      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 10,
          right: 30,
          zIndex: 10,
          backgroundColor: colors.primary,
          borderRadius: 50,
          padding: 10,
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 3,
          borderColor: colors.secondary,
        }}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons
          name="information-circle-outline"
          size={50}
          color={colors.secondary}
        />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>
            Glossario degli stati di prenotazione
          </Text>

          <View
            style={{
              marginVertical: 15,
              alignItems: "baseline",
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                marginBottom: 10,
              }}
            >
              <CheckBox
                style={{ width: 30, height: 30, borderRadius: 5 }}
                value={red}
                onValueChange={(state) => setRed(state)}
                color={"#DF2A2A"}
              />
              <Text style={{ marginLeft: 10, color: "white", fontSize: 18 }}>
                In attesa di essere accettato
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                marginBottom: 10,
              }}
            >
              <CheckBox
                style={{ width: 30, height: 30, borderRadius: 5 }}
                value={yellow}
                onValueChange={(state) => setYellow(state)}
                color={colors.secondary}
              />
              <Text style={{ marginLeft: 10, color: "white", fontSize: 18 }}>
                In attesa di pagamento
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                marginBottom: 10,
              }}
            >
              <CheckBox
                style={{ width: 30, height: 30, borderRadius: 5 }}
                value={orange}
                onValueChange={(state) => setOrange(state)}
                color={"#FF6033"}
              />
              <Text style={{ marginLeft: 10, color: "white", fontSize: 18 }}>
                In attesa di avere una squadra
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                marginBottom: 10,
              }}
            >
              <CheckBox
                style={{ width: 30, height: 30, borderRadius: 5 }}
                value={blue}
                onValueChange={(state) => setBlue(state)}
                color={"#3B9BE1"}
              />
              <Text style={{ marginLeft: 10, color: "white", fontSize: 18 }}>
                In attesa di inizio evento
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                marginBottom: 10,
              }}
            >
              <CheckBox
                style={{ width: 30, height: 30, borderRadius: 5 }}
                value={green}
                onValueChange={(state) => setGreen(state)}
                color={"#2ADF7D"}
              />
              <Text style={{ marginLeft: 10, color: "white", fontSize: 18 }}>
                In gioco
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.textStyle}>Chiudi</Text>
          </TouchableOpacity>
        </View>
      </Modal>

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
          const shouldRenderPlayer = (player) => {
            const { status } = player; // Destructure for clarity
            const colorConditions = {
              red: status === "pending" && red,
              yellow: status === "can pay" && yellow,
              orange: status === "waiting team" && orange,
              blue: status === "can play" && blue,
              green: status === "playing" && green,
            };

            // Check if any of the color conditions are true
            return (
              Object.values(colorConditions).some(Boolean) ||
              (!red && !yellow && !orange && !blue && !green)
            );
          };

          const renderPlayerIfNeeded = (player, i) => {
            if (shouldRenderPlayer(player)) {
              return render(player, i);
            }
            return null;
          };

          // Main rendering logic
          if (search === "") {
            return renderPlayerIfNeeded(player, i);
          } else if (player.name.toLowerCase().includes(search.toLowerCase())) {
            return renderPlayerIfNeeded(player, i);
          }

          return null;
        })}
        <View style={{ height: 50 }} />
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "55%", // 3/4 dello schermo
    backgroundColor: colors.primary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingTop: 30,
    alignItems: "center",
  },
  modalText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: colors.secondary,
    textAlign: "center",
  },
  closeButton: {
    position: "absolute",
    bottom: 50,
    backgroundColor: colors.secondary,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 40,
    elevation: 2,
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
});
