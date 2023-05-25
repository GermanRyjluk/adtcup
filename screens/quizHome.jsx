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

export default function QuizHome({ navigation, route }) {
  const [userTeam, setUserTeam] = useState("");
  const [quizNum, setQuizNum] = useState("");
  const [quizData, setQuizData] = useState([null]);
  const [data, setData] = useState([null]);
  const [refreshing, setRefreshing] = useState(false);

  const eventID = route.params.eventID;
  const quizID = route.params.quizID;

  const getQuiz = useCallback(async (team) => {
    await getDoc(doc(db, "events", eventID, "teams", team)).then(
      async (snapshot) => {
        if (snapshot.exists()) {
          setQuizNum(snapshot.data()["lastQuiz"]);
          await getDoc(doc(db, "events", eventID, "teams", team)).then(
            async (snapshot) => {
              if (snapshot.exists()) {
                // console.log(snapshot.data()["lastQuiz"]);
                setQuizData(snapshot.data()["lastQuiz"]);
                await getDoc(
                  doc(
                    db,
                    "events",
                    eventID,
                    "quiz",
                    snapshot.data()["lastQuiz"]
                  )
                ).then((snapshot) => {
                  if (snapshot.exists()) {
                    setQuizData(snapshot.data());
                    // console.log(snapshot.data()["message"]);
                  }
                });
              }
            }
          );
        }
      }
    );
  }, []);

  const getTeamAndQuiz = useCallback(async () => {
    setRefreshing(true);
    try {
      const docRef = await getDoc(
        doc(db, "/users", auth.currentUser.uid, "/bookings", eventID)
      ).then(async (snapshot) => {
        if (snapshot.exists()) {
          console.log("Team: ", snapshot.data()["team"]);
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
  });
  useEffect(() => {
    if (quizID == undefined) {
      getTeamAndQuiz();
    } else {
      getNewQuiz();
    }
  }, [route.params.eventID, route.params.quizID]);

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
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <CountdownCircleTimer
                  isPlaying
                  duration={10}
                  colors={[
                    colors.primary,
                    "#004777",
                    "#F7B801",
                    "#A30000",
                    "#A30000",
                  ]}
                  colorsTime={[10, 7, 5, 2, 0]}
                  onComplete={() => Alert.alert("Hint!")}
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
                {/* <View
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
                </View> */}
              </View>
            </View>
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
                  {/* Informazione sull'indovinello 1 che va avanti fino a quando non
                diventa troppo lungo... */}
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
                {/* <View
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
                </View> */}
              </View>
            </View>
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
                <View
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
                </View>
              </View>
            </View>
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
