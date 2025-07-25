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
import { colors } from "@//shared/colors";
import { db } from "@//firebase/firebase";
import { PageIndicator } from "react-native-page-indicator";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { differenceInMinutes } from "date-fns";
import Loading from "@//components/loading";
import { Header } from "@//components/header";
import { font } from "@//shared/fonts";

const pages = [{ text: "asd" }, { text: "123" }];

export default function Hints({ navigation, route }) {
  const { width, height } = Dimensions.get("window");
  const scrollX = useRef(new Animated.Value(0)).current;

  const eventID = route.params?.eventID;
  const team = route.params.userTeam;
  const currentTime = new Date();

  const [teamData, setTeamData] = useState();
  const [quizID, setQuizID] = useState();
  const [timeToNext, setTimeToNext] = useState(null);
  const [maxHints, setMaxHints] = useState(null);

  const [hints, setHints] = useState([]);
  const [hintsToShow, setHintsToShow] = useState([]);
  const [render, setRender] = useState([]);

  const [loading, setLoading] = useState(false);

  const getHints = useCallback(async (quiz, maxHints) => {
    try {
      await getDocs(
        collection(db, "events", eventID, "quiz", quiz, "hints")
      ).then((snapshot) => {
        snapshot.forEach((doc) => hints.push(doc.data()));
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
      });
    } catch (e) {
      console.error("Error when fetchin hint", e);
    }
  }, []);

  const getTeamData = useCallback(async () => {
    setLoading(true);
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
            setMaxHints(
              Math.floor(
                differenceInMinutes(
                  currentTime,
                  new Date(snapshot.data()["timeOfScan"].toDate())
                ) / 5
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
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getTeamData();
  }, []);

  console.log(maxHints, render);

  if (loading) {
    return (
      <>
        <Header />
        <Loading />
      </>
    );
  } else {
    return (
      <>
        <Header />
        <View style={styles.root}>
          {maxHints == 0 ? (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: colors.bg,
                padding: 50,
              }}
            >
              <View
                style={{
                  width: "80%",
                  backgroundColor: colors.primary,
                  borderRadius: 15,
                  padding: 20,
                }}
              >
                <Text
                  style={{
                    fontFamily: font.bold,
                    fontSize: 20,
                    textAlign: "center",
                    color: colors.secondary,
                    marginBottom: 20,
                  }}
                >
                  Non ci sono ancora indizi da mostrare
                </Text>
                <Text
                  style={{
                    fontFamily: font.medium,
                    fontSize: 20,
                    textAlign: "center",
                    color: colors.secondary,
                  }}
                >
                  Torna tra poco, ogni 5 minuti otterrai un nuovo indizio
                </Text>
              </View>
            </View>
          ) : (
            <>
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
                              overflow: "hidden",
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
                              <ScrollView>
                                <Text style={[styles.text, { fontSize: 20 }]}>
                                  {hint.message}
                                </Text>
                              </ScrollView>
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
              <PageIndicator
                style={styles.pageIndicator}
                count={render.length}
                animatedCurrent={Animated.divide(scrollX, width)}
              />
            </>
          )}
        </View>
      </>
    );
  }
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
    fontFamily: font.bold,
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
