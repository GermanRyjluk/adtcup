import {
  StyleSheet,
  Text,
  View,
  Switch,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { colors } from "../shared/colors";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function Scoreboard({ route }) {
  const [isPublic, setIsPublic] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [teams, setTeams] = useState([]);

  const eventID = "1VgaAztg9yvbzRLuIjql";
  // const eventID = route.params.eventID;

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
  }, []);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.primary, padding: 20 }}
    >
      {teams.map((team, i) => {
        return (
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              height: 70,
              justifyContent: "space-between",
            }}
            key={i}
          >
            <View>
              <Text
                style={{ fontSize: 20, fontWeight: "800", marginBottom: 3 }}
              >
                {team.name}: {team.points}
              </Text>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
