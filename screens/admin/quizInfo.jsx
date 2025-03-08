import React, { useCallback, useEffect, useState } from "react";
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
  writeBatch, // For batch writes
} from "firebase/firestore";
import Ionicons from "react-native-vector-icons/Ionicons";
import { db } from "../../firebase/firebase";
import { colors } from "../../shared/colors";
import { font } from "../../shared/fonts";
import { Header } from "../../components/header";
import { useSelector } from "react-redux";

const f1Points = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];

export default function QuizInfo({ navigation, route }) {
  const eventID = useSelector((state) => state.eventID.value);
  const [quiz, setQuiz] = useState(route.params.quiz);
  const [teamsOrder, setTeamsOrder] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // This will store the "add" points (NOT the total).
  // Keyed by team name or an index.
  // We’ll default them using the f1 array in render.
  const [pointsToAdd, setPointsToAdd] = useState({});

  // Fetch teams in order of arrival
  const getTeamsOrder = useCallback(async () => {
    setRefreshing(true);
    try {
      // 1) Get the scanned docs in arrival order
      const scannedSnapshot = await getDocs(
        query(
          collection(db, "events", eventID, "quiz", quiz.id, "scanned"),
          orderBy("timeOfScan", "asc")
        )
      );

      // 2) Get all teams in the event, so we can read their "points" and "name"
      const teamsSnapshot = await getDocs(
        collection(db, "events", eventID, "teams")
      );

      // Build a map of teams: { [teamID]: { name, points } }
      const teamsMap = {};
      teamsSnapshot.forEach((docSnap) => {
        teamsMap[docSnap.id] = docSnap.data();
      });

      // Combine data: read the scanned docs for order, then find each team's data
      const combinedData = scannedSnapshot.docs.map((scannedDoc, i) => {
        const teamID = scannedDoc.id; // The doc ID in scanned presumably matches the team's ID
        const team = teamsMap[teamID] || {};
        return {
          id: teamID,
          name: team.name || "NoName",
          points: team.points || 0,
          timeOfScan: scannedDoc.data().timeOfScan,
        };
      });

      setTeamsOrder(combinedData);

      // 3) Initialize pointsToAdd with default F1 scoring
      const newPointsToAdd = {};
      combinedData.forEach((team, i) => {
        const defaultPoints = f1Points[i] !== undefined ? f1Points[i] : 0;
        newPointsToAdd[team.id] = String(defaultPoints);
      });
      setPointsToAdd(newPointsToAdd);
    } catch (e) {
      console.error("Errore fetching data: ", e);
    } finally {
      setRefreshing(false);
    }
  }, [eventID, quiz.id]);

  useEffect(() => {
    getTeamsOrder();
  }, [getTeamsOrder]);

  const handleUpdatePoints = async () => {
    try {
      const batch = writeBatch(db);

      teamsOrder.forEach((team, i) => {
        console.log("Updating: " + team.name);
        // We have the new points to add in pointsToAdd[team.id]
        const toAdd = parseInt(pointsToAdd[team.id]) || 0;
        // We'll update the team doc in "events/eventID/teams/team.id"
        // Instead of scanning subcollection "scanned", we assume main team doc is stored at
        // db, "events", eventID, "teams", <TEAM_ID>
        const teamRef = doc(db, "events", eventID, "teams", team.id);
        const newTotal = (team.points || 0) + toAdd;

        batch.update(teamRef, { points: newTotal });
      });

      await batch.commit();
      Alert.alert("Successo", "Punteggi aggiornati correttamente!");
    } catch (error) {
      console.error("Error updating points: ", error);
      Alert.alert("Errore", "Non è stato possibile aggiornare i punteggi.");
    }
  };

  const renderTeamRow = (team, i) => {
    return (
      <View style={styles.teamRow} key={i}>
        <View style={styles.infoContainer}>
          <Text style={styles.indexText}>
            {i + 1} - {team.name}
          </Text>
          <Text style={styles.pointsText}>
            Punti attuali: {team.points || 0}
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.pointsInput}
            keyboardType="numeric"
            value={pointsToAdd[team.id]}
            onChangeText={(val) =>
              setPointsToAdd((prev) => ({
                ...prev,
                [team.id]: val,
              }))
            }
          />
        </View>
      </View>
    );
  };

  return (
    <>
      <Header />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ alignItems: "center" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getTeamsOrder} />
        }
      >
        {/* Edit Quiz Button */}
        <TouchableOpacity
          style={styles.editButtonWrapper}
          onPress={() => navigation.navigate("QuizEdit", { quiz })}
        >
          <View style={styles.button}>
            <Ionicons name="pencil" size={30} color={colors.primary} />
            <Text style={styles.buttonText}>Modifica Quiz</Text>
          </View>
        </TouchableOpacity>

        {/* Teams in order of arrival */}
        {teamsOrder.map((team, i) => renderTeamRow(team, i))}

        {/* Button to update points */}
        <TouchableOpacity
          style={styles.updateButton}
          onPress={handleUpdatePoints}
        >
          <Text style={styles.updateButtonText}>Aggiorna Punteggi</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: 10,
  },
  editButtonWrapper: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  button: {
    width: "100%",
    height: 60,
    backgroundColor: colors.bg,
    paddingHorizontal: 15,
    borderRadius: 10,
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  buttonText: {
    fontSize: 25,
    color: colors.primary,
    fontWeight: "bold",
    marginLeft: 10,
  },

  // Team row
  teamRow: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 10,
  },
  infoContainer: {
    backgroundColor: colors.bg,
    borderRadius: 10,
    marginRight: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: "center",
    width: "75%",
  },
  indexText: {
    fontSize: 20,
    fontFamily: font.bold,
  },
  pointsText: {
    fontSize: 14,
    fontFamily: font.regular,
  },
  inputContainer: {
    backgroundColor: colors.bg,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: "25%",
    justifyContent: "center",
  },
  pointsInput: {
    backgroundColor: colors.bg,
    borderRadius: 5,
    fontFamily: font.medium,
    fontSize: 20,
    padding: 10,
    textAlign: "center",
  },

  // Update points button
  updateButton: {
    width: "100%",
    marginTop: 20,
    backgroundColor: colors.secondary,
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
  },
  updateButtonText: {
    color: colors.primary,
    fontSize: 22,
    fontFamily: font.bold,
  },
});
