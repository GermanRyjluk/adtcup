import { View, Text } from "react-native";
import React from "react";
import { Header } from "../components/header";
import { font } from "../shared/fonts";

export default function Settings() {
  return (
    <>
      <Header />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{
          fontFamily: font.bold,
        }}>Settings</Text>
      </View>
    </>
  );
}
