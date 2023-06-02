import { View, Text } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Header } from "../components/header";
import { colors } from "../shared/colors";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { QrButton } from "../components/qrButton";
import { Footer } from "../components/footer";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import Loading from "../components/loading";

export default function TeamInfo({ route }) {
  const eventID = "1VgaAztg9yvbzRLuIjql";

  const [teamInfo, setTeamInfo] = useState([]);
  const [players, setPlayers] = useState([]);

  const getTeamInfo = useCallback(async () => {
    try {
      await getDoc(
        doc(db, "users", auth.currentUser.uid, "bookings", eventID)
      ).then(async (snapshot) => {
        if (snapshot.exists()) {
          await getDoc(
            doc(db, "events", eventID, "teams", snapshot.data()["team"])
          ).then((snapshot) => {
            if (snapshot.exists()) {
              setTeamInfo(snapshot.data());
            }
          });
          await getDocs(
            collection(
              db,
              "events",
              eventID,
              "teams",
              snapshot.data()["team"],
              "players"
            )
          ).then((QuerySnapshot) => {
            setPlayers(QuerySnapshot.docs.map((doc) => doc.data()));
          });
          // then((snapshot) => {
          //   snapshot.forEach((doc) => players.push(doc.data()));
          // });
        }
      });
    } catch (e) {
      console.error("Error fetching team info: ", e);
    }
  }, []);
  useEffect(() => {
    getTeamInfo();
  }, []);

  if (teamInfo && players) {
    console.log("Team: ", teamInfo);
    console.log("Players: ", players);
    return (
      <>
        {/* <Header /> */}
        <View
          style={{
            height: "100%",
            backgroundColor: colors.bg,
          }}
        >
          <Image source={require("../assets/user.png")} />
          <View style={{ padding: 20 }}>
            <TouchableOpacity
              style={{
                height: 50,
                width: 130,
                backgroundColor: colors.primary,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "800", color: "white" }}>
                Modifica
              </Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 15, fontWeight: "500" }}>
              Nome squadra:
            </Text>
            <Text style={{ fontSize: 20, fontWeight: "800", marginBottom: 20 }}>
              {teamInfo.name}
            </Text>
            <Text style={{ fontSize: 15, fontWeight: "500" }}>
              Partecipanti:
            </Text>
            {players.map((player, i) => {
              return (
                <Text style={{ fontSize: 20, fontWeight: "800" }} key={i}>
                  {player.name}
                </Text>
              );
            })}
            {/* <Text style={{ fontSize: 20, fontWeight: "800" }}>
              Giuseppe Bellisario
            </Text>
            <Text style={{ fontSize: 20, fontWeight: "800" }}>
              Pietro Giancristofaro
            </Text>
            <Text style={{ fontSize: 20, fontWeight: "800" }}>
              German Ryjluk
            </Text>
            <Text style={{ fontSize: 20, fontWeight: "800", marginBottom: 20 }}>
              Federica Masciangelo
            </Text> */}
          </View>
          {/* <View style={{ position: "absolute", bottom: 100, right: 15 }}>
            <QrButton />
          </View> */}
        </View>
        <Footer />
      </>
    );
  } else {
    return <Loading />;
  }
}
