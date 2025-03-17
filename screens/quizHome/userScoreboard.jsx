import {
  StyleSheet,
  Text,
  View,
  Switch,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { colors } from "@//shared/colors";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "@//firebase/firebase";
import { RefreshControl } from "react-native";
import { Header } from "@//components/header";
import { font } from "@//shared/fonts";

export default function Scoreboard({ route }) {
  const [isPublic, setIsPublic] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [teams, setTeams] = useState([]);

  // const eventID = "1VgaAztg9yvbzRLuIjql";
  const eventID = route.params.eventID;

  const getTeamsFromDB = useCallback(async () => {
    setRefreshing(true);
    try {
      const snapshot = getDocs(
        query(
          collection(db, "/events", eventID, "/teams"),
          orderBy("points", "desc")
        )
      ).then((QuerySnapshot) => {
        setTeams(QuerySnapshot.docs.map((doc) => doc.data()));
      });
    } catch (e) {
      console.error(e);
    }
    setRefreshing(false);
  }, []);

  useEffect(() => {
    getTeamsFromDB();
    // console.log(teams);
  }, []);

  return (
    <>
      <Header />
      <ScrollView
        style={{ flex: 1, backgroundColor: colors.primary, padding: 20 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getTeamsFromDB} />
        }
      >
        <Text
          style={{
            fontSize: 40,
            fontFamily: font.bold,
            color: colors.secondary,
            marginBottom: 20,
          }}
        >
          CLASSIFICA
        </Text>
        {teams.map((team, i) => {
          return (
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                height: 70,
                justifyContent: "space-between",
                backgroundColor: colors.bg,
                marginBottom: 20,
                borderRadius: 20,
                alignItems: "center",
                justifyContent: "center",
              }}
              key={i}
            >
              <View
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 25,
                  backgroundColor: colors.secondary,
                  marginLeft: 20,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: font.bold,
                    marginBottom: 3,
                    color: colors.primary,
                  }}
                >
                  {i + 1}
                </Text>
              </View>
              <View
                style={{
                  flex: 2,
                  marginHorizontal: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: font.medium,
                    marginBottom: 3,
                    color: colors.primary,
                  }}
                >
                  {team.name}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  height: "100%",
                  borderRadius: 20,
                  backgroundColor: colors.secondary,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 30,
                    fontFamily: font.bold,
                    marginBottom: 3,
                    color: colors.primary,
                  }}
                >
                  {team.points}K
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({});
