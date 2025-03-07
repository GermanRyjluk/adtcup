import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Header } from "../components/header";
import { Ionicons } from "react-native-vector-icons";
import { colors } from "../shared/colors";
import { font } from "../shared/fonts";

export default function EventStatus({ navigation, route }) {
  const {
    status,
    eventID,
    eventTitle = "Le Idi di Marzo",
    eventDate = "15/03/2025",
    eventLocation = "Torino",
  } = route.params || {};

  // Sezione in alto con informazioni sull'evento e pulsante info
  const renderHeaderInfo = () => {
    return (
      <View style={styles.headerInfoContainer}>
        <Text style={styles.headerTitle}>{eventTitle}</Text>
        <Text style={styles.headerSubtitle}>
          {eventDate} • {eventLocation}
        </Text>
        <TouchableOpacity
          style={styles.eventInfoButton}
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
      </View>
    );
  };

  // Sezione centrale che mostra lo stato dell'evento
  const renderStatus = () => {
    switch (status) {
      case "pending":
        return (
          <View style={styles.statusContainer}>
            <Ionicons
              name="time-outline"
              size={80}
              color={colors.secondary}
              style={{ marginVertical: 20 }}
            />
            <Text style={styles.mainTitle}>In attesa di conferma</Text>
            <Text style={styles.description}>
              La tua richiesta di partecipazione è stata ricevuta. Attendi che
              un amministratore la approvi!
            </Text>
            <ActivityIndicator
              size="large"
              color={colors.secondary}
              style={{ marginTop: 20 }}
            />
          </View>
        );
      case "pay":
        return (
          <View style={styles.statusContainer}>
            <Ionicons
              name="checkmark-done-circle"
              size={80}
              color={colors.secondary}
              style={{ marginVertical: 20 }}
            />
            <Text style={styles.mainTitle}>Sei stato accettato!</Text>
            <Text style={styles.description}>
              Per completare la tua registrazione, contatta gli amministratori e
              procedi con il pagamento o la conferma definitiva.
            </Text>
            <View style={styles.contactArea}>
              <TouchableOpacity
                style={styles.contactButton}
                onPress={() => Linking.openURL("https://wa.me/+393894960846")}
              >
                <Image
                  source={require("../assets/whatsapp.png")}
                  style={styles.contactIcon}
                />
                <Text style={styles.contactText}>Gius</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.contactButton, { marginTop: 20 }]}
                onPress={() => Linking.openURL("https://wa.me/+393208970258")}
              >
                <Image
                  source={require("../assets/whatsapp.png")}
                  style={styles.contactIcon}
                />
                <Text style={styles.contactText}>Pie</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      case "waiting team":
        return (
          <View style={styles.statusContainer}>
            <Ionicons
              name="people-circle"
              size={80}
              color={colors.secondary}
              style={{ marginVertical: 20 }}
            />
            <Text style={styles.mainTitle}>Sei stato accettato!</Text>
            <Text style={styles.description}>
              A breve ti verrà assegnata la squadra. Resta sintonizzato!
            </Text>
          </View>
        );
      case "eliminated":
        return (
          <View style={styles.statusContainer}>
            <Ionicons
              name="skull-outline"
              size={80}
              color={colors.secondary}
              style={{ marginVertical: 20 }}
            />
            <Text style={styles.mainTitle}>Eliminato</Text>
            <Text style={[styles.description, { marginBottom: 30 }]}>
              Purtroppo la tua avventura finisce qui.
            </Text>
            <View style={styles.eliminatedBadge}>
              <Text style={styles.eliminatedBadgeText}>
                Meglio la prossima volta!
              </Text>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <View style={styles.container}>
        {/* Sezione in alto: informazioni sull'evento */}
        {renderHeaderInfo()}

        {/* Sezione centrale: stato */}
        <View style={styles.centerContainer}>{renderStatus()}</View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerInfoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontFamily: font.bold,
    fontSize: 24,
    color: colors.secondary,
    textAlign: "center",
  },
  headerSubtitle: {
    fontFamily: font.regular,
    fontSize: 16,
    color: colors.bg,
    marginTop: 4,
    textAlign: "center",
  },
  eventInfoButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.secondary,
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  eventInfoText: {
    marginLeft: 8,
    fontFamily: font.bold,
    fontSize: 15,
    color: colors.primary,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  statusContainer: {
    width: "100%",
    alignItems: "center",
  },
  mainTitle: {
    fontFamily: font.bold,
    fontSize: 26,
    color: colors.secondary,
    textAlign: "center",
  },
  description: {
    fontFamily: font.regular,
    fontSize: 16,
    color: colors.bg,
    textAlign: "center",
    marginHorizontal: 10,
    marginTop: 10,
  },
  contactArea: {
    marginTop: 30,
    alignItems: "center",
    width: "100%",
  },
  contactButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.secondary,
    borderRadius: 30,
    width: 180,
    height: 60,
    paddingHorizontal: 15,
  },
  contactIcon: {
    width: 30,
    height: 30,
    tintColor: colors.primary,
    marginRight: 10,
  },
  contactText: {
    fontFamily: font.bold,
    fontSize: 20,
    color: colors.primary,
  },
  eliminatedBadge: {
    backgroundColor: colors.secondary,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  eliminatedBadgeText: {
    fontFamily: font.bold,
    fontSize: 16,
    color: colors.primary,
    textAlign: "center",
  },
});
