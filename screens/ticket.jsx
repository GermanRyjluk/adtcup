import { View, Text } from "react-native";
import React from "react";
import { colors } from "../shared/colors";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Ticket({ navigation, route }) {
  const eventID = route.params.eventID;
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
          backgroundColor: colors.secondary,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 100,
          borderRadius: 15,
        }}
        onPress={() => {
          navigation.navigate("GeolocationCheck", { eventID: eventID });
        }}
      >
        <Text
          style={{ color: colors.primary, fontSize: 30, fontWeight: "800" }}
        >
          Mappa
        </Text>
      </TouchableOpacity>
    </View>
  );
}
