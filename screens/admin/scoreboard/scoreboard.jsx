import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Switch,
  ScrollView,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  Alert,
} from "react-native";
import { useSelector } from "react-redux";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  orderBy,
  query,
  updateDoc,
  writeBatch,
} from "firebase/firestore";

import { db } from "../../../firebase/firebase";
import { Header } from "../../../components/header";
import { colors } from "../../../shared/colors";
import { font } from "../../../shared/fonts";

export default function Scoreboard() {
  const eventID = useSelector((state) => state.eventID.value);

  const [isPublic, setIsPublic] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Teams array with { name, points, number } each
  const [teams, setTeams] = useState([]);

  // A local state to store changes to points: { [teamNumber]: "stringValue" }
  const [pointsChange, setPointsChange] = useState({});

  // Toggle scoreboard public
  const handleSwitch = async () => {
    setIsPublic((prev) => !prev);
    await updateDoc(doc(db, "events", eventID), {
      scoreboardPublic: !isPublic,
    });
    console.log("scoreboardPublic updated to:", !isPublic);
  };

  // Get scoreboard status
  const getScoreboardStatus = async () => {
    const eventRef = doc(db, "events", eventID);
    const snapshot = await getDoc(eventRef);
    if (snapshot.exists()) {
      setIsPublic(snapshot.data().scoreboardPublic);
    }
  };

  // Fetch teams from Firestore, ordered desc by "points"
  const getTeamsFromDB = useCallback(async () => {
    setRefreshing(true);
    try {
      const teamsRef = collection(db, "events", eventID, "teams");
      const q = query(teamsRef, orderBy("points", "desc"));
      const querySnapshot = await getDocs(q);

      const teamList = querySnapshot.docs.map((docSnap) => ({
        // "number" is presumably a unique ID. If the doc ID is the actual number, you can do docSnap.id
        number: docSnap.data().number,
        name: docSnap.data().name,
        points: docSnap.data().points || 0,
      }));

      setTeams(teamList);

      // Initialize pointsChange for each team (e.g., "0" by default)
      const tempChanges = {};
      teamList.forEach((team) => {
        tempChanges[team.number] = "0"; // start with "0" meaning no change
      });
      setPointsChange(tempChanges);
    } catch (e) {
      console.error(e);
    }
    setRefreshing(false);
  }, [eventID]);

  useEffect(() => {
    getScoreboardStatus();
    getTeamsFromDB();
  }, [getTeamsFromDB]);

  // Single batch update for all teams
  const handleBatchUpdate = async () => {
    try {
      const batch = writeBatch(db);
      teams.forEach((team) => {
        const delta = parseInt(pointsChange[team.number]) || 0;
        // newPoints = current points + delta
        const newPoints = team.points + delta;

        const teamDocRef = doc(
          db,
          "events",
          eventID,
          "teams",
          team.number.toString()
        );
        batch.update(teamDocRef, { points: newPoints });
      });

      await batch.commit();
      Alert.alert("Successo", "Punteggi aggiornati correttamente!");

      // Re-fetch the updated data
      getTeamsFromDB();
    } catch (error) {
      console.error("Error updating points in batch:", error);
      Alert.alert("Errore", "Non è stato possibile aggiornare i punteggi.");
    }
  };

  return (
    <>
      <Header />
      <View style={styles.container}>
        {/* Toggle scoreboardPublic */}
        <View style={styles.publicToggle}>
          <Text style={styles.publicToggleText}>Classifica pubblica</Text>
          <Switch
            trackColor={{ false: "#767577", true: colors.primary }}
            thumbColor={isPublic ? colors.secondary : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={handleSwitch}
            value={isPublic}
          />
        </View>

        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={getTeamsFromDB}
            />
          }
        >
          {teams.map((team, i) => (
            <View style={styles.teamRow} key={i}>
              <View style={styles.teamInfo}>
                <Text style={styles.teamText}>
                  {i + 1}. {team.name}
                </Text>
                <Text style={styles.pointsText}>
                  Punti attuali: {team.points}
                </Text>
              </View>

              {/* Input for points change */}
              <TextInput
                style={styles.pointsInput}
                keyboardType="numeric"
                value={pointsChange[team.number] || ""}
                onChangeText={(val) =>
                  setPointsChange((prev) => ({
                    ...prev,
                    [team.number]: val,
                  }))
                }
                placeholder="+5 / -3..."
                placeholderTextColor="#888"
              />
            </View>
          ))}
        </ScrollView>

        {/* Button to confirm batch update */}
        <TouchableOpacity
          style={styles.updateButton}
          onPress={handleBatchUpdate}
        >
          <Text style={styles.updateButtonText}>Conferma Aggiornamenti</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: 20,
  },
  publicToggle: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: colors.bg,
    padding: 15,
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    marginBottom: 20,
  },
  publicToggleText: {
    fontSize: 20,
    fontWeight: "800",
    marginLeft: 10,
  },
  teamRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.bg,
    marginBottom: 15,
    borderRadius: 10,
    padding: 15,
  },
  teamInfo: {
    flex: 1,
    marginRight: 10,
  },
  teamText: {
    fontSize: 20,
    fontFamily: font.bold,
    color: colors.primary,
    marginBottom: 5,
  },
  pointsText: {
    fontSize: 16,
    fontFamily: font.regular,
    color: "black",
  },
  pointsInput: {
    width: 80,
    height: 40,
    backgroundColor: colors.bg,
    borderRadius: 5,
    textAlign: "center",
    fontSize: 18,
    fontFamily: font.bold,
  },
  updateButton: {
    marginTop: 20,
    backgroundColor: colors.secondary,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
  },
  updateButtonText: {
    color: colors.primary,
    fontSize: 18,
    fontFamily: font.bold,
  },
});
