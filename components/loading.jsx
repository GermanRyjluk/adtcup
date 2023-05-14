import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React from "react";
import { colors } from "../shared/colors";
import { StatusBar } from "expo-status-bar";

export default function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
      <StatusBar backgroundColor={"white"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
