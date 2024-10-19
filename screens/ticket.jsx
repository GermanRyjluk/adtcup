import {
  View,
  Text,
  Image,
  Linking,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../shared/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Header } from "../components/header";
import { font } from "../shared/fonts";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

import * as Location from "expo-location";
import { getDistance } from "geolib";

import { compareAsc } from "date-fns";

import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";

export default function Ticket({ navigation, route }) {
  const auth = useSelector((state) => state.auth);

  const eventID = route.params.eventID;
  const [startingPoint, setStartingPoint] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [position, setPosition] = useState({});
  const [permission, setPermission] = useState();
  const [startTime, setStartTime] = useState();
  const [distance, setDistance] = useState(null);

  const [loading, setLoading] = useState(true);

  const radius = 70;

  const getPosition = async () => {
    setDistance(null);
    let location = await Location.getCurrentPositionAsync({});
    setDistance(
      getDistance(position, {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      })
    );
  };

  const searchCurrentUserLocation = async (pos) => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setPermission(false);
      console.log("Permission to access location was denied");
      return;
    } else {
      setPermission(true);
    }

    let location = await Location.getCurrentPositionAsync({});
    // console.log(location, pos)
    setUserLocation(location);
    setDistance(
      getDistance(position, {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      })
    );
  };

  // const renderDistance = () => {
  //   if (userLocation) {
  //     setDistance(getDistance(position, {
  //       latitude: userLocation.coords.latitude,
  //       longitude: userLocation.coords.longitude,
  //     }));
  //     return (
  //       <View
  //         style={{
  //           borderRadius: 10,
  //           justifyContent: "center",
  //           alignItems: "center",
  //         }}
  //       >
  //         <Text
  //           style={{ fontSize: 25, fontFamily: font.medium, color: colors.secondary }}
  //         >
  //           Sei a {distance} metri
  //         </Text>
  //       </View>
  //     );
  //   }
  // };

  const fetchStartingPoint = async () => {
    try {
      await getDoc(
        doc(db, "users", auth.currentUser.uid, "bookings", eventID)
      ).then(async (snapshot) => {
        await getDoc(
          doc(db, "events", eventID, "teams", snapshot.data()["team"])
        ).then((snapshot) => {
          setStartingPoint(snapshot.data()["startingPoint"]);
          setPosition(snapshot.data()["startingPointCoords"]);

          searchCurrentUserLocation(snapshot.data()["startingPointCoords"]);
        });
      });
      await getDoc(doc(db, "events", eventID)).then((snapshot) => {
        setStartTime(new Date(snapshot.data()["startTime"].toDate()));
      });
    } catch (e) {
      console.error("Error fetching position: " + e);
    }
  };

  const checkTime = async () => {
    let currentDate = new Date();
    if (compareAsc(currentDate, startTime) == -1) {
      Alert.alert("Non ancora!", "Aspetta l'orario d'inizio e prova di nuovo");
    } else if (
      compareAsc(currentDate, startTime) == 1 ||
      compareAsc(currentDate, startTime) == 0
    ) {
      await updateDoc(
        doc(db, "/events", eventID, "/bookings", auth.currentUser.uid),
        {
          status: "playing",
          name: auth.currentUser.displayName,
        }
      );
      navigation.navigate("Quiz", { eventID: eventID });
    }
  };

  const handlePlayButton = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Posizione non disponibile",
        "Abilita questa funzionalità per poter giocare",
        [
          {
            text: "Impostazioni",
            onPress: () => {
              navigation.goBack();
              Linking.openSettings();
            },
            style: "cancel",
          },
          {
            text: "Anulla",
            onPress: () => null,
            style: "cancel",
          },
        ],
        {
          cancelable: true,
        }
      );
    }
    if (userLocation && position) {
      const distance = getDistance(position, {
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
      });
      if (distance <= radius) {
        checkTime();
      } else {
        Alert.alert("Sei troppo lontano!", "Avvicinati al punto e riprova");
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchStartingPoint();
    setLoading(false);
  }, [startingPoint, distance]);

  return (
    <>
      <Header />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.primary,
          flexDirection: "column",
          padding: 30,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 30,
          }}
        >
          <Text
            style={{
              fontSize: 40,
              fontFamily: font.bold,
              color: colors.secondary,
              marginBottom: 20,
            }}
          >
            Ecco la tua prevendita!
          </Text>
          <Image
            source={require("../assets/ticket.png")}
            style={{ width: 200, height: 100 }}
          />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 25,
              fontFamily: font.medium,
              color: "white",
              marginTop: 50,
              textAlign: "center",
            }}
          >
            Vai al punto di partenza e aspetta l'ora di inizio per iniziare a
            giocare
          </Text>
        </View>
        {/* {renderDistance()} */}
        <View
          style={{
            flex: 1,
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          {!distance ? (
            <View>
              <Text
                style={[
                  styles.text,
                  { color: colors.secondary, marginBottom: 15 },
                ]}
              >
                Calcolando distanza
              </Text>
              <ActivityIndicator size={"small"} />
            </View>
          ) : (
            <>
              <Text style={[styles.text, { color: colors.secondary }]}>
                Sei a {distance} mt.
              </Text>
              <TouchableOpacity
                style={[styles.button, { flexDirection: "row" }]}
                onPress={() => {
                  getPosition();
                }}
              >
                <Ionicons name="repeat" size={30} color={colors.primary} />
              </TouchableOpacity>
            </>
          )}
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            disabled={!startingPoint}
            style={styles.button}
            onPress={() => {
              Linking.openURL(startingPoint);
            }}
          >
            <Ionicons name="navigate-circle" size={50} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={!startingPoint}
            style={[styles.button, { padding: 20 }]}
            onPress={() => {
              handlePlayButton();
            }}
          >
            <Text style={[styles.text, { fontSize: 35 }]}>Gioca</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={!startingPoint}
            style={styles.button}
            onPress={() => {
              navigation.navigate("TeamInfo", {
                footer: true,
                eventID: eventID,
              });
            }}
          >
            <Ionicons name="people" size={50} color={colors.primary} />
          </TouchableOpacity>
        </View>
        {/* <View style={{ width: '100%' }}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.bg }]}
            onPress={() => {
              navigation.navigate("TeamInfo", { footer: true });
            }}
          >
            <Text style={styles.text}>Simulazione di gioco</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    marginHorizontal: 10,
  },
  text: {
    color: colors.primary,
    fontFamily: font.bold,
    fontSize: 20,
  },
});
