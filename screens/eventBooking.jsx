import { View, Text, TouchableOpacity, Linking, Alert, Image } from "react-native";
import React, { useState } from "react";
import { colors } from "../shared/colors";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { Header } from "../components/header";

import CheckBox from "expo-checkbox";

export default function EventBooking({ navigation, route }) {

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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 25, fontWeight: '800', color: colors.secondary, textAlign: 'center' }}>FAI IL QUESTIONARIO E INVIA LA TUA RICHIESTA DI PARTECIPAZIONE</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'center' }}>
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
              Linking.openURL("https://forms.gle/F9Asw7LQCaxHvnug6");
            }}
          >
            <Image source={require('../assets/googledocs.png')} style={{ width: 25, height: 31 }} />
            <Text style={{ color: "black", fontSize: 25, fontWeight: "800", color: colors.primary }}>
              Google Form
            </Text>
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
            <Text style={{ fontSize: 15, fontWeight: '500', color: '#dadada' }}>Ho compilato il form</Text>
          </View><View style={{ width: 250, flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
            <CheckBox
              style={{ width: 30, height: 30, borderRadius: 15, marginRight: 10 }}
              value={completedPrivacyPolicy}
              onValueChange={(state) => setCompletedPrivacyPolicy(state)}
              color={colors.secondary}
            />
            <Text style={{ fontSize: 15, fontWeight: '500', color: '#dadada' }}>Accetto</Text>
            <TouchableOpacity onPress={() => navigation.navigate("TermsAndConditions")}>

              <Text style={{ fontSize: 15, fontWeight: '500', color: colors.secondary }}> termini e condizioni</Text>
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
              style={{ color: completed && completedPrivacyPolicy ? colors.primary : '#474747', fontSize: 25, fontWeight: "800" }}
            >
              Invia richiesta
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
