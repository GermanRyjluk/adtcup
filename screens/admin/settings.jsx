import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors } from "../../shared/colors";
import { auth } from "../../firebase/firebase";
import { Header } from "../../components/header";

import { logoutAccount } from "../../store/authSlice";
import { useDispatch } from "react-redux";

export default function Settings() {
  const dispatch = useDispatch();
  return (
    <>
      <Header />
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
            dispatch(logoutAccount());
          }}
        >
          <Text style={{ fontSize: 25, fontWeight: "800" }}>Log out</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
