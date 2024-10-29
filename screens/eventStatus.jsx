import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import React from "react";
import { colors } from "../shared/colors";
import { font } from "../shared/fonts";
import { Header } from "../components/header";
import { Ionicons } from "react-native-vector-icons";

export default function EventStatus({ navigation, route }) {
  const status = route.params.status;
  const eventID = route.params?.eventID;
  // console.log(status);

  const renderContent = () => {
    switch (status) {
      case "pending":
        return (
          <View style={styles.pendingContainer}>
            <Text style={styles.pendingText}>Aspetta di essere accettato</Text>
            <ActivityIndicator size="large" color={colors.secondary} />
          </View>
        );

      case "pay":
        return (
          <View style={styles.payContainer}>
            <TouchableOpacity
              style={styles.eventInfoContainer}
              onPress={() => {
                navigation.navigate("EventInfo", {
                  eventID: eventID,
                  screen: "outside",
                });
              }}
            >
              <Ionicons
                name="information-circle"
                size={24}
                color={colors.primary}
              />
              <Text style={styles.eventInfoText}>Info evento</Text>
            </TouchableOpacity>
            <View style={styles.centerAlign}>
              <Text style={styles.payText}>Sei stato accettato!</Text>
              <Text style={styles.paySubText}>
                Contatta gli amministratori per scoprire come procedere
              </Text>
              <TouchableOpacity
                style={{
                  width: 170,
                  height: 60,
                  backgroundColor: colors.secondary,
                  borderRadius: 30,
                  alignItems: "center",
                  flexDirection: "row",
                }}
                onPress={() => Linking.openURL("https://wa.me/+393894960846")}
              >
                <Image
                  source={require("../assets/whatsapp.png")}
                  style={{ width: 30, height: 30, left: 30 }}
                ></Image>
                <Text
                  style={{
                    left: 50,
                    color: "black",
                    textAlign: "center",
                    fontSize: 25,
                    fontFamily: font.bold,
                  }}
                >
                  Gius
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 170,
                  height: 60,
                  backgroundColor: colors.secondary,
                  borderRadius: 30,
                  alignItems: "center",
                  flexDirection: "row",
                  marginTop: 20,
                }}
                onPress={() => Linking.openURL("https://wa.me/+393208970258")}
              >
                <Image
                  source={require("../assets/whatsapp.png")}
                  style={{ width: 30, height: 30, left: 30 }}
                ></Image>
                <Text
                  style={{
                    left: 50,
                    color: "black",
                    textAlign: "center",
                    fontSize: 25,
                    fontFamily: font.bold,
                  }}
                >
                  Pie
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );

      case "waiting team":
        return (
          <View style={styles.waitingContainer}>
            <TouchableOpacity
              style={[styles.eventInfoContainer, { marginBottom: 30 }]}
              onPress={() => {
                navigation.navigate("EventInfo", {
                  eventID: eventID,
                  screen: "outside",
                });
              }}
            >
              <Ionicons
                name="information-circle"
                size={24}
                color={colors.primary}
              />
              <Text style={styles.eventInfoText}>Info evento</Text>
            </TouchableOpacity>
            <Text style={styles.waitingText}>È tutto pronto!</Text>
            <Text style={styles.waitingSubText}>
              tra poco ti verrà comunicata la squadra!
            </Text>
          </View>
        );

      case "eliminated":
        return (
          <View style={styles.eliminatedContainer}>
            <TouchableOpacity
              style={styles.eventInfoContainer}
              onPress={() => {
                navigation.navigate("EventInfo", {
                  eventID: eventID,
                  screen: "outside",
                });
              }}
            >
              <Ionicons
                name="information-circle"
                size={24}
                color={colors.primary}
              />
              <Text style={styles.eventInfoText}>Info evento</Text>
            </TouchableOpacity>
            <View style={styles.eliminatedBadge}>
              <Text style={styles.eliminatedBadgeText}>💀 Eliminato 💀</Text>
            </View>
            <Text style={styles.eliminatedText}>Sei un pollo</Text>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      {renderContent()}
    </>
  );
}

const styles = StyleSheet.create({
  eventInfoContainer: {
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.secondary,
    padding: 10,
    paddingHorizontal: 20,
  },
  eventInfoBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.secondary,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  eventInfoText: {
    color: colors.primary,
    textAlign: "center",
    fontSize: 15,
    fontFamily: font.bold,
    marginLeft: 5,
  },
  pendingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    padding: 30,
  },
  pendingText: {
    color: colors.secondary,
    textAlign: "center",
    fontSize: 30,
    fontFamily: font.bold,
    marginBottom: 50,
  },
  payContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.primary,
    padding: 30,
  },
  payText: {
    color: colors.secondary,
    textAlign: "center",
    fontSize: 30,
    fontFamily: font.bold,
  },
  paySubText: {
    color: colors.bg,
    fontSize: 15,
    fontFamily: font.bold,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  centerAlign: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  contactButtonMargin: {
    marginTop: 20,
  },
  waitingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    padding: 30,
  },
  waitingText: {
    color: colors.secondary,
    textAlign: "center",
    fontSize: 30,
    fontFamily: font.bold,
  },
  waitingSubText: {
    color: colors.bg,
    fontSize: 15,
    fontFamily: font.bold,
    textAlign: "center",
    marginTop: 10,
  },
  eliminatedContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    padding: 30,
  },
  eliminatedBadge: {
    backgroundColor: colors.secondary,
    padding: 10,
    paddingHorizontal: 15,
    marginBottom: 30,
    borderRadius: 15, // Change this to 15 if you want rounded corners
  },
  eliminatedBadgeText: {
    color: colors.primary,
    textAlign: "center",
    fontSize: 30,
    fontFamily: font.bold,
  },
  eliminatedText: {
    color: colors.secondary,
    textAlign: "center",
    fontSize: 30,
    fontFamily: font.bold,
  },
});
