import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React from "react";
import { colors } from "../shared/colors";
import { StatusBar } from "expo-status-bar";
import { Header } from "./header";

export default function Loading({ color = colors.bg }) {
  if (color) {
    return (
      <>
        <View style={[styles.container, { backgroundColor: color }]}>
          <ActivityIndicator size="small" color={colors.primary} />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
