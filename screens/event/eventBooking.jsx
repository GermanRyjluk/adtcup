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
import { BookOpenTextIcon } from "lucide-react-native";
import SimpleBookingProgressBar from "../shared/BookingProgressBar";

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
        navigation.navigate("EventStatus", { status: "pending" });
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
        <SimpleBookingProgressBar currentStep={0} />
        <View style={styles.container}>
          <View style={styles.card}>
            <BookOpenTextIcon size={80} color={colors.primary} />
            <Text style={styles.headerTitle}>COMPILA IL QUESTIONARIO</Text>
            <View style={styles.formContainer}>
              <Text style={styles.formFooterText}>
                Se hai già inviato il questionario, iscriviti all'app per poter
                iniziare l'avventura!
              </Text>
              <View style={styles.checkboxRow}>
                <CheckBox
                  style={styles.checkbox}
                  value={completedPrivacyPolicy}
                  onValueChange={(state) => {
                    if (!completedPrivacyPolicy) {
                      Alert.alert(
                        "Attenzione!",
                        "Se non invii il modulo della personalità non potrai essere selezionato per l'evento",
                        [
                          {
                            text: "Continua",
                            onPress: () => {
                              setCompletedPrivacyPolicy(state);
                            },
                            style: "default",
                          },
                          {
                            text: "Esci",
                            onPress: () => null,
                            style: "cancel",
                          },
                        ],
                        { cancelable: true }
                      );
                    } else {
                      setCompletedPrivacyPolicy(state);
                    }
                  }}
                  color={colors.primary}
                />
                <Text style={styles.checkboxText}>Accetto</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("TermsAndConditions")}
                >
                  <Text style={styles.termsText}> termini e condizioni</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.buttonsContainer}>
              {/* Small Icon Button */}
              <TouchableOpacity
                style={[styles.smallButton]}
                onPress={() => Linking.openURL(formLink)}
              >
                <Image
                  source={require("@//assets/googledocs.png")}
                  style={styles.formIcon}
                />
              </TouchableOpacity>

              {/* Large "Iscriviti!" Button */}
              <TouchableOpacity
                disabled={!completedPrivacyPolicy}
                style={[
                  styles.subscribeButton,
                  {
                    backgroundColor: completedPrivacyPolicy
                      ? colors.secondary
                      : "#9d9d9d",
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
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
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
  headerTitle: {
    fontFamily: font.bold,
    fontSize: 26,
    color: colors.primary,
    textAlign: "center",
    marginTop: 20,
  },
  formContainer: {
    width: "100%",
    alignItems: "center",
    marginVertical: 20,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 15,
    marginRight: 10,
  },
  checkboxText: {
    fontSize: 15,
    fontFamily: font.medium,
    color: "#484848",
  },
  termsText: {
    fontFamily: font.regular,
    fontSize: 16,
    color: colors.primary,
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
  },
  formButtonText: {
    fontSize: 22,
    fontFamily: font.bold,
    color: colors.primary,
  },
  formFooterText: {
    fontFamily: font.regular,
    fontSize: 18,
    color: colors.primary,
    textAlign: "center",
    marginVertical: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  smallButton: {
    width: 70,
    height: 70,
    backgroundColor: "#83a7da",
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  subscribeButton: {
    flex: 1,
    height: 70,
    backgroundColor: colors.secondary,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  subscribeButtonText: {
    fontSize: 25,
    fontFamily: font.bold,
  },
});
