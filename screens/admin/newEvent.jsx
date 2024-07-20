import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { Header } from "../../components/header";
import { colors } from "../../shared/colors";
import Checkbox from "expo-checkbox";

const NewEvent = () => {
  const [isLocked, setIsLocked] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [scoreboard, setScoreboard] = useState(true);
  return (
    <View>
      <Header />
      <View
        style={{
          backgroundColor: colors.primary,
          marginBottom: 20,
          padding: 20,
          borderBottomRightRadius: 40,
          borderBottomLeftRadius: 40,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{ fontSize: 25, fontWeight: "800", color: colors.secondary }}
        >
          Crea nuovo evento
        </Text>
      </View>
      <View style={{ margin: 10 }}>
        <TextInput
          placeholder="Nome"
          style={{
            marginBottom: 10,
            borderRadius: 10,
            backgroundColor: colors.bg,
            padding: 15,
          }}
        />
        <TextInput
          placeholder="Data"
          style={{
            marginBottom: 10,
            borderRadius: 10,
            backgroundColor: colors.bg,
            padding: 15,
          }}
        />
        <TextInput
          placeholder="Prezzo"
          keyboardType="number"
          style={{
            marginBottom: 10,
            borderRadius: 10,
            backgroundColor: colors.bg,
            padding: 15,
          }}
        />
        <TextInput
          placeholder="Link Immagine"
          style={{
            marginBottom: 10,
            borderRadius: 10,
            backgroundColor: colors.bg,
            padding: 15,
          }}
        />
        <TextInput
          placeholder="Prezzo"
          style={{
            marginBottom: 10,
            borderRadius: 10,
            backgroundColor: colors.bg,
            padding: 15,
          }}
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
      </View>
    </View>
  );
};

export default NewEvent;
