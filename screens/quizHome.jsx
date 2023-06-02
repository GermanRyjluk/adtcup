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
  increment,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

import { Footer } from "../components/footer";
import Loading from "../components/loading";

import { differenceInMilliseconds } from "date-fns";
import { differenceInMinutes } from "date-fns";

export default function QuizHome({ navigation, route }) {
  const [userTeam, setUserTeam] = useState("");
  const [quizData, setQuizData] = useState([null]);

  const [refreshing, setRefreshing] = useState(false);

  const [aboveZero, setAboveZero] = useState(true);

  const [teamData, setTeamData] = useState([]); //lastQuiz, currentHint, timeOfScan, name, number

  const [scoreboardPublic, setScoreboardPublic] = useState(false);

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

  //Get new quiz and update database
  const getNewQuiz = useCallback(async (quiz, team) => {
    setRefreshing(true);
    try {
      await getDoc(doc(db, "events", eventID, "quiz", quiz)).then(
        async (snapshot) => {
          if (snapshot.exists()) {
            setQuizData(snapshot.data());
            await updateDoc(doc(db, "events", eventID, "teams", team), {
              lastQuiz: quizID,
              timeOfScan: currentTime,
            });
            await setDoc(
              doc(db, "events", eventID, "teams", team, "quiz", quiz),
              {
                scanned: true,
                time: currentTime,
              }
            );
          }
        }
      );
    } catch (e) {
      console.error("Error getting new quiz: ", e);
    }
    setRefreshing(false);
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
    setRefreshing(true);
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
    setRefreshing(false);
  };

  //On refresh
  const handleRefresh = () => {
    checkScoreboard();
    if (quizID === undefined) {
      console.log("Last Quiz");
      getTeamAndData();
    } else {
      console.log("New Quiz: ", quizID);
      getNewQuiz(quizID, userTeam);
    }
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

  if (quizData.type == "both") {
    return (
      <>
        <ScrollView
          style={{ padding: 20, flex: 1, backgroundColor: colors.bg }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        >
          <View
            style={{
              width: "100%",
              height: 500,
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
                  fontWeight: "800",
                  color: colors.secondary,
                  marginBottom: 20,
                }}
              >
                Indovinello
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "800",
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
                    fontWeight: "800",
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
                  width: 150,
                  backgroundColor: colors.primary,
                  borderRadius: 30,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() =>
                  navigation.navigate("Hint", {
                    eventID: eventID,
                    userTeam: userTeam,
                  })
                }
              >
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: "800",
                    color: colors.secondary,
                  }}
                >
                  Indizi
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
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
                    fontWeight: "800",
                    color: colors.secondary,
                  }}
                >
                  Classifica
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ width: "100%", height: 150 }}></View>
        </ScrollView>
        <Footer />
      </>
    );
  } else if (quizData.type == "message") {
    return (
      <>
        <ScrollView
          style={{ padding: 20, flex: 1, backgroundColor: colors.bg }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        >
          <View
            style={{
              width: "100%",
              height: 500,
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
                  fontWeight: "800",
                  color: colors.secondary,
                  marginBottom: 20,
                }}
              >
                Indovinello
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "800",
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
                  fontWeight: "800",
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
                width: 150,
                backgroundColor: colors.primary,
                borderRadius: 30,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() =>
                navigation.navigate("Hint", {
                  eventID: eventID,
                  userTeam: userTeam,
                })
              }
            >
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "800",
                  color: colors.secondary,
                }}
              >
                Indizi
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
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
                  fontWeight: "800",
                  color: colors.secondary,
                }}
              >
                Classifica
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: "100%", height: 150 }}></View>
        </ScrollView>
        <Footer />
      </>
    );
  } else if (quizData.type == "photo") {
    return (
      <>
        <ScrollView
          style={{ padding: 20, flex: 1, backgroundColor: colors.bg }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        >
          <View
            style={{
              width: "100%",
              height: 500,
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
                  fontWeight: "800",
                  color: "white",
                  marginBottom: 10,
                }}
              >
                {quizData.number}/??
              </Text>
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
                  width: 150,
                  backgroundColor: colors.primary,
                  borderRadius: 30,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() =>
                  navigation.navigate("Hint", {
                    eventID: eventID,
                    userTeam: userTeam,
                  })
                }
              >
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: "800",
                    color: colors.secondary,
                  }}
                >
                  Indizi
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
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
                    fontWeight: "800",
                    color: colors.secondary,
                  }}
                >
                  Classifica
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ width: "100%", height: 150 }}></View>
        </ScrollView>
        <Footer />
      </>
    );
  }

  // return (
  //   <>
  //     <ScrollView
  //       style={{
  //         backgroundColor: colors.bg,
  //         padding: 20,
  //         paddingTop: 20,
  //       }}
  //       refreshControl={
  //         <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
  //       }
  //     >
  //       <Text style={{ fontSize: 25, fontWeight: "800", marginBottom: 20 }}>
  //         {quizData["number"]}/??
  //       </Text>
  //       <View>
  //         {quizData["type"] == "both" || quizData["type"] == "photo" ? (
  //           <Image
  //             source={quizData["photo"] ? { uri: quizData["photo"] } : null}
  //             style={{
  //               width: "100%",
  //               height: 250,
  //               alignItems: "center",
  //               justifyContent: "center",
  //               padding: 20,
  //               borderRadius: 10,
  //               marginBottom: 20,
  //             }}
  //           />
  //         ) : null}
  //         {quizData["type"] == "both" || quizData["type"] == "message" ? (
  //           <TouchableOpacity
  //             style={{
  //               backgroundColor: "#d9d9d9",
  //               height: 100,
  //               width: "100%",
  //               alignItems: "center",
  //               justifyContent: "center",
  //               padding: 15,
  //               borderRadius: 10,
  //               borderWidth: 5,
  //               borderColor: colors.primary,
  //             }}
  //           >
  //             <Text style={{ fontSize: 20, fontWeight: "500" }}>
  //               {quizData["message"]}
  //             </Text>
  //           </TouchableOpacity>
  //         ) : null}
  //         <TouchableOpacity
  //           style={{
  //             backgroundColor: colors.primary,
  //             height: 100,
  //             width: "100%",
  //             alignItems: "center",
  //             justifyContent: "center",
  //             padding: 15,
  //             borderRadius: 10,
  //             marginTop: 20,
  //           }}
  //           onPress={() =>
  //             navigation.navigate("Hint", {
  //               eventID: eventID,
  //               userTeam: userTeam,
  //             })
  //           }
  //         >
  //           <Text
  //             style={{
  //               fontSize: 30,
  //               fontWeight: "800",
  //               color: colors.secondary,
  //             }}
  //           >
  //             INDIZI
  //           </Text>
  //         </TouchableOpacity>
  //         {scoreboardPublic ? (
  //           <TouchableOpacity
  //             style={{
  //               backgroundColor: "#D6D6D6",
  //               height: 100,
  //               width: "100%",
  //               alignItems: "center",
  //               justifyContent: "center",
  //               padding: 15,
  //               borderRadius: 10,
  //               marginTop: 20,
  //               borderWidth: 5,
  //               borderColor: colors.primary,
  //             }}
  //             onPress={() =>
  //               scoreboardPublic
  //                 ? navigation.navigate("userScoreboard")
  //                 : Alert.alert(
  //                     "Classifica non disponibile",
  //                     "In questa fase della gara non è possibile vedere la classifica"
  //                   )
  //             }
  //           >
  //             <Text
  //               style={{
  //                 fontSize: 30,
  //                 fontWeight: "800",
  //                 color: colors.primary,
  //               }}
  //             >
  //               CLASSIFICA
  //             </Text>
  //           </TouchableOpacity>
  //         ) : null}
  //       </View>
  //       <View style={{ width: "100%", height: 150 }}></View>
  //     </ScrollView>
  //     {/* <View style={{ position: "absolute", bottom: 100, right: 15 }}>
  //       <QrButton />
  //     </View> */}
  //     <Footer />
  //   </>
  // );
}

const styles = StyleSheet.create({});

{
  /* {teamData && aboveZero ? (
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
          Nuovo indizio tra:
        </Text>
        <CountdownCircleTimer
          isPlaying
          duration={
            300 -
            differenceInMilliseconds(
              currentTime,
              new Date(teamData["timeOfScan"])
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
          colorsTime={[200, 100, 25, 10, 5]}
          onComplete={() => {
            handleCompletedCountdown(
              teamData["lastQuiz"],
              teamData["currentHint"]
            );
          }}
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
    ) : null} */
}
