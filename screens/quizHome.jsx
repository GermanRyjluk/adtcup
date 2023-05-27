import {
  StyleSheet,
  Text,
  View,
  Image,
  BackHandler,
  ScrollView,
  RefreshControl,
  Alert,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { Header } from "../components/header";
import { colors } from "../shared/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { QrButton } from "../components/qrButton";
import { db, auth } from "../firebase/firebase";

import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

import {
  useFocusEffect,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { Footer } from "../components/footer";
import Loading from "../components/loading";

import { differenceInMilliseconds } from "date-fns";

export default function QuizHome({ navigation, route }) {
  const [userTeam, setUserTeam] = useState("");
  const [quizID, setQuizID] = useState(route.params?.quizID);
  const [quizData, setQuizData] = useState([null]);

  const [refreshing, setRefreshing] = useState(false);

  const [aboveZero, setAboveZero] = useState(false);

  const [teamData, setTeamData] = useState([]); //lastQuiz, currentHint, timeOfScan, name, number

  const currentTime = new Date();

  const eventID = route.params?.eventID;

  // ---------------- FETCH FUNCTIONS ---------------- //

  const getQuiz = useCallback(async (team) => {
    try {
      await getDoc(doc(db, "events", eventID, "teams", team)).then(
        async (snapshot) => {
          if (snapshot.exists()) {
            setTeamData(snapshot.data());
            // setLastScan(new Date(snapshot.data()["timeOfScan"]));
            // setCurrentHint(snapshot.data()["currentHint"]);
            // setQuizID(snapshot.data()["lastQuiz"]);
            await getDoc(
              doc(db, "events", eventID, "quiz", snapshot.data()["lastQuiz"])
            ).then((snapshot) => {
              if (snapshot.exists()) {
                // console.log(snapshot.data());
                setQuizData(snapshot.data());
              }
            });
          }
        }
      );
    } catch (e) {
      console.error(e);
    }
    //   }
    // );
  }, []);

  const getTeamAndQuiz = useCallback(async () => {
    setRefreshing(true);
    try {
      const docRef = await getDoc(
        doc(db, "/users", auth.currentUser.uid, "/bookings", eventID)
      ).then(async (snapshot) => {
        if (snapshot.exists()) {
          // console.log("Team: ", snapshot.data());
          setUserTeam(snapshot.data()["team"]);
          getQuiz(snapshot.data()["team"]);
        }
      });
    } catch (e) {
      console.error(e);
    }
    setRefreshing(false);
  });

  const getNewQuiz = useCallback(async () => {
    setRefreshing(true);
    try {
      await getDoc(doc(db, "events", eventID, "quiz", quizID)).then(
        async (snapshot) => {
          if (snapshot.exists()) {
            setQuizData(snapshot.data());
            await updateDoc(doc(db, "events", eventID, "teams", userTeam), {
              lastQuiz: quizID,
            });
          }
        }
      );
    } catch (e) {
      console.error(e);
    }
    setRefreshing(false);
  });

  // const getLastTeamData = async () => {
  //   try {
  //     await getDoc(doc(db, "events", eventID, "teams", userTeam)).then(
  //       async (snapshot) => {
  //         if (snapshot.exists()) {
  //           setTeamData(snapshot.data());
  //           // setLastScan(new Date(snapshot.data()["timeOfScan"]));
  //           // setCurrentHint(snapshot.data()["currentHint"]);
  //           // setQuizID(snapshot.data()["lastQuiz"]);
  //         }
  //       }
  //     );
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  const getHint = async () => {
    try {
      await getDoc(
        doc(
          db,
          "events",
          eventID,
          "quiz",
          quizID,
          "hints",
          teamData["currentHint"]
        )
      ).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.data()["message"]);
        }
      });
    } catch (e) {
      console.error(e);
    }
  };

  // ---------------- FETCH FUNCTIONS ---------------- //

  useEffect(() => {
    if (quizID == undefined) {
      getTeamAndQuiz();

      // if (teamData !== undefined) {
      //   let lastScan = new Date(teamData["timeOfScan"]);
      //   console.log(differenceInMilliseconds(lastScan, currentTime) / 1000);
      //   if (
      //     300 -
      //       differenceInMilliseconds(
      //         currentTime,
      //         new Date(teamData["timeOfScan"])
      //       ) /
      //         1000 <
      //     0
      //   ) {
      //     console.log("first");
      //     setAboveZero(false);
      //     getHint();
      //   } else {
      //     setAboveZero(true);
      //   }
      // }
    } else {
      getNewQuiz();
    }
  }, [route.params.eventID, route.params.quizID]);

  // ---------------- RENDER ---------------- //

  if (!quizData) {
    return <Loading />;
  }

  {
    if (quizData["type"] == "both") {
      return (
        <>
          {/* <Header /> */}
          <ScrollView
            style={{
              backgroundColor: colors.bg,
              padding: 30,
            }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={getTeamAndQuiz}
              />
            }
          >
            <Text style={{ fontSize: 30, fontWeight: "800", marginBottom: 20 }}>
              {quizData["number"]}/??
            </Text>
            <View>
              <Image
                source={quizData["photo"] ? { uri: quizData["photo"] } : null}
                style={{
                  width: "100%",
                  height: 250,
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 20,
                  borderRadius: 10,
                  marginBottom: 20,
                }}
              />
              <TouchableOpacity
                style={{
                  backgroundColor: "#d9d9d9",
                  height: 100,
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 15,
                  borderRadius: 10,
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: "500" }}>
                  {quizData["message"]}
                </Text>
              </TouchableOpacity>
              {teamData["lastScan"] && aboveZero ? (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 20,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 30,
                      fontWeight: "800",
                      marginBottom: 20,
                    }}
                  >
                    Nuovo indizio tra:{" "}
                  </Text>
                  <CountdownCircleTimer
                    isPlaying
                    duration={
                      300 -
                      differenceInMilliseconds(
                        currentTime,
                        teamData["lastScan"]
                      ) /
                        1000
                    }
                    colors={[
                      colors.primary,
                      "#004777",
                      "#F7B801",
                      "#A30000",
                      "#A30000",
                    ]}
                    colorsTime={[10, 7, 5, 2, 0]}
                    onComplete={() => {}}
                  >
                    {({ remainingTime }) => (
                      <Text
                        style={{
                          fontSize: 50,
                          fontWeight: "800",
                        }}
                      >
                        {remainingTime}
                      </Text>
                    )}
                  </CountdownCircleTimer>
                </View>
              ) : null}
            </View>
            <View style={{ width: "100%", height: 150 }}></View>
          </ScrollView>
          <View style={{ position: "absolute", bottom: 100, right: 15 }}>
            <QrButton />
          </View>
          <Footer />
        </>
      );
    } else if (quizData["type"] == "message") {
      return (
        <>
          {/* <Header /> */}
          <ScrollView
            style={{
              height: "100%",
              backgroundColor: colors.bg,
              padding: 30,
            }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={getTeamAndQuiz}
              />
            }
          >
            <Text style={{ fontSize: 30, fontWeight: "800", marginBottom: 20 }}>
              {quizData["number"]}/??
            </Text>
            <View>
              <TouchableOpacity
                style={{
                  backgroundColor: "#d9d9d9",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 15,
                  borderRadius: 10,
                }}
              >
                <Text style={{ fontSize: 25, fontWeight: "500" }}>
                  {quizData["message"]}
                </Text>
              </TouchableOpacity>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <CountdownCircleTimer
                  isPlaying
                  duration={300}
                  colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                  colorsTime={[7, 5, 2, 0]}
                >
                  {({ remainingTime }) => <Text>{remainingTime}</Text>}
                </CountdownCircleTimer>
              </View>
            </View>
            <View style={{ width: "100%", height: 150 }}></View>
          </ScrollView>
          <View style={{ position: "absolute", bottom: 100, right: 15 }}>
            <QrButton />
          </View>
          <Footer />
        </>
      );
    } else if (quizData["type"] == "photo") {
      return (
        <>
          {/* <Header /> */}
          <ScrollView
            style={{
              height: "100%",
              backgroundColor: colors.bg,
              padding: 30,
            }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={getTeamAndQuiz}
              />
            }
          >
            <Text style={{ fontSize: 30, fontWeight: "800", marginBottom: 20 }}>
              {quizData["number"]}/??
            </Text>
            <View>
              <Image
                source={quizData["photo"] ? { uri: quizData["photo"] } : null}
                style={{
                  width: "100%",
                  height: 250,
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 20,
                  borderRadius: 10,
                  marginBottom: 20,
                }}
              />
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <CountdownCircleTimer
                  isPlaying
                  duration={300}
                  colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                  colorsTime={[7, 5, 2, 0]}
                >
                  {({ remainingTime }) => <Text>{remainingTime}</Text>}
                </CountdownCircleTimer>
              </View>
            </View>
            <View style={{ width: "100%", height: 150 }}></View>
          </ScrollView>
          <View style={{ position: "absolute", bottom: 100, right: 15 }}>
            <QrButton />
          </View>
          <Footer />
        </>
      );
    }
  }
}

const styles = StyleSheet.create({});

{
  /* <View
                 style={{
                   justifyContent: "center",
                   alignItems: "center",
                   borderWidth: 4,
                   borderRadius: 10,
                   backgroundColor: "lime",
                   marginTop: 30,
                   width: "60%",
                 }}
               >
                 <Text
                   style={{
                     fontSize: 60,
                     fontWeight: "800",
                   }}
                 >
                   10:00
                 </Text>
               </View> */
}
