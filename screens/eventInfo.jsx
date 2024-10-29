import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Button,
  TouchableOpacity,
  Animated,
  Alert,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { colors } from "../shared/colors";

import { PageIndicator } from "react-native-page-indicator";
import { Header } from "../components/header";
import { font } from "../shared/fonts";
import { sendEmailVerification } from "firebase/auth";

import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";

import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebase";
import Loading from "../components/loading";
import { checkEmailVerified } from "../store/authSlice";

export default function EventInfo({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState([]);

  let auth = useSelector((state) => state.auth);
  let eventID = route.params?.eventID;
  let screen = route.params?.screen;

  const dispatch = useDispatch();

  const getInfo = useCallback(async () => {
    setLoading(true);
    try {
      await getDocs(
        query(
          collection(db, "events", eventID, "info"),
          orderBy("number", "asc")
        )
      ).then((snapshot) => {
        setPages(snapshot.docs.map((doc) => doc));
      });
    } catch (e) {
      console.error("Error fetchin event info: " + e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getInfo();
    if (!auth.currentUser.emailVerified) {
      try {
        dispatch(checkEmailVerified());
      } catch (e) {
        console.error(e);
      } finally {
        // console.log("EmailVerified: ", auth.currentUser.emailVerified);
      }
    }
  }, []);

  const handleButton = () => {
    if (screen == "outside") {
      navigation.goBack();
    } else {
      try {
        dispatch(checkEmailVerified());
      } catch (e) {
        console.error(e);
      } finally {
        if (screen == "inside") {
          navigation.goBack();
        } else if (auth.auth) {
          if (auth.currentUser.emailVerified) {
            navigation.navigate("EventBooking", {
              eventID: route.params.eventID,
            });
          } else {
            // Alert.alert(
            //   "Verifica la tua mail",
            //   "Per continuare, ti preghiamo di verificare la tua mail"
            // );
            Alert.alert(
              "Verifica la tua mail",
              "Per continuare, ti preghiamo di verificare la tua mail",
              [
                {
                  text: "Ricevi email",
                  onPress: () => {
                    sendEmailVerification(auth.currentUser);
                    Alert.alert(
                      "Email inviata",
                      "Controlla la tua casella e riprova"
                    );
                  },
                },
                {
                  text: "Già fatto",
                  onPress: () => {
                    dispatch(checkEmailVerified());
                    handleButton();

                    // if (auth.currentUser.emailVerified) {
                    //   navigation.navigate("EventBooking", {
                    //     eventID: route.params.eventID,
                    //   });
                    // }

                    // auth.currentUser.reload();
                  },
                },
                {
                  text: "Esci",
                  onPress: () => null,
                  style: "cancel",
                },
              ],
              {
                cancelable: true,
              },
              [],
              {
                cancelable: true,
              }
            );
          }
        } else {
          navigation.navigate("Login");
        }
      }
    }
  };

  const { width, height } = Dimensions.get("window");
  const scrollX = useRef(new Animated.Value(0)).current;

  if (loading) {
    return (
      <>
        <Header />
        <Loading color={colors.bg} />
      </>
    );
  } else {
    return (
      <>
        <Header />
        <View style={styles.root}>
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
            {pages.map((doc) => {
              if (doc.data().lastPage) {
                return (
                  <View
                    key={doc.id}
                    style={{
                      width,
                      alignItems: "center",
                      padding: 20,
                    }}
                  >
                    <ScrollView
                      style={{
                        width: "100%",
                        height: "90%",
                        backgroundColor: colors.primary,
                        borderRadius: 20,
                        padding: 30,
                        marginBottom: 25,
                      }}
                      contentContainerStyle={{ alignItems: "center" }}
                    >
                      <Text
                        style={[
                          styles.text,
                          {
                            color: colors.secondary,
                            textAlign: "center",
                            marginBottom: 5,
                          },
                        ]}
                      >
                        {doc.data().mainTitle}
                      </Text>
                      <Text
                        style={[
                          styles.text,
                          {
                            color: colors.bg,
                            marginBottom: 30,
                            fontSize: 18,
                            textAlign: "center",
                          },
                        ]}
                      >
                        {`-\n${doc.data().mainDescription}\n-`}
                      </Text>
                      {doc.data().subtitles.map((sub, i) => {
                        return (
                          <View key={i} style={{ alignItems: "center" }}>
                            <Text
                              style={{
                                fontFamily: font.bold,
                                fontSize: 25,
                                color: colors.secondary,
                                marginBottom: 10,
                              }}
                            >
                              {sub.title}
                            </Text>
                            <Text
                              style={{
                                fontFamily: font.medium,
                                fontSize: 20,
                                color: colors.bg,
                                marginBottom: 10,
                                textAlign: "center",
                              }}
                            >
                              {sub.description}
                            </Text>
                            <Text
                              style={[
                                styles.text,
                                {
                                  fontSize: 20,
                                  fontFamily: font.medium,
                                  marginBottom: 50,
                                },
                              ]}
                            >
                              {sub.body}
                            </Text>
                          </View>
                        );
                      })}
                    </ScrollView>
                    <TouchableOpacity
                      title="Gioca"
                      onPress={() => {
                        handleButton();
                      }}
                      style={{
                        width: "100%",
                        paddingVertical: 15,
                        backgroundColor: colors.primary,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 40,
                        marginBottom: 50,
                      }}
                    >
                      <Text
                        style={{
                          color: colors.secondary,
                          fontSize: 35,
                          fontFamily: font.bold,
                        }}
                      >
                        Gioca
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              } else {
                return (
                  <View
                    key={doc.id}
                    style={{
                      width,
                      alignItems: "center",
                      padding: 20,
                      marginBottom: 20,
                    }}
                  >
                    <ScrollView
                      style={{
                        width: "100%",
                        height: "90%",
                        backgroundColor: colors.primary,
                        borderRadius: 20,
                        padding: 30,
                        marginBottom: 25,
                      }}
                      contentContainerStyle={{ alignItems: "center" }}
                    >
                      <Text
                        style={[
                          styles.text,
                          { color: colors.secondary, textAlign: "center" },
                        ]}
                      >
                        {doc.data().mainTitle}
                      </Text>
                      <Text
                        style={[
                          styles.text,
                          {
                            color: colors.bg,
                            marginBottom: 20,
                            fontSize: 18,
                            textAlign: "center",
                          },
                        ]}
                      >
                        {`-\n${doc.data().mainDescription}\n-`}
                      </Text>
                      {doc.data().subtitles.map((sub, j) => {
                        return (
                          <View key={doc.id}>
                            <Text
                              style={{
                                fontFamily: font.bold,
                                fontSize: 30,
                                marginTop: 5,
                                color: colors.secondary,
                                marginBottom: 5,
                                textAlign: "center",
                              }}
                            >
                              {sub.title}
                            </Text>
                            <Text
                              style={{
                                fontFamily: font.medium,
                                fontSize: 20,
                                color: colors.bg,
                                marginBottom: 10,
                                textAlign: "center",
                              }}
                            >
                              {sub.description}
                            </Text>
                            <Text
                              style={[
                                styles.text,
                                {
                                  fontSize: 20,
                                  fontFamily: font.medium,
                                  marginBottom: 50,
                                },
                              ]}
                            >
                              {sub.body}
                            </Text>
                          </View>
                        );
                      })}
                    </ScrollView>
                  </View>
                );
              }
            })}
          </Animated.ScrollView>
          <PageIndicator
            style={styles.pageIndicator}
            count={pages.length}
            animatedCurrent={Animated.divide(scrollX, width)}
          />
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
    fontSize: 35,
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
    bottom: 20,
    position: "absolute",
  },
});
