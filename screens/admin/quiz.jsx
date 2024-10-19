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

export default function Quiz({ navigation }) {
  const eventID = useSelector((state) => state.eventID.value);

  const [quiz, setQuiz] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [bonmal, setBonmal] = useState(false);

  const getQuiz = useCallback(async () => {
    setRefreshing(true);
    try {
      const snapshot = getDocs(
        query(
          collection(db, "events", eventID, "quiz"),
          orderBy("number", "asc")
        )
      ).then((snapshot) => {
        setQuiz(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      });
    } catch (e) {
      console.error(e);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    getQuiz();
  }, []);

  const render = (quiz, i) => {
    return (
      <TouchableOpacity
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
        onPress={() => navigation.navigate("QuizInfo", { quiz })}
      >
        <View>
          <Text style={{ fontSize: 20, fontFamily: font.bold }}>
            {quiz.number} - {quiz.message}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Header />
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 10,
          right: 30,
          zIndex: 10,
          backgroundColor: colors.secondary,
          borderRadius: 50,
          padding: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => {}}
      >
        <Ionicons name="add" size={50} color={colors.primary} />
      </TouchableOpacity>
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
          <RefreshControl refreshing={refreshing} onRefresh={getQuiz} />
        }
      >
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 15,
          }}
        >
          <CheckBox
            style={{ width: 30, height: 30, borderRadius: 5, marginRight: 15 }}
            value={bonmal}
            onValueChange={(state) => setBonmal(state)}
            color={"#2ADF7D"}
          />
          <Text style={{ fontSize: 15, color: "white", fontWeight: "bold" }}>
            Visualizza solo Bonus/Malus
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <TextInput
            style={[styles.input]}
            onChangeText={(search) => setSearch(search)}
            placeholder="Cerca per nome.."
            placeholderTextColor="rgba(200, 200, 200,0.9)"
          />
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              // marginVertical: 15,
              justifyContent: "space-around",
            }}
          ></View>
        </View>
        {quiz.map((quiz, i) => {
          if (search == "" && bonmal) {
            if (quiz.type == "malus" || quiz.type == "bonus") {
              return render(quiz, i);
            } else return null;
          } else if (search == "" && !bonmal) {
            return render(quiz, i);
          } else if (
            quiz.message.toLowerCase().includes(search.toLowerCase()) &&
            bonmal
          ) {
            if (quiz.type == "malus" || quiz.type == "bonus") {
              return render(quiz, i);
            } else return null;
          } else if (
            quiz.message.toLowerCase().includes(search.toLowerCase()) &&
            !bonmal
          ) {
            return render(quiz, i);
          } else return null;
        })}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginBottom: 0,
    paddingHorizontal: 15,
    borderRadius: 10,
    color: "white",
    letterSpacing: 1,
  },
});
