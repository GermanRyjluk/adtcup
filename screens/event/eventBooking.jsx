import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  Alert,
  Image,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";
import { colors } from "@//shared/colors";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@//firebase/firebase";
import { Header } from "@//components/header";
import CheckBox from "expo-checkbox";
import { font } from "@//shared/fonts";
import { useSelector } from "react-redux";
import Loading from "@//components/loading";

export default function EventBooking({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const [pressed, setPressed] = useState(false);
  const auth = useSelector((state) => state.auth);
  const [completed, setCompleted] = useState(false);
  const [completedPrivacyPolicy, setCompletedPrivacyPolicy] = useState(false);
  const [formLink, setFormLink] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const snapshot = await getDoc(doc(db, "events", route.params?.eventID));
      setFormLink(snapshot.data().personalityFormLink);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const warningMessage = (state) => {
    if (state) {
      Alert.alert(
        "Attenzione!",
        "Se non hai inviato il google form, la tua richiesta di partecipazione non verrà considerata.",
        [
          { text: "L'ho compilato", onPress: () => setCompleted(state) },
          { text: "Compila form", onPress: () => Linking.openURL(formLink) },
          { text: "Esci", onPress: () => null, style: "cancel" },
        ],
        { cancelable: true }
      );
    } else {
      setCompleted(state);
    }
  };

  const handleSendRequest = async () => {
    if (!pressed) {
      setPressed(true);
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
      } catch (e) {
        console.error(e);
      } finally {
        setPressed(false);
      }
    }
  };

  if (loading) {
    return <Loading color={colors.primary} />;
  }

  return (
    <View style={{ backgroundColor: colors.primary, flex: 1 }}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            {/* <Text style={styles.headerText}>
              Per inviare la tua richiesta di partecipazione
            </Text> */}
            <Text style={styles.headerTitle}>COMPILA IL QUESTIONARIO</Text>
          </View>

          <View style={styles.contactContainer}>
            <Text style={styles.infoText}>
              Se hai qualche dubbio, contatta gli amministratori
            </Text>
            <TouchableOpacity
              style={styles.contactButton}
              onPress={() => Linking.openURL("https://wa.me/+393894960846")}
            >
              <Image
                source={require("@//assets/whatsapp.png")}
                style={styles.contactIcon}
              />
              <Text style={styles.contactButtonText}>Gius</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.contactButton}
              onPress={() => Linking.openURL("https://wa.me/+393208970258")}
            >
              <Image
                source={require("@//assets/whatsapp.png")}
                style={styles.contactIcon}
              />
              <Text style={styles.contactButtonText}>Pie</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.checkboxRow}>
              <CheckBox
                style={styles.checkbox}
                value={completedPrivacyPolicy}
                onValueChange={(state) => setCompletedPrivacyPolicy(state)}
                color={colors.secondary}
              />
              <Text style={styles.checkboxText}>Accetto</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("TermsAndConditions")}
              >
                <Text style={styles.termsText}> termini e condizioni</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              disabled={!completedPrivacyPolicy}
              style={[
                styles.formButton,
                {
                  backgroundColor: completedPrivacyPolicy ? colors.bg : "gray",
                },
              ]}
              onPress={() => {
                Alert.alert(
                  "Attenzione!",
                  "Se non invii il modulo della personalità non potrai essere selezionato per l'evento",
                  [
                    {
                      text: "Compila",
                      onPress: () => {
                        handleSendRequest();
                        Linking.openURL(formLink);
                      },
                    },
                    { text: "Esci", onPress: () => null, style: "cancel" },
                  ],
                  { cancelable: true }
                );
              }}
            >
              <Image
                source={require("@//assets/googledocs.png")}
                style={styles.formIcon}
              />
              <Text style={styles.formButtonText}>Google Form</Text>
            </TouchableOpacity>
            <Text style={styles.formFooterText}>
              Se hai gia inviato il form attendi di essere accettato altrimenti
            </Text>
          </View>

          <TouchableOpacity
            disabled={!completedPrivacyPolicy}
            style={[
              styles.subscribeButton,
              {
                backgroundColor: completedPrivacyPolicy
                  ? colors.secondary
                  : "gray",
              },
            ]}
            onPress={handleSendRequest}
          >
            {pressed ? (
              <ActivityIndicator color="black" />
            ) : (
              <Text
                style={[
                  styles.subscribeButtonText,
                  {
                    color:
                      completed && completedPrivacyPolicy
                        ? colors.primary
                        : "#474747",
                  },
                ]}
              >
                Iscriviti!
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: 30,
    alignItems: "center",
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 15,
    fontFamily: font.bold,
    color: colors.bg,
    textAlign: "center",
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 30,
    fontFamily: font.bold,
    color: colors.secondary,
    textAlign: "center",
  },
  contactContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  infoText: {
    color: colors.bg,
    fontSize: 15,
    fontFamily: font.bold,
    textAlign: "center",
    marginBottom: 10,
  },
  contactButton: {
    height: 50,
    width: 150,
    backgroundColor: colors.secondary,
    borderRadius: 30,
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  contactIcon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  contactButtonText: {
    color: "black",
    fontSize: 20,
    fontFamily: font.bold,
  },
  formContainer: {
    width: "100%",
    alignItems: "center",
    marginVertical: 20,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkbox: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  checkboxText: {
    fontSize: 15,
    fontFamily: font.medium,
    color: "#dadada",
  },
  termsText: {
    fontSize: 15,
    fontFamily: font.bold,
    color: colors.secondary,
  },
  formButton: {
    padding: 20,
    width: 250,
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: 50,
    marginBottom: 10,
  },
  formIcon: {
    width: 25,
    height: 31,
    marginRight: 10,
  },
  formButtonText: {
    fontSize: 25,
    fontFamily: font.bold,
    color: colors.primary,
  },
  formFooterText: {
    color: colors.bg,
    fontSize: 15,
    fontFamily: font.bold,
    textAlign: "center",
    marginTop: 20,
  },
  subscribeButton: {
    padding: 20,
    width: 250,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    marginTop: 20,
  },
  subscribeButtonText: {
    fontSize: 25,
    fontFamily: font.bold,
  },
});
