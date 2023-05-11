import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";

import MapView, { Circle, Marker } from "react-native-maps";
import * as Location from "expo-location";

import { colors } from "../shared/colors";

export default function GeolocationCheck() {
  const [position, setPosition] = useState({
    latitude: 45.060764,
    longitude: 7.645175,
  });

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    setInterval(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        //{"coords": {"accuracy": 12.697999954223633, "altitude": 307.1999816894531,
        //"altitudeAccuracy": 2.838839292526245, "heading": 0, "latitude": 45.0614778, "longitude": 7.6448868,
        //"speed": 0}, "mocked": false, "timestamp": 1683844215281}
      })();
    }, 3000);
  }, [location]);

  const renderPosition = () => {
    if (location) {
      return (
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          title="You"
          description="This is your position"
        ></Marker>
      );
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={[position, { latitudeDelta: 0.09, longitudeDelta: 0.09 }]}
      >
        <Marker
          coordinate={position}
          title="ADT CUP"
          description="Go to this position to start the game"
        ></Marker>
        {renderPosition()}

        <Circle
          center={position}
          radius={50}
          strokeWidth={3}
          strokeColor={colors.primary}
          fillColor="rgba(0,0,0,0.3)"
        />
      </MapView>
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
});
