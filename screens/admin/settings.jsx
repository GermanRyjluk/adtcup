import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors } from "../../shared/colors";
import { Header } from "../../components/header";

import { logoutAccount } from "../../store/authSlice";
import { useDispatch } from "react-redux";

export default function Settings({ navigation }) {
  const dispatch = useDispatch();
  return (
    <>
      <Header />
      <View style={{ flex: 1, padding: 20, backgroundColor: colors.bg }}>
        <TouchableOpacity
          style={{
            width: "100%",
            backgroundColor: colors.primary,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 15,
            marginBottom: 10,
            paddingVertical: 15,
          }}
          onPress={() => {
            navigation.navigate("Events");
          }}
        >
          <Text style={{ fontSize: 25, fontWeight: "800", color: "white" }}>
            Gestisci eventi
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: "100%",
            backgroundColor: "red",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 15,
            paddingVertical: 15,
          }}
          onPress={() => {
            dispatch(logoutAccount());
          }}
        >
          <Text style={{ fontSize: 25, fontWeight: "800", color: "white" }}>
            Log out
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
