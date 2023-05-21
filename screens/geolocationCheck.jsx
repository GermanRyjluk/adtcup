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

import { colors } from "../shared/colors";

export default function GeolocationCheck() {
  const defaultProvider =
    Platform.OS === "ios" ? PROVIDER_DEFAULT : PROVIDER_GOOGLE;
  const [position, setPosition] = useState({
    latitude: 45.060764,
    longitude: 7.645175,
  });

  const [userLocation, setUserLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const radius = 50;

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
      }, 1000);
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
      } else {
        Alert.alert("Sei troppo lontano!", "Avvicinati al punto e riprova");
      }
    }
  };

  useEffect(() => {
    searchCurrentUserLocation();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={[position]}
        provider={defaultProvider}
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
          strokeColor={colors.primary}
          fillColor="rgba(0,0,0,0.3)"
        />
      </MapView>
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
    bottom: 30,
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
