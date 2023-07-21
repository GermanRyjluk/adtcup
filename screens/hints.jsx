import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Button,
  TouchableOpacity,
  Animated,
  Image,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { colors } from "../shared/colors";
import { auth, db } from "../firebase/firebase";
import { PageIndicator } from "react-native-page-indicator";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { differenceInMinutes } from "date-fns";
import Loading from "../components/loading";
import { Header } from "../components/header";

const pages = [{ text: "asd" }, { text: "123" }];

export default function EventInfo({ navigation, route }) {
  const { width, height } = Dimensions.get("window");
  const scrollX = useRef(new Animated.Value(0)).current;

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
    // console.log("Max Hints:", maxHints);
    try {
      await getDocs(
        collection(db, "events", eventID, "quiz", quiz, "hints")
      ).then((snapshot) => {
        snapshot.forEach((doc) => hints.push(doc.data()));
        // console.log(hints);
        if (maxHints > hints.length) {
          for (let i = 0; i < hints.length; i++) {
            hintsToShow[i] = hints[i];
          }
        } else {
          for (let i = 0; i < maxHints; i++) {
            hintsToShow[i] = hints[i];
          }
        }
        setRender(hintsToShow);
        // console.log("Hints to show:", hintsToShow);
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

  console.log(maxHints);

  return (
    <>
      <Header />
      <View style={styles.root}>
        {maxHints == null ? (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: colors.bg,
            }}
          >
            <Text>Non ci sono ancora indizi da mostrare, torna tra poco</Text>
          </View>
        ) : (
          <Animated.ScrollView
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              {
                useNativeDriver: true,
              }
            )}
            style={{ backgroundColor: colors.bg }}
          >
            {render.map((hint, i) => {
              if (render) {
                if (hint.type == "both") {
                  return (
                    <View
                      style={{
                        width,
                        alignItems: "center",
                        padding: 20,
                      }}
                      key={i}
                    >
                      <View
                        style={{
                          width: "100%",
                          height: "95%",
                          backgroundColor: colors.primary,
                          borderRadius: 20,
                          alignItems: "center",
                        }}
                      >
                        <Image
                          source={{ uri: hint.photo }}
                          style={{
                            height: 200,
                            width: "100%",
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                          }}
                        />
                        <View style={{ width: "100%", padding: 20 }}>
                          <Text
                            style={[
                              styles.text,
                              { color: colors.secondary, marginBottom: 20 },
                            ]}
                          >
                            Indizio {i + 1}
                          </Text>
                          <Text style={[styles.text, { fontSize: 20 }]}>
                            {hint.message}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                } else if (hint.type == "message") {
                  return (
                    <View
                      style={{
                        width,
                        alignItems: "center",
                        padding: 20,
                      }}
                      key={i}
                    >
                      <View
                        style={{
                          width: "100%",
                          height: "95%",
                          backgroundColor: colors.primary,
                          borderRadius: 20,
                          alignItems: "center",
                        }}
                      >
                        <View style={{ width: "100%", padding: 20 }}>
                          <Text
                            style={[
                              styles.text,
                              { color: colors.secondary, marginBottom: 20 },
                            ]}
                          >
                            Indizio {i + 1}
                          </Text>
                          <Text style={[styles.text, { fontSize: 20 }]}>
                            {hint.message}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                } else if (hint.type == "photo") {
                  return (
                    <View
                      style={{
                        width,
                        alignItems: "center",
                        padding: 20,
                      }}
                      key={i}
                    >
                      <View
                        style={{
                          width: "100%",
                          height: "95%",
                          backgroundColor: colors.primary,
                          borderRadius: 20,
                          alignItems: "center",
                        }}
                      >
                        <Image
                          source={{ uri: hint.photo }}
                          style={{
                            height: 200,
                            width: "100%",
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                          }}
                        />
                        <View style={{ width: "100%", padding: 20 }}>
                          <Text
                            style={[
                              styles.text,
                              { color: colors.secondary, marginBottom: 20 },
                            ]}
                          >
                            Indizio {i + 1}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                }
              } else {
                return null;
              }
            })}
          </Animated.ScrollView>
        )}
        <PageIndicator
          style={styles.pageIndicator}
          count={render.length}
          animatedCurrent={Animated.divide(scrollX, width)}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 25,
    color: "#ededed",
    fontWeight: "800",
  },
  root: {
    flex: 1,
  },
  page: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.bg,
  },
  pageIndicator: {
    left: 0,
    right: 0,
    bottom: 30,
    position: "absolute",
  },
});
