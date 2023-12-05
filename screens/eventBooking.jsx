import { View, Text, TouchableOpacity, Linking, Alert, Image } from "react-native";
import React, { useState } from "react";
import { colors } from "../shared/colors";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Header } from "../components/header";

import CheckBox from "expo-checkbox";
import { font } from "../shared/fonts";
import { useSelector } from "react-redux";

export default function EventBooking({ navigation, route }) {
  const auth = useSelector(state => state.auth);

  const [completed, setCompleted] = useState(false);
  const [completedPrivacyPolicy, setCompletedPrivacyPolicy] = useState(false);

  const warningMessage = (state) => {
    if (state) {
      Alert.alert('Attenzione!', 'Se non hai inviato il google form, la tua richiesta di partecipazione non verrà considerata.', [
        {
          text: "L'ho compilato",
          onPress: () => setCompleted(state),

        },
        {
          text: "Compila form",
          onPress: () => Linking.openURL("https://forms.gle/F9Asw7LQCaxHvnug6"),

        },
        {
          text: "Esci",
          onPress: () => null,
          style: "cancel",
        },
      ],
        {
          cancelable: true,
        },
        [],
        {
          cancelable: true,
          onDismiss: () => setCompleted(false),
        })
    } else {
      setCompleted(state);
    }
  }
  const handleSendRequest = async () => {
    try {
      await setDoc(
        doc(
          db,
          "/events",
          route.params.eventID,
          "/bookings",
          auth.currentUser.uid
        ),
        {
          uid: auth.currentUser.uid,
          name: auth.currentUser.displayName,
          email: auth.currentUser.email,
          status: "pending",
        }
      );
      navigation.navigate("Home");
      Alert.alert("Richiesta inviata!");
      navigation.navigate("HomeDrawer");
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      <Header />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.primary,
          padding: 30,
        }}
      >
        <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 15, fontFamily: font.bold, color: colors.bg, textAlign: 'center', marginBottom: 15 }}>Per inviare la tua richiesta di partecipazione</Text>
          <Text style={{ fontSize: 20, fontFamily: font.bold, color: colors.secondary, textAlign: 'center' }}>COMPILA IL QUESTIONARIO E TORNA SULL'APP PER TERMINARE L'ISCRIZIONE</Text>
        </View>
        <View style={{ flex: 0.75, justifyContent: 'space-evenly', alignItems: 'center' }}>
          <TouchableOpacity
            style={{
              padding: 20,
              width: 250,
              height: 70,
              backgroundColor: colors.bg,
              alignItems: "center",
              justifyContent: "space-evenly",
              borderRadius: 50,
              flexDirection: 'row'
            }}
            onPress={() => {
              Alert.alert('Attenzione!', "Inviato il google forms, torna sull'app e premi gioca affinchè la tua prenotazione sia presa in considerazione!", [
                {
                  text: "Ok, compila",
                  onPress: () => Linking.openURL("https://forms.gle/F9Asw7LQCaxHvnug6"),

                },
                {
                  text: "Esci",
                  onPress: () => null,
                  style: "cancel",
                },
              ],
                {
                  cancelable: true,
                })
            }}
          >
            <Image source={require('../assets/googledocs.png')} style={{ width: 25, height: 31, marginRight: 10 }} />
            <Text style={{ fontSize: 25, fontFamily: font.bold, color: colors.primary }}>
              Google Form
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={{ color: colors.bg, fontSize: 15, fontFamily: font.bold, textAlign: 'center' }}>Se hai qualche dubbio, contatta gli amministratori</Text>
          <TouchableOpacity style={{ height: 50, width: 150, backgroundColor: colors.secondary, borderRadius: 30, alignItems: 'center', flexDirection: 'row', marginTop: 20 }} onPress={() => Linking.openURL('https://wa.me/+393894960846')}>
            <Image source={require('../assets/whatsapp.png')} style={{ width: 25, height: 25, left: 30 }}></Image>
            <Text style={{ left: 50, color: 'black', textAlign: 'center', fontSize: 20, fontFamily: font.bold }}>Gius</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ height: 50, width: 150, backgroundColor: colors.secondary, borderRadius: 30, alignItems: 'center', flexDirection: 'row', marginVertical: 20 }} onPress={() => Linking.openURL('https://wa.me/+393208970258')}>
            <Image source={require('../assets/whatsapp.png')} style={{ width: 25, height: 25, left: 30 }}></Image>
            <Text style={{ left: 50, color: 'black', textAlign: 'center', fontSize: 20, fontFamily: font.bold }}>Pie</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'center' }}>
          <View style={{ width: 250, flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
            <CheckBox
              style={{ width: 30, height: 30, borderRadius: 15, marginRight: 10 }}
              value={completed}
              onValueChange={(state) => warningMessage(state)}
              color={colors.secondary}
            />
            <Text style={{ fontSize: 15, fontFamily: font.medium, color: '#dadada' }}>Ho compilato il form</Text>
          </View>
          <View style={{ width: 250, flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
            <CheckBox
              style={{ width: 30, height: 30, borderRadius: 15, marginRight: 10 }}
              value={completedPrivacyPolicy}
              onValueChange={(state) => setCompletedPrivacyPolicy(state)}
              color={colors.secondary}
            />
            <Text style={{ fontSize: 15, fontFamily: font.medium, color: '#dadada' }}>Accetto</Text>
            <TouchableOpacity onPress={() => navigation.navigate("TermsAndConditions")}>

              <Text style={{ fontSize: 15, fontFamily: font.bold, color: colors.secondary }}> termini e condizioni</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            disabled={!completed || !completedPrivacyPolicy}
            style={{
              padding: 20,
              width: 250,
              height: 70,
              backgroundColor: completed && completedPrivacyPolicy ? colors.secondary : 'gray',
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 50,
            }}
            onPress={() => {
              handleSendRequest();
            }}
          >
            <Text
              style={{ color: completed && completedPrivacyPolicy ? colors.primary : '#474747', fontSize: 25, fontFamily: font.bold, }}
            >
              Invia richiesta
            </Text>
          </TouchableOpacity>
        </View>
      </View >
    </>
  );
}
