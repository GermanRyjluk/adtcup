import { View, Text, TouchableOpacity, Image, Linking, ActivityIndicator } from "react-native";
import React from "react";
import { colors } from "../shared/colors";
import { font } from "../shared/fonts";
import { Header } from "../components/header";

export default function EventStatus({ route }) {
  const status = route.params.status;
  console.log(status);

  return (
    <>
      <Header />
      {status == 'pending' ?
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.primary,
            padding: 30
          }}
        >
          <Text
            style={{ color: colors.secondary, textAlign: 'center', fontSize: 30, fontFamily: font.bold, marginBottom: 50 }}
          >
            Aspetta di essere accettato
          </Text>
          {/* <Image source={require("../assets/loadingPacman.gif")} style={{ width: 100, height: 100, marginTop: 30 }} /> */}
          <ActivityIndicator size="large" color={colors.secondary} />
        </View >
        : status == 'pay' ?
          <View
            style={{
              flex: 1,
              alignItems: "center",
              backgroundColor: colors.primary,
              padding: 30
            }}
          >
            <Text
              style={{ color: colors.secondary, textAlign: 'center', fontSize: 30, fontFamily: font.bold }}
            >
              Sei stato accettato! contatta gli amministratori per scoprire come procedere
            </Text>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity style={{ width: 170, height: 60, backgroundColor: colors.secondary, borderRadius: 30, alignItems: 'center', flexDirection: 'row' }} onPress={() => Linking.openURL('https://wa.me/+393894960846')}>
                <Image source={require('../assets/whatsapp.png')} style={{ width: 30, height: 30, left: 30 }}></Image>
                <Text style={{ left: 50, color: 'black', textAlign: 'center', fontSize: 25, fontFamily: font.bold }}>Gius</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: 170, height: 60, backgroundColor: colors.secondary, borderRadius: 30, alignItems: 'center', flexDirection: 'row', marginTop: 20 }} onPress={() => Linking.openURL('https://wa.me/+393208970258')}>
                <Image source={require('../assets/whatsapp.png')} style={{ width: 30, height: 30, left: 30 }}></Image>
                <Text style={{ left: 50, color: 'black', textAlign: 'center', fontSize: 25, fontFamily: font.bold }}>Pie</Text>
              </TouchableOpacity>
            </View>

          </View>
          : status == 'waiting team' ?
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: colors.primary,
                padding: 30
              }}
            >
              <Text
                style={{ color: colors.secondary, textAlign: 'center', fontSize: 30, fontFamily: font.bold }}
              >
                È tutto pronto! tra poco ti verrà comunicata la squadra!
              </Text>
            </View>
            : null
      }
    </>
  );
}
