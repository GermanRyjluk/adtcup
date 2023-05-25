import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";

import { Header } from "../components/header";

import { colors } from "../shared/colors";

import Icon1 from "react-native-vector-icons/FontAwesome5"; //Trophy (trophy)
import { auth, db } from "../firebase/firebase";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

const Tab = createMaterialTopTabNavigator();

// import { SafeAreaProvider } from 'react-native-safe-area-context';

const currentEvents = [
  {
    id: "1VgaAztg9yvbzRLuIjql",
    name: "LANGIAN",
    photo: "null",
    date: "23-8-2023",
    price: "€15",
  },
  {
    id: "1VgaAztg9yvbzRLuIjql",
    name: "FOSSACESIA",
    photo: "null",
    date: "25-8-2023",
    price: "€10",
  },
  {
    id: "1VgaAztg9yvbzRLuIjql",
    name: "SANTVIT",
    photo: "null",
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
  const checkBookingStatus = async (eventID) => {
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
          navigation.navigate("Ticket", { eventID: eventID });
        } else if (snapshot.data().status == "playing") {
          navigation.navigate("Quiz", { eventID: eventID });
        }
      } else {
        navigation.navigate("EventInfo", { eventID: eventID });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handlePress = (eventID) => {
    auth.currentUser
      ? checkBookingStatus(eventID)
      : navigation.navigate("EventInfo");
  };

  const HomeScrollView = () => {
    return (
      <ScrollView style={{ flex: 1, padding: 30, backgroundColor: colors.bg }}>
        {currentEvents.map((data, i) => {
          return (
            <TouchableOpacity key={i} onPress={() => handlePress(data.id)}>
              <View style={[styles.eventCard, { height: 250 }]}>
                <Text style={styles.text}>{data.name}</Text>
                <View style={styles.eventButton}>
                  <Text style={[styles.text, { color: colors.primary }]}>
                    Gioca
                  </Text>
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
            fontWeight: "800",
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
          <Icon1 name="trophy" size={50} color={colors.secondary} />
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
    borderTopColor: "black",
  },
  text: {
    color: colors.secondary,
    fontSize: 30,
    fontWeight: "800",
    marginHorizontal: 5,
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
    borderColor: "black",
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
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 60,
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    borderColor: colors.primary,
    borderRadius: 15,
  },
});
