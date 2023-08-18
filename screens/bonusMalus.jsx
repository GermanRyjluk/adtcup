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
import { font } from "../shared/fonts";

const pages = [{ text: "asd" }, { text: "123" }];

export default function BonusMalus({ route }) {
  const { width, height } = Dimensions.get("window");
  const scrollX = useRef(new Animated.Value(0)).current;

  const eventID = "1VgaAztg9yvbzRLuIjql";
  const team = route.params.userTeam;

  const [render, setRender] = useState([]);

  const [refreshing, setRefreshing] = useState(false);

  const getData = useCallback(async () => {
    setRefreshing(true);
    try {
      await getDocs(collection(db, "events", eventID, "teams", team, "b-m")).then((snapshot) => {
        snapshot.forEach((doc) => render.push(doc.data()));
      })
    } catch (e) {
      console.error("Error fetching team data", e);
    }
    setRefreshing(false);
  }, []);

  useEffect(() => {
    getData();
  }, []);

  // console.log(render.length == 0, render)
  if (render.length == 0) {
    return (
      <>
        <Header />
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.bg,
            padding: 50
          }}
        >
          <View style={{ width: '80%', backgroundColor: colors.primary, borderRadius: 15, padding: 20 }}>
            <Text style={{ fontFamily: font.bold, fontSize: 20, textAlign: 'center', color: colors.secondary, marginBottom: 20 }}>Non ci sono ancora bonus/malus da mostrare</Text>
            <Text style={{ fontFamily: font.medium, fontSize: 20, textAlign: 'center', color: colors.secondary }}>Li troverai esplorando il mondo ADT</Text>
          </View>
        </View>
      </>
    )
  } else {
    return (
      <>
        <Header />
        <View style={styles.root}>
          <>
            <ScrollView
              style={{ backgroundColor: colors.bg }}
            >
              {render.map((bm, i) => {
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
                        backgroundColor: colors.primary,
                        borderRadius: 20,
                        alignItems: "center",
                        borderWidth: 5,
                        borderColor: bm.type == "bonus" ? 'lime' : 'red',
                      }}
                    >
                      <View style={{ width: "100%", padding: 20 }}>
                        <Text
                          style={[
                            styles.text,
                            { color: colors.secondary, marginBottom: 20 },
                          ]}
                        >
                          {bm.type == "bonus" ? "Bonus" : "Malus"}
                        </Text>
                        <Text style={[styles.text, { fontSize: 20 }]}>
                          {bm.message}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </>
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
    fontFamily: font.bold
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
