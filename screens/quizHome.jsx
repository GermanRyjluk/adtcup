import {
  StyleSheet,
  Text,
  View,
  Image,
  BackHandler,
  ScrollView,
  RefreshControl,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { Header } from "../components/header";
import { colors } from "../shared/colors";
import { font } from "../shared/fonts";
import { TouchableOpacity } from "react-native-gesture-handler";
import { QrButton } from "../components/qrButton";
import { db } from "../firebase/firebase";

import Icon from "react-native-vector-icons/MaterialIcons";

import { addDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

import { Footer } from "../components/footer";
import Loading from "../components/loading";
import { useSelector } from "react-redux";

import { getDistance } from "geolib";
import * as Location from "expo-location";

export default function QuizHome({ navigation, route }) {
  const auth = useSelector((state) => state.auth);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [userTeam, setUserTeam] = useState("");
  const [quizData, setQuizData] = useState([null]);

  const [teamData, setTeamData] = useState([]); //lastQuiz, currentHint, timeOfScan, name, number
  const [scoreboardPublic, setScoreboardPublic] = useState(false);

  const [userLocation, setUserLocation] = useState(null);
  const [position, setPosition] = useState({});
  const [permission, setPermission] = useState();
  const [distance, setDistance] = useState(null);

  const eventID = route.params.eventID;
  const quizID = route.params.quizID;

  const currentTime = new Date();

  // ---------------- FETCH FUNCTIONS ---------------- //

  //Get Scoreboard status
  const checkScoreboard = async () => {
    try {
      await getDoc(doc(db, "events", eventID)).then((snapshot) => {
        if (snapshot.exists()) {
          setScoreboardPublic(snapshot.data()["scoreboardPublic"]);
        }
      });
    } catch (e) {
      console.error("Error getting scoreboard status: ", e);
    }
  };

  const geolocationCheck = async (quizID) => {
    let flag = false;
    setLoading(true);
    try {
      const snapshot = await getDoc(doc(db, "events", eventID, "quiz", quizID));
      const quizCoords = snapshot.data()["quizCoords"];
      setPosition(quizCoords);

      // Request location permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setPermission(false);
        console.log("Permission to access location was denied");
        return false; // Return immediately if permission is denied
      } else {
        setPermission(true);
      }

      // Get the current location
      const location = await Location.getCurrentPositionAsync({});
      setUserLocation(location);

      // Calculate the distance between user and quiz coordinates
      const distance = getDistance(
        { latitude: quizCoords.latitude, longitude: quizCoords.longitude },
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }
      );
      console.log("Distanza: ", distance);
      // Set flag to true if within 70 meters
      if (distance < 50) {
        flag = true;
      }

      setDistance(distance); // Optionally update distance state
    } catch (e) {
      console.error("Error fetching position: " + e);
    } finally {
      setLoading(false);
    }

    return flag; // Safely return the flag after try-catch
  };

  //Get new quiz and update database
  const getNewQuiz = useCallback(async (quiz, team) => {
    // setRefreshing(true);
    try {
      await getDoc(doc(db, "events", eventID, "quiz", quiz)).then(
        async (snapshot) => {
          if (snapshot.exists()) {
            if (
              snapshot.data()["type"] == "bonus" ||
              snapshot.data()["type"] == "malus"
            ) {
              if (!snapshot.data()["active"]) {
                Alert.alert(
                  "Bonus/malus già utilizzato",
                  "Questo bonus/malus è gia stato utilizzato e non puo essere riutilizzato"
                );
              } else {
                Alert.alert(
                  "Hai ottenuto un bonus/malus!",
                  "Controlla la sezione bonus/malus per scoprire di più"
                );
                await updateDoc(
                  doc(db, "events", eventID, "quiz", snapshot.id),
                  {
                    active: false,
                  }
                );
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
                    type: snapshot.data()["type"],
                    message: snapshot.data()["message"],
                  }
                );
                navigation.navigate("BonusMalus", {
                  eventID: eventID,
                  userTeam: userTeam,
                });
              }
            } else {
              console.log(parseInt(snapshot.data()["number"]) + 1);

              // Check if the team's last quiz number and geolocation are valid
              const isGeolocationValid = await geolocationCheck(quiz);

              if (
                (parseInt(teamData["lastQuizNum"]) + 1 ===
                  parseInt(snapshot.data()["number"]) ||
                  teamData["lastQuizNum"] === 0) &&
                isGeolocationValid
              ) {
                setQuizData(snapshot.data());
                await updateDoc(doc(db, "events", eventID, "teams", team), {
                  lastQuiz: quizID,
                  lastQuizNum: snapshot.data()["number"],
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
                    name: teamData["name"],
                    timeOfScan: currentTime,
                  }
                );
              } else if (!isGeolocationValid) {
                Alert.alert(
                  "Troppo distante!",
                  "Avvicinati alla tappa per poter leggere questo QR"
                );
              } else if (
                parseInt(teamData["lastQuizNum"]) ===
                  parseInt(snapshot.data()["number"]) ||
                parseInt(teamData["lastQuizNum"]) >
                  parseInt(snapshot.data()["number"])
              ) {
                Alert.alert(
                  "QR già letto",
                  "Questo QR code è stato già scannerizzato da te o da un tuo compagno di squadra"
                );
              } else {
                Alert.alert(
                  "Dove vai cosi veloce?",
                  "Questo non è il qr che avresti dovuto trovare, riprova :)"
                );
              }
            }
          }
        }
      );
    } catch (e) {
      console.error("Error getting new quiz: ", e);
    }
    // setRefreshing(false);
  });

  //Get team information
  const getTeamInfo = async (team) => {
    try {
      await getDoc(doc(db, "events", eventID, "teams", team)).then(
        async (snapshot) => {
          if (snapshot.exists()) {
            setTeamData(snapshot.data());

            //Get last quiz scanned info
            await getDoc(
              doc(db, "events", eventID, "quiz", snapshot.data()["lastQuiz"])
            ).then((snapshot) => {
              if (snapshot.exists()) {
                setQuizData(snapshot.data());
              }
            });

            //Use last time to calculate number of hints available

            // const numberOfHints =
            // console.log(
            //   differenceInMilliseconds(
            //     currentTime,
            //     new Date(snapshot.data()["timeOfScan"])
            //   ) / 1000
            // );

            // console.log(snapshot.data()["timeOfScan"].toDate());

            // if (
            //   300 -
            //     differenceInMilliseconds(
            //       currentTime,
            //       new Date(snapshot.data()["timeOfScan"])
            //     ) /
            //       1000 <
            //   0
            // ) {
            //   // console.log("Searching next hint");
            //   console.log("do not render countdown");
            //   setAboveZero(false);
            //   // getNewHint(
            //   //   snapshot.data()["lastQuiz"],
            //   //   snapshot.data()["currentHint"]
            //   // );
            // } else {
            //   console.log("render countdown");
            //   setAboveZero(true);
            // }
          }
        }
      );
    } catch (e) {
      console.error("Error fetchin team info: ", e);
    }
  };

  //Get team number
  const getTeamAndData = async () => {
    // setRefreshing(true);
    try {
      const docRef = await getDoc(
        doc(db, "/users", auth.currentUser.uid, "/bookings", eventID)
      ).then(async (snapshot) => {
        if (snapshot.exists()) {
          // console.log("Team: ", snapshot.data());
          setUserTeam(snapshot.data()["team"]);
          getTeamInfo(snapshot.data()["team"]);
        }
      });
    } catch (e) {
      console.error("Error fetching team number: ", e);
    }
    // setRefreshing(false);
  };

  //On refresh
  const handleRefresh = () => {
    setRefreshing(true);
    checkScoreboard();
    if (quizID === undefined) {
      // console.log("Last Quiz");
      getTeamAndData();
    } else {
      // console.log("New Quiz: ", quizID);
      getNewQuiz(quizID, userTeam);
    }
    setRefreshing(false);
  };

  //handle countdown completed
  const handleCompletedCountdown = async (quiz, hint) => {
    console.log("Countdown completed: ", hint);
    //Add new hint to team collection

    //Update lastScan and hint number
    // let now = new Date();
    // await updateDoc(doc(db, "events", eventID, "teams", userTeam), {
    //   timeOfScan: now.toString(),
    //   currentHint: hint + 1,
    // });
    navigation.navigate("Hint", { hintID: hint });
  };

  //Get scoreboard status

  //Get number of hints to be shown

  // ---------------- FETCH FUNCTIONS ---------------- //

  useEffect(() => {
    handleRefresh();
  }, [route.params.eventID, route.params.quizID]);

  // ---------------- RENDER ---------------- //
  if (!quizData) {
    return <Loading />;
  }
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.bg,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: colors.primary,
            marginBottom: 10,
          }}
        >
          Verifica quiz in corso...
        </Text>
        <ActivityIndicator color={colors.primary} size={20} />
      </View>
    );
  }
  if (quizData.type == "both") {
    return (
      <>
        <Header screen={"OnGame"} />
        <ScrollView
          style={{ padding: 20, flex: 1, backgroundColor: colors.bg }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        >
          <View
            style={{
              width: "100%",
              height: 450,
              backgroundColor: colors.primary,
              borderRadius: 20,
            }}
          >
            <Image
              source={{ uri: quizData.photo }}
              style={{
                width: "100%",
                height: "50%",
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
              }}
            />
            <View
              style={{
                padding: 20,
                borderBottomRightRadius: 20,
                borderBottomLeftRadius: 20,
                height: "50%",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: font.bold,
                  color: colors.secondary,
                  marginBottom: 20,
                }}
              >
                Indovinello
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: font.medium,
                  color: "white",
                  marginBottom: 10,
                }}
              >
                {quizData.message}
              </Text>
              <View
                style={{
                  position: "absolute",
                  bottom: 10,
                  left: 20,
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: font.medium,
                    color: "white",
                    marginBottom: 10,
                  }}
                >
                  {quizData.number}/??
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              height: 80,
              marginTop: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                height: "100%",
                paddingHorizontal: 15,
                backgroundColor: colors.primary,
                borderRadius: 30,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => {
                navigation.navigate("Hint", {
                  eventID: eventID,
                  userTeam: userTeam,
                });
              }}
            >
              <Text
                style={{
                  fontSize: 25,
                  fontFamily: font.bold,
                  color: colors.secondary,
                }}
              >
                Indizi
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: "100%",
                paddingHorizontal: 15,
                backgroundColor: colors.primary,
                borderRadius: 30,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() =>
                scoreboardPublic
                  ? navigation.navigate("userScoreboard", { eventID: eventID })
                  : Alert.alert(
                      "Classifica non disponibile",
                      "In questa fase della gara non è possibile vedere la classifica"
                    )
              }
            >
              <Icon name="leaderboard" size={55} color={colors.secondary} />
              {/* <Text
                style={{
                  fontSize: 25,
                  fontFamily: font.bold,
                  color: colors.secondary,
                }}
              >
                Classifica
              </Text> */}
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                height: "100%",
                paddingHorizontal: 15,
                backgroundColor: colors.primary,
                borderRadius: 30,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() =>
                navigation.navigate("BonusMalus", {
                  eventID: eventID,
                  userTeam: userTeam,
                })
              }
            >
              <Text
                style={{
                  fontSize: 25,
                  fontFamily: font.bold,
                  color: colors.secondary,
                  textAlign: "center",
                }}
              >
                {"Bonus\nMalus"}
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={{
                height: "100%",
                width: 150,
                backgroundColor: colors.primary,
                borderRadius: 30,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() =>
                scoreboardPublic
                  ? navigation.navigate("userScoreboard")
                  : Alert.alert(
                    "Classifica non disponibile",
                    "In questa fase della gara non è possibile vedere la classifica"
                  )
              }
            >
              <Text
                style={{
                  fontSize: 25,
                  fontFamily: font.bold,
                  color: colors.secondary,
                }}
              >
                Classifica
              </Text>
            </TouchableOpacity> */}
          </View>
          <View style={{ width: "100%", height: 200 }}></View>
        </ScrollView>
        <Footer eventID={eventID} />
      </>
    );
  } else if (quizData.type == "message") {
    return (
      <>
        <Header screen={"OnGame"} />
        <ScrollView
          style={{ padding: 20, flex: 1, backgroundColor: colors.bg }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        >
          <View
            style={{
              width: "100%",
              height: 450,
              backgroundColor: colors.primary,
              borderRadius: 20,
            }}
          >
            <View
              style={{
                padding: 20,
                borderBottomRightRadius: 20,
                borderBottomLeftRadius: 20,
                height: "50%",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: font.bold,
                  color: colors.secondary,
                  marginBottom: 20,
                }}
              >
                Indovinello
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: font.medium,
                  color: "white",
                  marginBottom: 10,
                }}
              >
                {quizData.message}
              </Text>
            </View>
            <View
              style={{
                position: "absolute",
                bottom: 10,
                width: "100%",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: font.medium,
                  color: "white",
                  marginBottom: 10,
                }}
              >
                {quizData.number}/??
              </Text>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              height: 80,
              marginTop: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                height: "100%",
                paddingHorizontal: 15,
                backgroundColor: colors.primary,
                borderRadius: 30,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => {
                navigation.navigate("Hint", {
                  eventID: eventID,
                  userTeam: userTeam,
                });
              }}
            >
              <Text
                style={{
                  fontSize: 25,
                  fontFamily: font.bold,
                  color: colors.secondary,
                }}
              >
                Indizi
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: "100%",
                paddingHorizontal: 15,
                backgroundColor: colors.primary,
                borderRadius: 30,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() =>
                scoreboardPublic
                  ? navigation.navigate("userScoreboard", { eventID: eventID })
                  : Alert.alert(
                      "Classifica non disponibile",
                      "In questa fase della gara non è possibile vedere la classifica"
                    )
              }
            >
              <Icon name="leaderboard" size={55} color={colors.secondary} />
              {/* <Text
                style={{
                  fontSize: 25,
                  fontFamily: font.bold,
                  color: colors.secondary,
                }}
              >
                Classifica
              </Text> */}
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                height: "100%",
                paddingHorizontal: 15,
                backgroundColor: colors.primary,
                borderRadius: 30,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() =>
                navigation.navigate("BonusMalus", {
                  eventID: eventID,
                  userTeam: userTeam,
                })
              }
            >
              <Text
                style={{
                  fontSize: 25,
                  fontFamily: font.bold,
                  color: colors.secondary,
                  textAlign: "center",
                }}
              >
                {"Bonus\nMalus"}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: "100%", height: 150 }}></View>
        </ScrollView>
        <Footer eventID={eventID} />
      </>
    );
  } else if (quizData.type == "photo") {
    return (
      <>
        <Header screen={"OnGame"} />
        <ScrollView
          style={{ padding: 20, flex: 1, backgroundColor: colors.bg }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        >
          <View
            style={{
              width: "100%",
              height: 450,
              backgroundColor: colors.primary,
              borderRadius: 20,
            }}
          >
            <Image
              source={{ uri: quizData.photo }}
              style={{
                width: "100%",
                height: "85%",
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
              }}
            />
            <View
              style={{
                width: "100%",
                height: "15%",
                backgroundColor: colors.primary,
                borderRadius: 20,
                alignItems: "center",
                justifyContent: "center",
                paddingTop: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 25,
                  fontFamily: font.medium,
                  color: "white",
                  marginBottom: 10,
                }}
              >
                {quizData.number}/??
              </Text>
            </View>
          </View>

          <View
            style={{
              width: "100%",
              height: 80,
              marginTop: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                height: "100%",
                paddingHorizontal: 15,
                backgroundColor: colors.primary,
                borderRadius: 30,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => {
                navigation.navigate("Hint", {
                  eventID: eventID,
                  userTeam: userTeam,
                });
              }}
            >
              <Text
                style={{
                  fontSize: 25,
                  fontFamily: font.bold,
                  color: colors.secondary,
                }}
              >
                Indizi
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: "100%",
                paddingHorizontal: 15,
                backgroundColor: colors.primary,
                borderRadius: 30,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() =>
                scoreboardPublic
                  ? navigation.navigate("userScoreboard", { eventID: eventID })
                  : Alert.alert(
                      "Classifica non disponibile",
                      "In questa fase della gara non è possibile vedere la classifica"
                    )
              }
            >
              <Icon name="leaderboard" size={55} color={colors.secondary} />
              {/* <Text
                style={{
                  fontSize: 25,
                  fontFamily: font.bold,
                  color: colors.secondary,
                }}
              >
                Classifica
              </Text> */}
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                height: "100%",
                paddingHorizontal: 15,
                backgroundColor: colors.primary,
                borderRadius: 30,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() =>
                navigation.navigate("BonusMalus", {
                  eventID: eventID,
                  userTeam: userTeam,
                })
              }
            >
              <Text
                style={{
                  fontSize: 25,
                  fontFamily: font.bold,
                  color: colors.secondary,
                  textAlign: "center",
                }}
              >
                {"Bonus\nMalus"}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: "100%", height: 200 }}></View>
        </ScrollView>
        <Footer eventID={eventID} />
      </>
    );
  } else {
    return <Loading />;
  }
}
