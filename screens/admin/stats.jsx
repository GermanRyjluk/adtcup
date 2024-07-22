import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Header } from "../../components/header";
import { useSelector } from "react-redux";

export default function Stats() {
  const eventID = useSelector((state) => state.eventID.value);
  return (
    <>
      <Header />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Prossimamente...</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
