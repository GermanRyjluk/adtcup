import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors } from "../../shared/colors";
import { TextInput } from "react-native-gesture-handler";

export default function PlayerSettings({ route }) {
  const playerID = route.params.playerID;
  const handlePress = () => {
    console.log("we");
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primary,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: colors.bg, fontSize: 20, fontWeight: "800" }}>
        Inserire squadra del giocatore
      </Text>
      <TextInput
        style={{
          width: 70,
          marginTop: 10,
          padding: 10,
          backgroundColor: colors.bg,
          borderRadius: 10,
          fontSize: 15,
          fontWeight: "800",
        }}
      ></TextInput>
      <TouchableOpacity onPress={handlePress()}>
        <Text>Invia</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
