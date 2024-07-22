import {
  StyleSheet,
  Text,
  View,
  Switch,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { colors } from "../../shared/colors";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { Header } from "../../components/header";

import { useSelector } from "react-redux";

export default function Scoreboard() {
  const eventID = useSelector((state) => state.eventID.value);

  const [isPublic, setIsPublic] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [teams, setTeams] = useState([]);

  const handleSwitch = async () => {
    setIsPublic((previousState) => !previousState);
    await updateDoc(doc(db, "events", eventID), {
      scoreboardPublic: !isPublic,
    });
    console.log("updated");
  };

  const getScoreboardStatus = async () => {
    await getDoc(doc(db, "events", eventID)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.data()["scoreboardPublic"]);
        setIsPublic(snapshot.data()["scoreboardPublic"]);
      }
    });
  };

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
    getScoreboardStatus();
    getTeamsFromDB();
  }, []);

  const updateDB = async (type, number, points) => {
    if (type == "add") {
      try {
        await updateDoc(
          doc(db, "events", eventID, "teams", number.toString()),
          {
            points: increment(1),
          }
        );
      } catch (e) {
        console.error("Error increasing: ", e);
      }
    } else if (type == "minus") {
      try {
        await updateDoc(
          doc(db, "events", eventID, "teams", number.toString()),
          {
            points: increment(-1),
          }
        );
      } catch (e) {
        console.error("Error decreasing: ", e);
      }
    }
  };

  const handleIncrease = async (number, points) => {
    const updatedData = teams.map((team) =>
      team.number === number ? { ...team, points: team.points + 1 } : team
    );
    setTeams(updatedData);
    // console.log(teams);
    console.log("Added");
    updateDB("add", number, points);
  };
  const handleDecrease = (number, points) => {
    const updatedData = teams.map((team) =>
      team.number === number ? { ...team, points: team.points - 1 } : team
    );
    setTeams(updatedData);
    // console.log(teams);
    console.log("Decreased");
    updateDB("minus", number, points);
  };

  return (
    <>
      <Header />
      <View style={{ flex: 1, backgroundColor: colors.primary, padding: 20 }}>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            backgroundColor: colors.bg,
            marginBottom: 20,
            padding: 5,
            borderRadius: 10,
            padding: 20,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "800",
              marginLeft: 10,
            }}
          >
            Classifica pubblica
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: colors.primary }}
            thumbColor={isPublic ? colors.secondary : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => handleSwitch()}
            value={isPublic}
          />
        </View>
        <ScrollView>
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
                <View style={{ width: 250 }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "800",
                      marginBottom: 3,
                      color: colors.bg,
                    }}
                  >
                    {team.name}: {team.points}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      width: 30,
                      height: 30,
                      backgroundColor: colors.secondary,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 20,
                      marginHorizontal: 10,
                    }}
                    onPress={() => handleIncrease(team.number, team.points)}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "800",
                        marginBottom: 3,
                      }}
                    >
                      +
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: 30,
                      height: 30,
                      backgroundColor: colors.secondary,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 20,
                    }}
                    onPress={() => handleDecrease(team.number, team.points)}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "800",
                        marginBottom: 3,
                      }}
                    >
                      -
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
