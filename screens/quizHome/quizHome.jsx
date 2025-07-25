import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, ActivityIndicator, Alert } from "react-native";
import { useSelector } from "react-redux";
import { getDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import * as Location from "expo-location";
import { getDistance } from "geolib";

import { db } from "../../firebase/firebase";
import Loading from "../../components/loading";
import { colors } from "../../shared/colors";
import { font } from "../../shared/fonts";

import QuizBoth from "./quizBoth";
import QuizMessage from "./quizMessage";
import QuizPhoto from "./quizPhoto";
import BarScreen from "./barScreen";

export default function QuizHome({ navigation, route }) {
  const auth = useSelector((state) => state.auth);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userTeam, setUserTeam] = useState("");
  const [quizData, setQuizData] = useState(null);
  const [teamData, setTeamData] = useState({});
  const [scoreboardPublic, setScoreboardPublic] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [position, setPosition] = useState({});
  const [permission, setPermission] = useState();
  const [distance, setDistance] = useState(null);

  const eventID = route.params.eventID;
  const quizID = route.params.quizID;
  const currentTime = new Date();

  // Controlla lo stato della classifica
  const checkScoreboard = async () => {
    try {
      const snapshot = await getDoc(doc(db, "events", eventID));
      if (snapshot.exists()) {
        setScoreboardPublic(snapshot.data().scoreboardPublic);
      }
    } catch (e) {
      console.error("Error getting scoreboard status: ", e);
    }
  };

  // Verifica la posizione rispetto al quiz
  const geolocationCheck = async (quizID) => {
    setLoading(true);
    let flag = false;
    try {
      const snapshot = await getDoc(doc(db, "events", eventID, "quiz", quizID));
      const quizCoords = snapshot.data().quizCoords;
      setPosition(quizCoords);

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setPermission(false);
        console.log("Permission to access location was denied");
        return false;
      } else {
        setPermission(true);
      }

      const location = await Location.getCurrentPositionAsync({});
      setUserLocation(location);

      const distance = getDistance(
        { latitude: quizCoords.latitude, longitude: quizCoords.longitude },
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }
      );
      console.log("Distance: ", distance);
      if (distance < 50) flag = true;
      setDistance(distance);
    } catch (e) {
      console.error("Error fetching position: ", e);
    } finally {
      setLoading(false);
    }
    return flag;
  };

  // Ottiene un nuovo quiz e aggiorna il database
  const getNewQuiz = useCallback(
    async (quiz, team) => {
      try {
        const snapshot = await getDoc(doc(db, "events", eventID, "quiz", quiz));
        if (snapshot.exists()) {
          const data = snapshot.data();
          if (data.type === "bonus" || data.type === "malus") {
            if (!data.active) {
              Alert.alert(
                "Bonus/malus già utilizzato",
                "Questo bonus/malus è gia stato utilizzato e non può essere riutilizzato"
              );
            } else {
              Alert.alert(
                "Hai ottenuto un bonus/malus!",
                "Controlla la sezione bonus/malus per scoprire di più"
              );
              await updateDoc(doc(db, "events", eventID, "quiz", snapshot.id), {
                active: false,
              });
              await setDoc(
                doc(
                  db,
                  "events",
                  eventID,
                  "teams",
                  userTeam,
                  "b-m",
                  snapshot.id
                ),
                {
                  type: data.type,
                  message: data.message,
                }
              );
              navigation.navigate("BonusMalus", { eventID, userTeam });
            }
          } else {
            const isGeolocationValid = data.geolocationCheck
              ? await geolocationCheck(quiz)
              : true;
            if (
              (parseInt(teamData.lastQuizNum) + 1 === parseInt(data.number) ||
                teamData.lastQuizNum === 0) &&
              isGeolocationValid
            ) {
              setQuizData(data);
              setTeamData({ ...teamData, lastQuizNum: data.number });
              await updateDoc(doc(db, "events", eventID, "teams", team), {
                lastQuiz: quizID,
                lastQuizNum: data.number,
                timeOfScan: currentTime,
              });
              await setDoc(
                doc(db, "events", eventID, "teams", team, "quiz", quiz),
                {
                  scanned: true,
                  time: currentTime,
                }
              );
              await setDoc(
                doc(db, "events", eventID, "quiz", quiz, "scanned", team),
                {
                  name: teamData.name,
                  timeOfScan: currentTime,
                }
              );
            } else if (!isGeolocationValid) {
              Alert.alert(
                "Troppo distante!",
                "Avvicinati alla tappa per poter leggere questo QR"
              );
            } else if (
              parseInt(teamData.lastQuizNum) >= parseInt(data.number)
            ) {
              Alert.alert(
                "QR già letto",
                "Questo QR code è stato già scannerizzato da te o da un tuo compagno di squadra"
              );
            } else {
              Alert.alert(
                "Dove vai così veloce?",
                "Questo non è il QR che avresti dovuto trovare, riprova :)."
              );
            }
          }
        }
      } catch (e) {
        console.error("Error getting new quiz: ", e);
      }
    },
    [eventID, quizID, teamData, userTeam, currentTime, navigation]
  );

  // Recupera le informazioni del team
  const getTeamInfo = async (team) => {
    try {
      const snapshot = await getDoc(doc(db, "events", eventID, "teams", team));
      if (snapshot.exists()) {
        setTeamData(snapshot.data());
        const lastQuiz = snapshot.data().lastQuiz;
        if (lastQuiz) {
          const quizSnapshot = await getDoc(
            doc(db, "events", eventID, "quiz", lastQuiz)
          );
          if (quizSnapshot.exists()) {
            setQuizData(quizSnapshot.data());
          }
        }
      }
    } catch (e) {
      console.error("Error fetching team info: ", e);
    }
  };

  // Recupera il team e le relative informazioni dal database
  const getTeamAndData = async () => {
    try {
      const snapshot = await getDoc(
        doc(db, "users", auth.currentUser.uid, "bookings", eventID)
      );
      if (snapshot.exists()) {
        const team = snapshot.data().team;
        setUserTeam(team);
        await getTeamInfo(team);
      }
    } catch (e) {
      console.error("Error fetching team number: ", e);
    }
  };

  // Gestisce il refresh dei dati
  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await checkScoreboard();
      if (quizID === undefined) {
        await getTeamAndData();
      } else {
        await getNewQuiz(quizID, userTeam);
      }
    } catch (error) {
      console.error("Error refreshing: " + error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    handleRefresh();
  }, [route.params.eventID, route.params.quizID]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Verifica quiz in corso...</Text>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }
  if (!quizData) return <Loading />;

  // Rendering in base al tipo (quiz o nuovo tipo "bar")
  switch (quizData.type) {
    case "both":
      return (
        <QuizBoth
          navigation={navigation}
          eventID={eventID}
          quizData={quizData}
          userTeam={userTeam}
          scoreboardPublic={scoreboardPublic}
        />
      );
    case "message":
      return (
        <QuizMessage
          navigation={navigation}
          eventID={eventID}
          quizData={quizData}
          userTeam={userTeam}
          scoreboardPublic={scoreboardPublic}
          refreshing={refreshing}
          handleRefresh={handleRefresh}
        />
      );
    case "photo":
      return (
        <QuizPhoto
          navigation={navigation}
          eventID={eventID}
          quizData={quizData}
          userTeam={userTeam}
          scoreboardPublic={scoreboardPublic}
          refreshing={refreshing}
          handleRefresh={handleRefresh}
        />
      );
    case "bar":
      // Supponiamo che quizData contenga le proprietà: title, place, openingTime, photo
      return (
        <BarScreen
          navigation={navigation}
          eventID={eventID}
          barData={quizData}
        />
      );
    default:
      return <Loading />;
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 10,
  },
});
