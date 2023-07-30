import { View, Text, ScrollView, RefreshControl } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Header } from "../components/header";
import { colors } from "../shared/colors";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { QrButton } from "../components/qrButton";
import { Footer } from "../components/footer";
import Loading from "../components/loading";

import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { auth, db, storage } from "../firebase/firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { font } from "../shared/fonts";


export default function TeamInfo({ navigation, route }) {
  const eventID = "1VgaAztg9yvbzRLuIjql";
  const footer = route.params?.footer;

  const [teamInfo, setTeamInfo] = useState([]);
  const [players, setPlayers] = useState([]);

  const [imageURL, setImageURL] = useState('');

  const [refreshing, setRefreshing] = useState(false);

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
              getDownloadURL(ref(storage, "flags/" + snapshot.data()["number"] + ".jpeg")).then((url) => setImageURL(url));
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

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    getTeamInfo();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    getTeamInfo();
  }, [teamInfo.number]);

  if (teamInfo && players && imageURL) {
    return (
      <>
        <Header />

        <ScrollView
          style={{
            flex: 1,
            backgroundColor: colors.bg,
            padding: 20,
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        >
          <View>
            <View style={{ alignItems: 'flex-end' }}>
              <TouchableOpacity
                style={{
                  height: 50,
                  width: 130,
                  backgroundColor: colors.primary,
                  borderRadius: 30,
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 20,
                }}
                onPress={() => navigation.navigate("EditTeamInfo", { nome: teamInfo.name, number: teamInfo.number })}
              >
                <Text style={{
                  fontSize: 20,
                  fontFamily: font.bold, color: colors.secondary
                }}>
                  Modifica
                </Text>
              </TouchableOpacity>
            </View>
            <View>
            </View>
            <View style={{ backgroundColor: colors.primary, borderRadius: 20 }}>
              {imageURL != [] ? <Image source={{ uri: imageURL }} style={{
                borderTopRightRadius: 20, borderTopLeftRadius: 20, width: '100%', height: 250
              }} /> : null}
              <View style={{ padding: 20 }}>
                <Text style={{
                  fontSize: 20,
                  fontFamily: font.bold, marginBottom: 20, color: colors.secondary
                }}>
                  {teamInfo.name}
                </Text>
                <Text style={{
                  fontSize: 25,
                  fontFamily: font.light, color: colors.secondary, marginBottom: 10
                }}>
                  Partecipanti:
                </Text>
                {players.map((player, i) => {
                  return (
                    <Text style={{
                      fontSize: 20,
                      fontFamily: font.medium, color: 'white', marginBottom: 10
                    }} key={i}>
                      {player.name}
                    </Text>
                  );
                })}
                <Text style={{ fontSize: 25, fontFamily: font.light, color: colors.secondary, marginVertical: 10 }}>
                  Punteggio:
                </Text>
                <Text style={{ fontSize: 20, fontFamily: font.medium, color: 'white', marginBottom: 5 }}>
                  {teamInfo.points}K
                </Text>
              </View>
            </View>
          </View>
          <View style={{ height: 150 }} />
        </ScrollView >
        {footer ? null : <Footer />}

      </>
    );
  } else {
    return <Loading />;
  }
}
