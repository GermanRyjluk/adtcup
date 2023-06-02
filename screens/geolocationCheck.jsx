import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";

import MapView, {
  Circle,
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import * as Location from "expo-location";
import { getDistance } from "geolib";

import { compareAsc } from "date-fns";

import { colors } from "../shared/colors";
import { auth, db } from "../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";

export default function GeolocationCheck({ navigation, route }) {
  const defaultProvider =
    Platform.OS === "ios" ? PROVIDER_DEFAULT : PROVIDER_GOOGLE;
  const [position, setPosition] = useState({
    latitude: 45.060764,
    longitude: 7.645175,
  });

  const eventID = route.params.eventID;

  const [userLocation, setUserLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const radius = 1100;
  const startTime = new Date("2023-05-24T23:14:30.300Z");

  const checkTime = async () => {
    let currentDate = new Date();
    if (compareAsc(currentDate, startTime) == -1) {
      Alert.alert("Not yet!", "Wait until the exact hour and try again");
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

  const searchCurrentUserLocation = () => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      setInterval(async () => {
        let location = await Location.getCurrentPositionAsync({});
        setUserLocation(location);
      }, 5000);
      //{"coords": {"accuracy": 12.697999954223633, "altitude": 307.1999816894531,
      //"altitudeAccuracy": 2.838839292526245, "heading": 0, "latitude": 45.0614778, "longitude": 7.6448868,
      //"speed": 0}, "mocked": false, "timestamp": 1683844215281}
    })();
  };

  const renderPosition = () => {
    if (userLocation) {
      return (
        <Marker
          coordinate={{
            latitude: userLocation.coords.latitude,
            longitude: userLocation.coords.longitude,
          }}
          title="You"
          description="This is your position"
        ></Marker>
      );
    }
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
            position: "absolute",
            top: 10,
            right: 10,
            backgroundColor: colors.primary,
            padding: 20,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{ fontSize: 25, fontWeight: "800", color: colors.secondary }}
          >
            {distance} metri
          </Text>
        </View>
      );
    }
  };

  const handlePlayButton = () => {
    if (userLocation) {
      const distance = getDistance(position, {
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
      });
      if (distance <= radius) {
        //AGGIUNGERE (&& ORARIO ATTUALE > ORARIO DI INIZIO)
        Alert.alert("Puoi giocare!", "Sei nel punto giusto");
        checkTime();
      } else {
        Alert.alert("Sei troppo lontano!", "Avvicinati al punto e riprova");
      }
    }
  };

  useEffect(() => {
    searchCurrentUserLocation();
  }, []);
  const mapstyle = [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#1d2c4d",
        },
      ],
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#8ec3b9",
        },
      ],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#1a3646",
        },
      ],
    },
    {
      featureType: "administrative.country",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#4b6878",
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#64779e",
        },
      ],
    },
    {
      featureType: "administrative.province",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#4b6878",
        },
      ],
    },
    {
      featureType: "landscape.man_made",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#334e87",
        },
      ],
    },
    {
      featureType: "landscape.natural",
      elementType: "geometry",
      stylers: [
        {
          color: "#023e58",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [
        {
          color: "#283d6a",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#6f9ba5",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#1d2c4d",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#023e58",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#3C7680",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          color: "#304a7d",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#98a5be",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#1d2c4d",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#2c6675",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#255763",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#b0d5ce",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#023e58",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#98a5be",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#1d2c4d",
        },
      ],
    },
    {
      featureType: "transit.line",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#283d6a",
        },
      ],
    },
    {
      featureType: "transit.station",
      elementType: "geometry",
      stylers: [
        {
          color: "#3a4762",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#0e1626",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#4e6d70",
        },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      {Platform.OS !== "ios" ? (
        <MapView
          style={styles.map}
          region={[position, { latitudeDelta: 0.0922, longitudeDelta: 0.0421 }]}
          provider={defaultProvider}
          customMapStyle={mapstyle}
          showsUserLocation
          showsMyLocationButton
        >
          <Marker
            coordinate={position}
            title="ADT CUP"
            description="Go to this position to start the game"
          ></Marker>
          {renderPosition()}

          <Circle
            center={position}
            radius={radius}
            strokeWidth={3}
            strokeColor={colors.secondary}
            fillColor="rgba(244,244,244,0.2)"
          />
        </MapView>
      ) : (
        <TouchableOpacity>
          <Text>Google maps link</Text>
        </TouchableOpacity>
      )}
      {renderDistance()}
      <View style={styles.buttonBox}>
        <TouchableOpacity
          onPress={() => {
            handlePlayButton();
          }}
          style={styles.box}
        >
          <Text
            style={{ fontSize: 35, fontWeight: "800", color: colors.secondary }}
          >
            Gioca!
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  buttonBox: {
    position: "absolute",
    bottom: 70,
    left: 30,
    right: 30,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  box: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    padding: 20,
    width: "100%",
    borderRadius: 10,
  },
});
