import { View, Text } from "react-native";
import React from "react";
import { Header } from "../components/header";
import { colors } from "../shared/colors";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { QrButton } from "../components/qrButton";
import { Footer } from "../components/footer";

export default function TeamInfo() {
  return (
    <>
      {/* <Header /> */}
      <View
        style={{
          height: "100%",
          backgroundColor: colors.bg,
        }}
      >
        <Image source={require("../assets/user.png")} />
        <View style={{ padding: 20 }}>
          <TouchableOpacity
            style={{
              height: 50,
              width: 130,
              backgroundColor: colors.primary,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "800", color: "white" }}>
              Modifica
            </Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 15, fontWeight: "500" }}>Nome squadra:</Text>
          <Text style={{ fontSize: 20, fontWeight: "800", marginBottom: 20 }}>
            Pazzi si, ma pazzi per Gesu
          </Text>
          <Text style={{ fontSize: 15, fontWeight: "500" }}>Partecipanti:</Text>
          <Text style={{ fontSize: 20, fontWeight: "800" }}>
            Giuseppe Bellisario
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "800" }}>
            Pietro Giancristofaro
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "800" }}>German Ryjluk</Text>
          <Text style={{ fontSize: 20, fontWeight: "800", marginBottom: 20 }}>
            Federica Masciangelo
          </Text>
          <Text style={{ fontSize: 15, fontWeight: "500" }}>
            Altra informazione:
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "800" }}>
            Qui ci saranno altre info della squadra utili all'amministrazione
          </Text>
        </View>
        {/* <View style={{ position: "absolute", bottom: 100, right: 15 }}>
          <QrButton />
        </View> */}
      </View>
      <Footer />
    </>
  );
}
