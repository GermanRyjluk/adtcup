import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Header } from "@//components/header";
import { colors } from "@//shared/colors";
import { font } from "@//shared/fonts";

/**
 * Using Lucide icons.
 * Install with: npm i lucide-react-native
 */
import {
  Info,
  Hourglass,
  CheckCircle,
  Users,
  Skull,
  MessageSquare,
} from "lucide-react-native";
import BookingProgressBar from "../shared/BookingProgressBar";

export default function EventStatus({ navigation, route }) {
  const {
    status,
    eventID,
    eventTitle = "Le Idi di Marzo",
    eventDate = "15/03/2025",
    eventLocation = "Torino",
  } = route.params || {};

  // Header section with event details and info button
  const renderHeaderInfo = () => {
    return (
      <View style={styles.headerInfoContainer}>
        <Text style={styles.headerTitle}>{eventTitle}</Text>
        <Text style={styles.headerSubtitle}>
          {eventDate} • {eventLocation}
        </Text>
        <TouchableOpacity
          style={styles.eventInfoButton}
          onPress={() =>
            navigation.navigate("EventInfo", {
              eventID: eventID,
              screen: "outside",
            })
          }
        >
          <Info size={20} color={colors.primary} />
          <Text style={styles.eventInfoText}>Info evento</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Status card using a clean card layout with Lucide icons
  const renderStatusCard = () => {
    switch (status) {
      case "pending":
        return (
          <View style={styles.card}>
            <Hourglass size={80} color={colors.primary} />
            <Text style={styles.mainTitle}>In attesa di conferma</Text>
            <Text style={styles.description}>
              La tua richiesta di partecipazione è stata ricevuta. Attendi che
              un amministratore la approvi!
            </Text>
            <ActivityIndicator
              size="large"
              color={colors.primary}
              style={{ marginTop: 20 }}
            />
          </View>
        );
      case "pay":
        return (
          <View style={styles.card}>
            <CheckCircle size={80} color={colors.primary} />
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
                <MessageSquare size={24} color={colors.primary} />
                <Text style={styles.contactText}>Gius</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.contactButton, { marginTop: 20 }]}
                onPress={() => Linking.openURL("https://wa.me/+393208970258")}
              >
                <MessageSquare size={24} color={colors.primary} />
                <Text style={styles.contactText}>Pie</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      case "waiting team":
        return (
          <View style={styles.card}>
            <Users size={80} color={colors.primary} />
            <Text style={styles.mainTitle}>Sei stato accettato!</Text>
            <Text style={styles.description}>
              A breve ti verrà assegnata la squadra. Resta sintonizzato!
            </Text>
          </View>
        );
      case "eliminated":
        return (
          <View style={styles.card}>
            <Skull size={80} color={colors.primary} />
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
        {/* {renderHeaderInfo()} */}
        <BookingProgressBar currentStep={status == "pay" ? 1 : 2} />
        <View style={styles.centerContainer}>{renderStatusCard()}</View>
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
  card: {
    width: "100%",
    backgroundColor: colors.bg,
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  mainTitle: {
    fontFamily: font.bold,
    fontSize: 26,
    color: colors.primary,
    textAlign: "center",
    marginTop: 20,
  },
  description: {
    fontFamily: font.regular,
    fontSize: 16,
    color: colors.primary,
    textAlign: "center",
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
    justifyContent: "center",
  },
  contactText: {
    fontFamily: font.bold,
    fontSize: 20,
    color: colors.primary,
    marginLeft: 10,
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
