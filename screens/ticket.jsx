import { View, Text, Image, Linking, StyleSheet, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../shared/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Header } from "../components/header";
import { font } from "../shared/fonts";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

import * as Location from "expo-location";
import { getDistance } from "geolib";

import { compareAsc } from "date-fns";

import Ionicons from "react-native-vector-icons/Ionicons";

export default function Ticket({ navigation, route }) {
  const eventID = route.params.eventID;
  const [startingPoint, setStartingPoint] = useState(null)
  const [userLocation, setUserLocation] = useState(null);
  const [position, setPosition] = useState({});
  const [permission, setPermission] = useState()
  const [startTime, setStartTime] = useState()

  const radius = 1000;

  const searchCurrentUserLocation = () => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setPermission(false);
        console.log("Permission to access location was denied");
        return;
      } else {
        setPermission(true)
      }
      setInterval(async () => {
        let location = await Location.getCurrentPositionAsync({});
        setUserLocation(location);
      }, 3000);
      //{"coords": {"accuracy": 12.697999954223633, "altitude": 307.1999816894531,
      //"altitudeAccuracy": 2.838839292526245, "heading": 0, "latitude": 45.0614778, "longitude": 7.6448868,
      //"speed": 0}, "mocked": false, "timestamp": 1683844215281}
    })();
  };

  const renderDistance = () => {
    if (userLocation) {
      const distance = getDistance(position, {
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
      });
      return (
        <View
          style={{
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{ fontSize: 25, fontFamily: font.medium, color: colors.secondary }}
          >
            Sei a {distance} metri
          </Text>
        </View>
      );
    }
  };

  const fetchStartingPoint = async () => {
    try {
      await getDoc(doc(db, "users", auth.currentUser.uid, "bookings", eventID)).then(async (snapshot) => {
        await getDoc(doc(db, "events", eventID, "teams", snapshot.data()["team"])).then((snapshot) => {
          setStartingPoint(snapshot.data()["startingPoint"])
          setPosition(snapshot.data()["startingPointCoords"])
        })
      })
      await getDoc(doc(db, "events", eventID)).then((snapshot) => {
        setStartTime(new Date(snapshot.data()["startTime"].toDate()))
      })
    } catch (e) {
      console.error("Error fetching position: " + e);
    }
  }

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
    if (status !== 'granted') {
      Alert.alert(
        "Posizione non disponibile",
        "Abilita questa funzionalità per poter giocare",
        [
          {
            text: "Impostazioni",
            onPress: () => Linking.openSettings(),
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
        },
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
    fetchStartingPoint()
    searchCurrentUserLocation()
  }, [startingPoint])

  return (
    <>
      <Header />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.primary,
          flexDirection: 'column',
          padding: 30,
        }}
      >
        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 30,
        }}>
          <Text style={{
            fontSize: 40, fontFamily: font.bold, color: colors.secondary, marginBottom: 20
          }}>Ecco la tua prevendita!</Text>
          <Image source={require('../assets/ticket.png')} style={{ width: 200, height: 100 }} />

        </View>
        <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Text style={{
            fontSize: 25,
            fontFamily: font.medium, color: 'white', marginTop: 50, textAlign: 'center'
          }}>Vai al punto di partenza e aspetta l'ora di inizio per iniziare a giocare

          </Text>
        </View>
        {renderDistance()}
        <View style={{
          flex: 1,
          alignItems: 'center',
          flexDirection: 'row'
        }}>
          <TouchableOpacity
            disabled={!startingPoint}
            style={styles.button}
            onPress={() => {
              Linking.openURL(startingPoint)
            }}
          >
            <Ionicons name="navigate-circle" size={50} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={!startingPoint}
            style={[styles.button, { padding: 20 }]}
            onPress={() => {
              handlePlayButton()
            }}
          >
            <Text
              style={{
                color: colors.primary, fontSize: 30,
                fontFamily: font.bold,
              }}
            >
              Gioca
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={!startingPoint}
            style={styles.button}
            onPress={() => {
              navigation.navigate("TeamInfo", { footer: true });
            }}
          >
            <Ionicons name="people" size={50} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View >
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
    marginHorizontal: 10
  },
})