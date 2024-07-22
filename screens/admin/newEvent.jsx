import { View, Text, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import { Header } from "../../components/header";
import { colors } from "../../shared/colors";
import Checkbox from "expo-checkbox";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import DatePicker from "react-native-modern-datepicker";
import { format, setDate } from "date-fns";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const NewEvent = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("second");
  const [eventDate, setEventDate] = useState(today);
  const [price, setPrice] = useState("");
  const [photoLink, setPhotoLink] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [scoreboard, setScoreboard] = useState(true);

  var today = format(new Date(), "yyyy-MM-dd");

  const createEvent = async () => {
    const date = parseDate(eventDate);
    try {
      await addDoc(collection(db, "events/"), {
        name: name,
        date: date,
        price: price,
        photo: photoLink,
        isLocked: isLocked,
        isVisible: isVisible,
        scoreboardPublic: scoreboard,
        startTime: date,
      }).then(() => {
        Alert.alert(
          "Evento creato",
          "L'evento " + name + " è stato creato correttamente"
        );
      });
    } catch (e) {
      console.error(e);
    }
  };

  const parseDate = (dateString) => {
    const [datePart, timePart] = dateString.split(" ");
    const [year, month, day] = datePart.split("/");
    const [hours, minutes] = timePart.split(":");

    // Note: Months are 0-indexed in JavaScript Date
    return new Date(year, month - 1, day, hours, minutes);
  };

  return (
    <View>
      <Header />
      <View
        style={{
          backgroundColor: colors.primary,

          padding: 20,
          borderBottomRightRadius: 40,
          borderBottomLeftRadius: 40,
          justifyContent: "center",
          alignItems: "center",
          zIndex: 99,
        }}
      >
        <Text
          style={{ fontSize: 25, fontWeight: "800", color: colors.secondary }}
        >
          Crea nuovo evento
        </Text>
      </View>
      <ScrollView
        style={{
          top: -30,
          paddingTop: 40,
          marginHorizontal: 10,
          marginBottom: 10,
        }}
      >
        <TextInput
          placeholder="Nome"
          style={{
            marginBottom: 10,
            borderRadius: 10,
            backgroundColor: colors.bg,
            padding: 15,
          }}
          onChange={(str) => setName(str)}
        />
        <TextInput
          placeholder="Data"
          style={{
            marginBottom: 10,
            borderRadius: 10,
            backgroundColor: colors.bg,
            padding: 15,
          }}
          onChange={(str) => setDate(str)}
        />
        <TextInput
          placeholder="Prezzo"
          keyboardType="number-pad"
          style={{
            marginBottom: 10,
            borderRadius: 10,
            backgroundColor: colors.bg,
            padding: 15,
          }}
          onChange={(str) => setPrice(str)}
        />
        <TextInput
          placeholder="Link Immagine"
          style={{
            marginBottom: 10,
            borderRadius: 10,
            backgroundColor: colors.bg,
            padding: 15,
          }}
          onChange={(str) => setPhotoLink(str)}
        />
        <View
          style={{
            flexDirection: "row",
            backgroundColor: colors.bg,
            padding: 15,
            borderRadius: 10,
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Checkbox
            style={{ borderRadius: 50 }}
            value={isLocked}
            onValueChange={(state) => {
              setIsLocked(state);
            }}
            color={colors.secondary}
          />
          <Text style={{ fontSize: 20, fontWeight: "800", marginLeft: 10 }}>
            Bloccato
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: colors.bg,
            padding: 15,
            borderRadius: 10,
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Checkbox
            style={{ borderRadius: 50 }}
            value={isVisible}
            onValueChange={(state) => {
              setIsVisible(state);
            }}
            color={colors.secondary}
          />
          <Text style={{ fontSize: 20, fontWeight: "800", marginLeft: 10 }}>
            Visibile
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: colors.bg,
            padding: 15,
            borderRadius: 10,
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Checkbox
            style={{ borderRadius: 50 }}
            value={scoreboard}
            onValueChange={(state) => {
              setScoreboard(state);
            }}
            color={colors.secondary}
          />
          <Text style={{ fontSize: 20, fontWeight: "800", marginLeft: 10 }}>
            Scoreboard visibile
          </Text>
        </View>
        <DatePicker
          options={{
            backgroundColor: colors.bg,
            textHeaderColor: colors.primary,
            textDefaultColor: colors.primary,
            selectedTextColor: colors.secondary,
            mainColor: colors.primary,
            textSecondaryColor: colors.primary,
          }}
          current={today}
          selected={today}
          minuteInterval={1}
          minimumDate={today}
          style={{
            borderRadius: 10,
            marginBottom: 10,
          }}
          onSelectedChange={(date) => {
            setEventDate(date);
          }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: colors.secondary,
            padding: 15,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            marginBottom: 200,
          }}
          onPress={() => createEvent()}
        >
          <Text
            style={{ fontSize: 20, fontWeight: "800", color: colors.primary }}
          >
            Crea evento
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default NewEvent;
