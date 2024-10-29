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

export default function EventStatus({ route }) {
  const status = route.params.status;
  console.log(status);

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
            <Text style={styles.payText}>
              Sei stato accettato! contatta gli amministratori per scoprire come
              procedere
            </Text>
            <View style={styles.centerAlign}>
              <ContactButton name="Gius" url="https://wa.me/+393894960846" />
              <ContactButton
                name="Pie"
                url="https://wa.me/+393208970258"
                style={styles.contactButtonMargin}
              />
            </View>
          </View>
        );

      case "waiting team":
        return (
          <View style={styles.waitingContainer}>
            <Text style={styles.waitingText}>
              È tutto pronto! tra poco ti verrà comunicata la squadra!
            </Text>
          </View>
        );

      case "eliminated":
        return (
          <View style={styles.eliminatedContainer}>
            <View style={styles.eliminatedBadge}>
              <Text style={styles.eliminatedBadgeText}>Eliminato</Text>
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
