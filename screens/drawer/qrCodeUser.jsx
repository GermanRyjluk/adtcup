import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Header } from "@//components/header";

import QRCode from "react-native-qrcode-svg";
import { colors } from "@//shared/colors";
import { font } from "@//shared/fonts";
import { useSelector } from "react-redux";

export default function QrCodeUser() {
  const auth = useSelector((state) => state.auth);
  const code = auth.currentUser.uid;
  return (
    <>
      <Header />
      <View
        style={{
          backgroundColor: colors.primary,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 30,
        }}
      >
        <Text
          style={{
            fontFamily: font.bold,
            fontSize: 40,
            color: colors.secondary,
          }}
        >
          ADT CODE
        </Text>
        <View
          style={{
            borderWidth: 5,
            borderColor: colors.secondary,
            marginVertical: 40,
          }}
        >
          <QRCode
            value={code}
            size={300}
            color={colors.primary}
            backgroundColor={colors.secondary}
          />
        </View>
        <Text
          style={{
            fontFamily: font.medium,
            fontSize: 17,
            color: "white",
            textAlign: "center",
          }}
        >
          Devi mostrare questo QR ai bar per ottenere la tua consumazione e alla
          finale per ottenere il tuo sconto giocatore
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
