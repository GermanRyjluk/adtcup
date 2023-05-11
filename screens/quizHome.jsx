import { StyleSheet, Text, View, Image, BackHandler } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { useStateRef } from "react-usestateref";
import { Header } from "../components/header";
import { colors } from "../shared/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { QrButton } from "../components/qrButton";
import { db, auth } from "../firebase/firebase";

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

export default function QuizHome({ navigation, route }) {
  const [data, setData, ref] = useStateRef([null]);
  const [loading, setLoading] = useState(false);

  const fetchQuiz = useCallback(async () => {
    try {
      setLoading(true);
      const docSnap = await getDoc(doc(db, "quiz", route.params.quiz)).then(
        (snapshot) => {
          if (snapshot.exists()) {
            setData(snapshot.data());
            updateDoc(doc(db, "/users", auth.currentUser.uid), {
              currentQuiz: snapshot.data()["number"],
            });
            console.log("Update: ", data);
            setLoading(false);
          } else {
            console.log("No such document!");
          }
        }
      );
    } catch (e) {
      console.error(e);
    }
  }, []);

  const findCurrentQuiz = useCallback(async () => {
    try {
      const docSnap = await getDoc(doc(db, "/users", auth.currentUser.uid));
      if (docSnap.exists()) {
        const find = await getDocs(
          query(
            collection(db, "/quiz"),
            where("number", "==", docSnap.data().currentQuiz)
          )
        );
        if (find) {
          find.forEach((doc) => setData(doc.data()));
        }
      } else {
        console.log("No user currentQuiz!");
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (route.params?.quiz) {
      console.log("Searching next quiz...");
      fetchQuiz();
    } else {
      console.log("Searching current quiz...");
      findCurrentQuiz();
    }
  }, [route.params?.quiz, data]);

  // Handle back button behvior
  // useFocusEffect(
  //   useCallback(() => {
  //     const onBackPress = () => {
  //       navigation.push('HomeDrawer');
  //     };

  //     const subscription = BackHandler.addEventListener(
  //       'hardwareBackPress',
  //       onBackPress
  //     );

  //     return () => subscription.remove();
  //   }, [])
  // );

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  {
    if (data["type"] == "both") {
      return (
        <>
          <Header />
          <View
            style={{
              height: "100%",
              backgroundColor: colors.bg,
              padding: 30,
            }}
          >
            <Text style={{ fontSize: 30, fontWeight: "800", marginBottom: 20 }}>
              {data["number"]}/??
            </Text>
            <View>
              <Image
                source={data["photo"] ? { uri: data["photo"] } : null}
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
                  {data["message"]}
                </Text>
              </TouchableOpacity>
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
                    {data["timeToHint"]}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ position: "absolute", bottom: 150, right: 15 }}>
              <QrButton />
            </View>
          </View>
          <Footer />
        </>
      );
    } else if (data["type"] == "message") {
      return (
        <>
          <Header />
          <View
            style={{
              height: "100%",
              backgroundColor: colors.bg,
              padding: 30,
            }}
          >
            <Text style={{ fontSize: 30, fontWeight: "800", marginBottom: 20 }}>
              {data["number"]}/??
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
                  {data["message"]}
                </Text>
              </TouchableOpacity>
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
                    {data["timeToHint"]}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ position: "absolute", bottom: 100, right: 15 }}>
              <QrButton />
            </View>
          </View>
          <Footer />
        </>
      );
    } else if (data["type"] == "photo") {
      return (
        <>
          <Header />
          <View
            style={{
              height: "100%",
              backgroundColor: colors.bg,
              padding: 30,
            }}
          >
            <Text style={{ fontSize: 30, fontWeight: "800", marginBottom: 20 }}>
              {data["number"]}/??
            </Text>
            <View>
              <Image
                source={data["photo"] ? { uri: data["photo"] } : null}
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
                    {data["timeToHint"]}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ position: "absolute", bottom: 100, right: 15 }}>
              <QrButton />
            </View>
          </View>
          <Footer />
        </>
      );
    }
  }
  return (
    <>
      <Header />
      <View
        style={{
          height: "100%",
          backgroundColor: colors.bg,
          padding: 30,
        }}
      >
        <Text style={{ fontSize: 30, fontWeight: "800", marginBottom: 20 }}>
          {data["number"]}/??
        </Text>
        <View>
          <Image
            source={data["photo"] ? { uri: data["photo"] } : null}
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
              padding: 20,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: "500" }}>
              {/* Informazione sull'indovinello 1 che va avanti fino a quando non
              diventa troppo lungo... */}
              {data["message"]}
            </Text>
          </TouchableOpacity>
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
                {data["timeToHint"]}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ position: "absolute", bottom: 100, right: 15 }}>
          <QrButton />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
