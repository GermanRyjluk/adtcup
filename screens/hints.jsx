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
