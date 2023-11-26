import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
  Alert,
} from "react-native";

import { Header } from "../components/header";

import { colors } from "../shared/colors";

import Icon1 from "react-native-vector-icons/FontAwesome5"; //Trophy (trophy)
import { auth, db } from "../firebase/firebase";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

import { font } from "../shared/fonts";
import { useEffect, useState } from "react";
import Loading from "../components/loading";

import * as SplashScreen from 'expo-splash-screen';

const Tab = createMaterialTopTabNavigator();

// import { SafeAreaProvider } from 'react-native-safe-area-context';

const currentEvents = [
  {
    id: "1VgaAztg9yvbzRLuIjql",
    name: "PAKO PAKO EDITION",
    photo:
      "https://firebasestorage.googleapis.com/v0/b/adt-cup.appspot.com/o/events%2FWhatsApp%20Image%202023-11-25%20at%2019.24.19.jpeg?alt=media&token=43267be2-33d4-4517-ad0b-6fb42a534cd2",
    date: "08-12-2023",
    isLocked: false
  },
  {
    id: "1VgaAztg9yvbzRLuIjql",
    name: "D%$£FA/T=%§!oR(yto",
    photo:
      "https://travel.thewom.it/content/uploads/sites/4/2022/09/villa-della-regina-704x528.jpeg",
    date: "24-8-2023",
    isLocked: true
  },
  {
    id: "1VgaAztg9yvbzRLuIjql",
    name: "D%$£FA/B=%§!Lo(ytA",
    photo:
      "https://visitupbologna.com/wp-content/uploads/2017/07/Portici_Bologna_Via_De_Carbonesi.jpg",
    date: "25-8-2023",
    isLocked: true
  },
];
const pastEvents = [
  {
    name: "TORINO",
    photo: "../assets/torino(fake).jpeg",
    date: "09-05-2023",
  },
];

export default function Home({ navigation }) {

  const preloadImages = () => {
    fetch("https://www.virtuquotidiane.it/wp-content/uploads/2")
    fetch("https://visitupbologna.com/wp-content/uploads/2017/07/Portici_Bologna_Via_De_Carbonesi.jpg")
    fetch("https://travel.thewom.it/content/uploads/sites/4/2022/09/villa-della-regina-704x528.jpeg")
  }

  const [loading, setLoading] = useState(true);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    preloadImages();

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [])


  const checkBookingStatus = async (eventID, scoreboardPublic) => {
    try {
      const snapshot = await getDoc(
        doc(db, "/events", eventID, "/bookings", auth.currentUser.uid)
      ).catch((e) => console.error(e));

      if (snapshot.exists()) {
        if (snapshot.data().status == "pending" || snapshot.data().status == "pay" || snapshot.data().status == "waiting team") {
          navigation.navigate("EventStatus", { status: snapshot.data().status });
        } else if (snapshot.data().status == "pay") {
          navigation.navigate("EventStatus", { status: "pay" });
        } else if (snapshot.data().status == "can play") {
          navigation.navigate("Ticket", {
            eventID: eventID,
          });
        } else if (snapshot.data().status == "playing") {
          navigation.navigate("Quiz", {
            eventID: eventID,
            scoreboardPublic: scoreboardPublic,
          });
        }
      } else {
        navigation.navigate("EventInfo", { eventID: eventID });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handlePress = (eventID, scoreboardPublic) => {
    setPressed(true)
    auth.currentUser
      ? checkBookingStatus(eventID, scoreboardPublic)
      : navigation.navigate("EventInfo");
    setPressed(false)
  };

  const handleLocked = () => {
    Alert.alert(
      "Oh, che ti tocchi?!",
      "Non vedi che nzi puo gioca?",
      [
        {
          text: "Chiudi",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  const HomeScrollView = () => {

    return (
      <ScrollView style={{ flex: 1, padding: 15, backgroundColor: colors.bg }}>
        {currentEvents.map((data, i) => {
          return (
            <View
              key={i}
              style={[styles.eventCard, {
                backgroundColor: data.isLocked ? "#7a7a7a" : colors.primary
              }]}
            >
              {data.isLocked ?
                <View style={{ flex: 2, height: "100%", width: "100%" }}>
                  <ImageBackground
                    source={{ uri: data.photo }}
                    imageStyle={{
                      borderRadius: 15,
                    }}
                    style={{
                      height: "100%",
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'gray', opacity: 0.7, borderTopRightRadius: 15, borderTopLeftRadius: 15 }} />
                    <Icon1 name="lock" size={50} color="#474747" />
                  </ImageBackground>

                </View>
                :
                <View style={{ flex: 2, height: "100%", width: "100%" }}>
                  <Image
                    source={{ uri: data.photo }}
                    style={{
                      borderRadius: 15,
                      flex: 2,
                      height: "100%",
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  />
                </ View>}
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  width: "100%",
                  padding: 15,
                }}
              >
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 20
                  }}
                >
                  <Text
                    style={{
                      color: "white", fontSize: 20,
                      fontFamily: font.bold, width: "70%",
                    }}
                  >
                    {data.name}
                  </Text>
                  {/* <Text
                    style={{ color: "white", fontSize: 15, fontWeight: "500" }}
                  >
                    {data.date}
                  </Text> */}
                </View>
                <TouchableOpacity
                  onPress={() => data.isLocked ? handleLocked() : handlePress(data.id)}
                  style={{ width: "100%" }}
                  disabled={pressed}
                >
                  <View
                    style={{
                      width: "100%",
                      height: 50,
                      backgroundColor: data.isLocked ? '#474747' : colors.secondary,
                      borderRadius: 15,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ fontSize: 25, color: data.isLocked ? "#FFFFFF" : "#000000", fontFamily: font.bold }}>Gioca</Text>
                  </View>
                </TouchableOpacity>

              </View>
            </View>
          );
        })}
        <View style={{ width: "100%", height: 90 }} />
      </ScrollView>
    );
  };
  const HistoryScrollView = () => {
    return (
      <ScrollView style={{ flex: 1, padding: 15, backgroundColor: colors.bg }}>
        {pastEvents.map((data, i) => {
          return (
            <View
              key={i}
              onPress={() => {
                navigation.navigate("PastEvents");
                // Alert.alert("Spiacenti", "Funzionalità non ancora disponibile");
              }}
              style={styles.eventCard}
            >
              <ImageBackground
                source={require("../assets/torino(fake).jpeg")}
                imageStyle={{
                  borderRadius: 15,
                }}
                style={{
                  flex: 2,
                  height: "100%",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  width: "100%",
                  padding: 15,
                }}
              >
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "white", fontSize: 25, fontFamily: font.bold,
                      marginBottom: 10,
                    }}
                  >
                    {data.name}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    width: "100%",
                    height: 50,
                    backgroundColor: colors.secondary,
                    borderRadius: 15,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => navigation.navigate("PastEvents")}
                >
                  <Text style={{ fontSize: 25, fontFamily: font.bold }}>
                    Esplora
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
        <View style={{ width: "100%", height: 90 }} />
      </ScrollView>
    );
  };
  if (loading) {
    return (
      <Loading />
    );
  } else {
    return (
      <>
        <Header screen={"home"} />

        <Tab.Navigator
          initialRouteName="homeScrollView"
          screenOptions={{
            tabBarStyle: { backgroundColor: colors.primary },
            tabBarLabelStyle: {
              fontSize: 15,
              letterSpacing: 1, fontFamily: font.bold,
              color: colors.secondary,
            },
            tabBarPressOpacity: 1,
            tabBarPressColor: 'trasparent',
            tabBarIndicatorStyle: { backgroundColor: colors.secondary },
          }}
        >
          <Tab.Screen
            name="homeScrollView"
            component={HomeScrollView}
            options={{
              tabBarLabel: "Eventi attuali",
            }}
          />
          <Tab.Screen
            name="historyScrollView"
            component={HistoryScrollView}
            options={{
              tabBarLabel: "Eventi passati",
            }}
          />
        </Tab.Navigator>
        <TouchableOpacity
          style={styles.infoBox}
          onPress={() => navigation.navigate("Intro")}
        >
          <View style={styles.trophyBox}>
            {/* <Icon1 name="trophy" size={50} color={colors.secondary} /> */}
            <Image
              source={require("../assets/trophyY.png")}
              style={{ width: 63, height: 63 }}
            />
          </View>
          <View style={styles.textBox}>
            <Text style={styles.text}>Manuale ADT</Text>
          </View>
        </TouchableOpacity>
      </>
    );
  }
}
const styles = StyleSheet.create({
  infoBox: {
    backgroundColor: colors.primary,
    position: "absolute",
    bottom: 0,
    height: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderTopWidth: 3,
    borderTopColor: colors.secondary,
  },
  text: {
    color: colors.secondary,
    fontSize: 30,
    marginHorizontal: 5,
    fontFamily: font.bold,
  },
  trophyBox: {
    position: "absolute",
    top: -50,
    left: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: colors.secondary,
    //Ios Shadow
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 12,
    // },
    // shadowOpacity: 0.58,
    // shadowRadius: 16.0,
    //Android Shadow
    elevation: 24,
  },
  textBox: {
    position: "absolute",
    left: 130,
  },
  eventCard: {
    width: "100%",
    height: 350,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: colors.primary,
  },
  eventButton: {
    flex: 1,
    width: "100%",
    height: 40,
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    borderColor: colors.primary,
    borderRadius: 15,
  },
  playButton: {
    position: "absolute",
    bottom: 20,
    backgroundColor: colors.secondary,
    height: 50,
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 3,
    borderColor: colors.primary,
  },
});
