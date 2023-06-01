// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   Dimensions,
//   Button,
//   TouchableOpacity,
//   Animated,
//   Image,
// } from "react-native";
// import React, { useCallback, useEffect, useRef, useState } from "react";
// import { colors } from "../shared/colors";
// import { auth, db } from "../firebase/firebase";
// import { PageIndicator } from "react-native-page-indicator";
// import { collection, doc, getDoc, getDocs } from "firebase/firestore";
// import { differenceInMinutes } from "date-fns";

// const pages = [{ text: "asd" }, { text: "123" }];

// export default function EventInfo({ navigation, route }) {
//   const { width, height } = Dimensions.get("window");
//   const scrollX = useRef(new Animated.Value(0)).current;

//   const eventID = "1VgaAztg9yvbzRLuIjql";
//   const team = route.params.userTeam;
//   const currentTime = new Date();

//   const [teamData, setTeamData] = useState();
//   const [quizID, setQuizID] = useState();
//   const [timeToNext, setTimeToNext] = useState(null);
//   const [maxHints, setMaxHints] = useState(null);

//   const [hints, setHints] = useState([]);
//   const [hintsToShow, setHintsToShow] = useState([]);
//   const [render, setRender] = useState([]);

//   const [refreshing, setRefreshing] = useState(false);

//   // const maxHints = Math.floor(
//   //   differenceInMinutes(currentTime, new Date(route.params.time)) / 5
//   // );
//   // const timeToNext =
//   //   5 - differenceInMinutes(currentTime, new Date(route.params.time));
//   const getHints = useCallback(async (quiz, maxHints) => {
//     console.log("Max Hints:", maxHints);
//     try {
//       await getDocs(
//         collection(db, "events", eventID, "quiz", quiz, "hints")
//       ).then((snapshot) => {
//         snapshot.forEach((doc) => hints.push(doc.data()));
//         for (let i = 0; i < maxHints; i++) {
//           hintsToShow[i] = hints[i];
//         }
//         setRender(hintsToShow);
//         console.log("Hints to show:", hintsToShow);
//       });
//     } catch (e) {
//       console.error("Error when fetchin hint", e);
//     }
//   }, []);

//   const getTeamData = useCallback(async () => {
//     setRefreshing(true);
//     try {
//       await getDoc(doc(db, "events", eventID, "teams", team)).then(
//         async (snapshot) => {
//           if (snapshot.exists()) {
//             setTeamData(snapshot.data());
//             setQuizID(snapshot.data()["lastQuiz"]);
//             setTimeToNext(
//               5 -
//                 differenceInMinutes(
//                   currentTime,
//                   new Date(snapshot.data()["timeOfScan"].toDate())
//                 )
//             );
//             getHints(
//               snapshot.data()["lastQuiz"],
//               Math.floor(
//                 differenceInMinutes(
//                   currentTime,
//                   new Date(snapshot.data()["timeOfScan"].toDate())
//                 ) / 5
//               )
//             );
//           }
//         }
//       );
//     } catch (e) {
//       console.error("Error fetching team data", e);
//     }
//     setRefreshing(false);
//   }, []);

//   useEffect(() => {
//     getTeamData();
//   }, [render, maxHints]);

//   return (
//     <View style={styles.root}>
//       <Animated.ScrollView
//         horizontal={true}
//         pagingEnabled={true}
//         showsHorizontalScrollIndicator={false}
//         onScroll={Animated.event(
//           [{ nativeEvent: { contentOffset: { x: scrollX } } }],
//           {
//             useNativeDriver: true,
//           }
//         )}
//         style={{ backgroundColor: colors.bg }}
//       >
//         {render.map((hint, i) => {
//           if (render == undefined) {
//             return null;
//           } else {
//             if (hint.type == "both") {
//               return (
//                 <View
//                   style={{
//                     width,
//                     alignItems: "center",
//                     padding: 20,
//                   }}
//                   key={i}
//                 >
//                   <View
//                     style={{
//                       width: "100%",
//                       height: "95%",
//                       backgroundColor: colors.primary,
//                       borderRadius: 20,
//                       alignItems: "center",
//                     }}
//                   >
//                     <Image
//                       source={{ uri: hint.photo }}
//                       style={{
//                         height: 200,
//                         width: "100%",
//                         borderTopLeftRadius: 20,
//                         borderTopRightRadius: 20,
//                       }}
//                     />
//                     <View style={{ width: "100%", padding: 20 }}>
//                       <Text
//                         style={[
//                           styles.text,
//                           { color: colors.secondary, marginBottom: 20 },
//                         ]}
//                       >
//                         Indizio {i + 1}
//                       </Text>
//                       <Text style={[styles.text, { fontSize: 20 }]}>
//                         {hint.message}
//                       </Text>
//                     </View>
//                   </View>
//                 </View>
//               );
//             } else if (hint.type == "message") {
//             } else if (hint.type == "photo") {
//             }
//           }
//         })}
//       </Animated.ScrollView>
//       <PageIndicator
//         style={styles.pageIndicator}
//         count={render.length}
//         animatedCurrent={Animated.divide(scrollX, width)}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   text: {
//     fontSize: 25,
//     color: "#ededed",
//     fontWeight: "800",
//   },
//   root: {
//     flex: 1,
//   },
//   page: {
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: colors.bg,
//   },
//   pageIndicator: {
//     left: 0,
//     right: 0,
//     bottom: 30,
//     position: "absolute",
//   },
// });

import { View, Text, ScrollView, Image, RefreshControl } from "react-native";
import React, { useCallback, useEffect } from "react";
import { colors } from "../shared/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { differenceInMinutes } from "date-fns";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useState } from "react";

export default function Hints({ route }) {
  // const eventID = route.params.eventID;
  const eventID = "1VgaAztg9yvbzRLuIjql";
  const team = route.params.userTeam;
  const currentTime = new Date();

  const [teamData, setTeamData] = useState();
  const [quizID, setQuizID] = useState();
  const [timeToNext, setTimeToNext] = useState(null);
  const [maxHints, setMaxHints] = useState(null);

  const [hints, setHints] = useState([]);
  const [hintsToShow, setHintsToShow] = useState([]);
  const [render, setRender] = useState([]);

  const [refreshing, setRefreshing] = useState(false);

  // const maxHints = Math.floor(
  //   differenceInMinutes(currentTime, new Date(route.params.time)) / 5
  // );
  // const timeToNext =
  //   5 - differenceInMinutes(currentTime, new Date(route.params.time));
  const getHints = useCallback(async (quiz, maxHints) => {
    console.log("Max Hints:", maxHints);
    try {
      await getDocs(
        collection(db, "events", eventID, "quiz", quiz, "hints")
      ).then((snapshot) => {
        snapshot.forEach((doc) => hints.push(doc.data()));
        for (let i = 0; i < maxHints; i++) {
          hintsToShow[i] = hints[i];
        }
        setRender(hintsToShow);
        console.log("Hints to show:", hintsToShow);
      });
    } catch (e) {
      console.error("Error when fetchin hint", e);
    }
  }, []);

  const getTeamData = useCallback(async () => {
    setRefreshing(true);
    try {
      await getDoc(doc(db, "events", eventID, "teams", team)).then(
        async (snapshot) => {
          if (snapshot.exists()) {
            setTeamData(snapshot.data());
            setQuizID(snapshot.data()["lastQuiz"]);
            setTimeToNext(
              5 -
                differenceInMinutes(
                  currentTime,
                  new Date(snapshot.data()["timeOfScan"].toDate())
                )
            );
            getHints(
              snapshot.data()["lastQuiz"],
              Math.floor(
                differenceInMinutes(
                  currentTime,
                  new Date(snapshot.data()["timeOfScan"].toDate())
                ) / 5
              )
            );
          }
        }
      );
    } catch (e) {
      console.error("Error fetching team data", e);
    }
    setRefreshing(false);
  }, []);

  useEffect(() => {
    getTeamData();
  }, [render, maxHints]);

  if (hintsToShow == []) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.bg,
        }}
      >
        <Text style={{ fontWeight: "500", fontSize: 20 }}>
          Ogni 5 minuti avrai un nuovo indizio ma non ci sono ancora indizi da
          mostare, torna piu tardi...
        </Text>
        <Text style={{ fontWeight: "500", fontSize: 20 }}>
          Tempo:{timeToNext} min
        </Text>
      </View>
    );
  }

  return (
    <>
      {/* <Header /> */}
      <ScrollView
        style={{
          height: "100%",
          backgroundColor: colors.bg,
          paddingVertical: 30,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getTeamData} />
        }
      >
        {render.map((data, i) => {
          if (data != undefined) {
            return (
              <View
                key={i}
                style={{ width: "100%", height: "auto", flexDirection: "row" }}
              >
                <Text
                  style={{ fontWeight: "500", fontSize: 15, marginRight: 30 }}
                >
                  {i + 1}
                </Text>
                <View style={{ flexDirection: "column" }}>
                  {data.photo != "" ? (
                    <Image
                      source={{ uri: data.photo }}
                      style={{ width: 300, height: 200 }}
                    />
                  ) : null}
                  {data.message != "" ? (
                    <Text
                      style={{
                        fontWeight: "500",
                        fontSize: 15,
                        marginRight: 30,
                      }}
                    >
                      {data.message}
                    </Text>
                  ) : null}
                </View>
              </View>
            );
          }
        })}
      </ScrollView>
    </>
  );
}
