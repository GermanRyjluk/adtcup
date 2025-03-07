import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  TextInput,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { colors } from "../../shared/colors";
import { font } from "../../shared/fonts";
import { Header } from "../../components/header";

import Icon from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import CheckBox from "expo-checkbox";

import Ionicons from "react-native-vector-icons/Ionicons";

// const eventID = "1VgaAztg9yvbzRLuIjql";

export default function QuizInfo({ navigation, route }) {
  const eventID = useSelector((state) => state.eventID.value);

  const [quiz, setQuiz] = useState(route.params.quiz);
  const [teamsOrder, setTeamsOrder] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const getTeamsOrder = useCallback(async () => {
    setRefreshing(true);
    try {
      const snapshot = getDocs(
        query(
          collection(db, "events", eventID, "quiz", quiz.id, "scanned"),
          orderBy("timeOfScan", "asc")
        )
      ).then((snapshot) => {
        setTeamsOrder(snapshot.docs.map((doc) => doc.data()));
        snapshot.docs.map((doc) => console.log(doc.data()));
      });
    } catch (e) {
      console.error(e);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    getTeamsOrder();
  }, []);

  const render = (team, i) => {
    return (
      <View
        style={{
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          backgroundColor: colors.bg,
          marginBottom: 10,
          paddingHorizontal: 20,
          paddingVertical: 20,
          paddingRight: 50,
          borderRadius: 10,
        }}
        key={i}
      >
        <View>
          <Text style={{ fontSize: 20, fontFamily: font.bold }}>
            {i + 1} - {team.name}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <>
      <Header />
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: colors.primary,
          padding: 10,
        }}
        contentContainerStyle={{
          alignItems: "center",
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getTeamsOrder} />
        }
      >
        <TouchableOpacity
          style={{
            width: "100%",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 10,
          }}
          onPress={() => {
            navigation.navigate("QuizEdit", { quiz });
          }}
        >
          <View style={[styles.button]}>
            <Ionicons name="pencil" size={30} color={colors.primary} />
            <Text
              style={{
                fontSize: 25,
                color: colors.primary,
                fontWeight: "bold",
                marginLeft: 10,
              }}
            >
              Modifica
            </Text>
          </View>
        </TouchableOpacity>
        {teamsOrder.map((team, i) => {
          return render(team, i);
        })}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 70,
    backgroundColor: colors.secondary,
    marginBottom: 0,
    paddingHorizontal: 15,
    borderRadius: 10,
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
