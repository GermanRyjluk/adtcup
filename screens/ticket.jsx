import { View, Text, Image } from "react-native";
import React from "react";
import { colors } from "../shared/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Header } from "../components/header";
import { font } from "../shared/fonts";

export default function Ticket({ navigation, route }) {
  const eventID = route.params.eventID;
  return (
    <>
      <Header />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.primary,
          flexDirection: 'column',
          padding: 30,
        }}
      >
        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 30,
        }}>
          <Text style={{
            fontSize: 40, fontFamily: font.bold, color: colors.secondary, marginBottom: 20
          }}>Ecco la tua prevendita!</Text>
          <Image source={require('../assets/ticket.png')} style={{ width: 200, height: 100 }} />

        </View>
        <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Text style={{
            fontSize: 25,
            fontFamily: font.medium, color: 'white', marginTop: 50, textAlign: 'center'
          }}>Vai al punto di partenza e aspetta l'ora di inizio per iniziare a giocare

          </Text>
        </View>
        <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <TouchableOpacity
            style={{
              paddingHorizontal: 50,
              paddingVertical: 20,
              backgroundColor: colors.secondary,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 15,
            }}
            onPress={() => {
              navigation.navigate("GeolocationCheck", { eventID: eventID });
            }}
          >
            <Text
              style={{
                color: colors.primary, fontSize: 30,
                fontFamily: font.bold,
              }}
            >
              Mappa
            </Text>
          </TouchableOpacity>

        </View>
      </View >
    </>
  );
}
