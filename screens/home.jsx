import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
} from "react-native";

import { Header } from "../components/header";

import { colors } from "../shared/colors";

import Icon1 from "react-native-vector-icons/FontAwesome5"; //Trophy (trophy)
import { auth, db } from "../firebase/firebase";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

import { font } from "../shared/fonts";

const Tab = createMaterialTopTabNavigator();

// import { SafeAreaProvider } from 'react-native-safe-area-context';

const currentEvents = [
  {
    id: "1VgaAztg9yvbzRLuIjql",
    name: "LANGIAN",
    photo:
      "https://www.virtuquotidiane.it/wp-content/uploads/2017/07/lancianonotte.jpg",
    date: "23-8-2023",
    price: "€15",
    scoreboardPublic: true,
  },
  {
    id: "1VgaAztg9yvbzRLuIjql",
    name: "FOSSACESIA",
    photo:
      "https://www.chietitoday.it/~media/horizontal-hi/67481805668942/fossacesia-marina-2.jpg",
    date: "25-8-2023",
    price: "€10",
  },
  {
    id: "1VgaAztg9yvbzRLuIjql",
    name: "SANTVIT",
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/7/7c/Porto_di_San_Vito_Chietino_02.JPG",
    date: "24-8-2023",
    price: "€20",
  },
];
const pastEvents = [
  {
    name: "TORINO",
    photo: "../assets/torino(fake).jpeg",
    date: "09-05-2023",
    price: "€15",
  },
];

export default function Home({ navigation }) {
  const checkBookingStatus = async (eventID, scoreboardPublic) => {
    try {
      const snapshot = await getDoc(
        doc(db, "/events", eventID, "/bookings", auth.currentUser.uid)
      ).catch((e) => console.error(e));

      if (snapshot.exists()) {
        if (snapshot.data().status == "pending") {
          navigation.navigate("EventStatus", { status: "pending" });
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
    auth.currentUser
      ? checkBookingStatus(eventID, scoreboardPublic)
      : navigation.navigate("EventInfo");
  };

  const HomeScrollView = () => {
    return (
      <ScrollView style={{ flex: 1, padding: 30, backgroundColor: colors.bg }}>
        {currentEvents.map((data, i) => {
          return (
            <TouchableOpacity
              key={i}
              onPress={() => handlePress(data.id, data.scoreboardPublic)}
              style={styles.eventCard}
            >
              <ImageBackground
                source={{ uri: data.photo }}
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
                    style={{ color: "white", fontSize: 25, fontWeight: "800" }}
                  >
                    {data.name}
                  </Text>
                  <Text
                    style={{ color: "white", fontSize: 15, fontWeight: "500" }}
                  >
                    {data.date}
                  </Text>
                </View>
                <View
                  style={{
                    width: "100%",
                    height: 50,
                    backgroundColor: colors.secondary,
                    borderRadius: 15,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 25, fontWeight: "800" }}>Gioca</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
        <View style={{ width: "100%", height: 90 }} />
      </ScrollView>
    );
  };
  const HistoryScrollView = () => {
    return (
      <ScrollView style={{ flex: 1, padding: 30, backgroundColor: colors.bg }}>
        {pastEvents.map((data, i) => {
          return (
            <TouchableOpacity key={i} onPress={() => handlePress()}>
              <ImageBackground
                style={styles.eventCard}
                source={require("../assets/torino(fake).jpeg")}
                imageStyle={{
                  borderRadius: 15,
                  borderColor: colors.primary,
                  borderWidth: 6,
                }}
              >
                <View style={styles.eventButton}>
                  <Text style={[styles.text, { color: colors.primary }]}>
                    {data.name}
                  </Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          );
        })}
        <View style={{ width: "100%", height: 90 }} />
      </ScrollView>
    );
  };
  return (
    <>
      {/* <Header /> */}

      <Tab.Navigator
        initialRouteName="homeScrollView"
        screenOptions={{
          tabBarStyle: { backgroundColor: colors.primary },
          tabBarLabelStyle: {
            fontSize: 15,
            letterSpacing: 1,
            fontWeight: "800",
            // fontFamily: font,
            color: colors.secondary,
          },
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
    fontWeight: "800",
    // fontFamily: font,
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
    left: 140,
  },
  eventCard: {
    width: "100%",
    height: 350,
    backgroundColor: colors.primary,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
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
