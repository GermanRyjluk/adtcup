import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors } from "../../shared/colors";
import { auth } from "../../firebase/firebase";

export default function Settings() {
  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: colors.bg }}>
      <TouchableOpacity
        style={{
          width: "100%",
          height: 50,
          backgroundColor: "red",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 15,
        }}
        onPress={() => {
          auth.signOut();
        }}
      >
        <Text style={{ fontSize: 25, fontWeight: "800" }}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
