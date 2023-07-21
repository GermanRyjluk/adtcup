import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import React from "react";
import { colors } from "../shared/colors";
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
            style={{ color: colors.secondary, textAlign: 'center', fontSize: 30, fontWeight: "800" }}
          >
            Aspetta di essere accettato
          </Text>
          <Image source={{ uri: "https://img.pikbest.com/png-images/20190918/cartoon-snail-loading-loading-gif-animation_2734139.png!bw700" }} style={{ width: 300, height: 200, marginTop: 30 }} />
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
              style={{ color: colors.secondary, textAlign: 'center', fontSize: 30, fontWeight: "800" }}
            >
              Sei stato accettato! contatta gli amministratori per scoprire come procedere
            </Text>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity style={{ width: 170, height: 60, backgroundColor: colors.secondary, borderRadius: 30, alignItems: 'center', flexDirection: 'row' }} onPress={() => Linking.openURL('https://wa.me/+393894960846')}>
                <Image source={require('../assets/whatsapp.png')} style={{ width: 30, height: 30, left: 30 }}></Image>
                <Text style={{ left: 50, color: 'black', textAlign: 'center', fontSize: 25, fontWeight: "800" }}>Gius</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: 170, height: 60, backgroundColor: colors.secondary, borderRadius: 30, alignItems: 'center', flexDirection: 'row', marginTop: 20 }} onPress={() => Linking.openURL('https://wa.me/+393208970258')}>
                <Image source={require('../assets/whatsapp.png')} style={{ width: 30, height: 30, left: 30 }}></Image>
                <Text style={{ left: 50, color: 'black', textAlign: 'center', fontSize: 25, fontWeight: "800" }}>Pie</Text>
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
                style={{ color: colors.secondary, textAlign: 'center', fontSize: 30, fontWeight: "800" }}
              >
                È tutto pronto! tra poco ti verrà comunicata la squadra!
              </Text>
            </View>
            : null
      }
    </>
  );
}
