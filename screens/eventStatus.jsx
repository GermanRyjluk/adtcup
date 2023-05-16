import { View, Text } from "react-native";
import React from "react";
import { colors } from "../shared/colors";

export default function EventStatus({ route }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.primary,
      }}
    >
      <Text
        style={{ color: colors.secondary, fontSize: 30, fontWeight: "800" }}
      >
        {route.params.status}
      </Text>
    </View>
  );
}
