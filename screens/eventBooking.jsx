import { View, Text, TouchableOpacity, Linking, Alert } from "react-native";
import React from "react";
import { colors } from "../shared/colors";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

export default function EventBooking({ navigation, route }) {
  const handleSendRequest = async () => {
    try {
      await setDoc(
        doc(
          db,
          "/events",
          route.params.eventID,
          "/bookings",
          auth.currentUser.uid
        ),
        {
          uid: auth.currentUser.uid,
          name: auth.currentUser.displayName,
          email: auth.currentUser.email,
          status: "pending",
        }
      );
      navigation.navigate("Home");
      Alert.alert("Richiesta inviata!");
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.primary,
      }}
    >
      <TouchableOpacity
        style={{
          padding: 20,
          backgroundColor: colors.bg,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 100,
          borderRadius: 15,
        }}
        onPress={() => {
          Linking.openURL("https://google.com");
        }}
      >
        <Text style={{ color: "black", fontSize: 30, fontWeight: "800" }}>
          Google Form
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          padding: 20,
          backgroundColor: colors.secondary,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 100,
          borderRadius: 15,
        }}
        onPress={() => {
          handleSendRequest();
        }}
      >
        <Text
          style={{ color: colors.primary, fontSize: 30, fontWeight: "800" }}
        >
          Invia richiesta
        </Text>
      </TouchableOpacity>
    </View>
  );
}
