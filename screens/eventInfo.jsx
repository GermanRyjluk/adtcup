import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Button,
  TouchableOpacity,
  Animated,
  Alert,
} from "react-native";
import React, { useRef } from "react";
import { colors } from "../shared/colors";
import { auth } from "../firebase/firebase";
import { PageIndicator } from "react-native-page-indicator";
import { Header } from "../components/header";
import { font } from "../shared/fonts";
import { sendEmailVerification } from "firebase/auth";

import { LinearGradient } from 'expo-linear-gradient';

const pages = [{ text: "1" }, { text: "2" }, { text: "3" }];

export default function EventInfo({ navigation, route }) {
  const screen = route.params?.screen;

  const handleButton = () => {
    if (screen == 'inside') {
      navigation.goBack()
    } else if (auth.currentUser) {
      if (auth.currentUser.emailVerified) {
        navigation.navigate("EventBooking", {
          eventID: route.params.eventID,
        })
      } else {
        Alert.alert("Verifica la tua mail", "Per procedere devi verificare che l'email sia tua, se il problema persiste esci e rientra dal tuo account", [
          {
            text: "Ricevi email",
            onPress: () => { sendEmailVerification(auth.currentUser); Alert.alert("Email inviata", "Controlla la tua casella e riprova") },

          },
          {
            text: "Già fatto",
            onPress: () => {
              auth.currentUser.reload();
            },

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
          })
      }
    } else {
      navigation.navigate("Login");
    }
  }

  const { width, height } = Dimensions.get("window");
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <>
      <Header />
      <View style={styles.root}>
        <Animated.ScrollView
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: true,
            }
          )}
          style={{ backgroundColor: colors.bg }}
        >
          <View
            style={{
              width,
              alignItems: "center",
              padding: 20,
            }}
          >
            <ScrollView
              style={{
                width: "100%",
                height: "90%",
                backgroundColor: colors.primary,
                borderRadius: 20,
                padding: 30,
                marginBottom: 25,
              }}
              contentContainerStyle={{ alignItems: 'center' }}
            >
              <Text
                style={[
                  styles.text,
                  { color: colors.secondary },
                ]}
              >
                GIORNATA 1
              </Text>
              <Text
                style={[
                  styles.text,
                  { color: colors.bg, marginBottom: 30, fontSize: 18, textAlign: 'center' },
                ]}
              >
                {"08/12/2023\nParco del Valentino"}
              </Text>
              <Text style={{ fontFamily: font.bold, fontSize: 30, marginTop: 5, color: colors.secondary, marginBottom: 5, textAlign: 'center' }}>Christus Pakus</Text>
              <Text style={{ fontFamily: font.medium, fontSize: 20, color: colors.bg, marginBottom: 10, textAlign: 'center' }}>Fontana dei dodici mesi alle 14:30</Text>
              <Text style={[styles.text, {
                fontSize: 20,
                fontFamily: font.medium,
                marginBottom: 50
              }]}>Immergiti nell’epica storia di Christus Pakus, un ambizioso leader che si è elevato al potere grazie a cuore, testa e gambe. In questo gioco di ruolo avventuroso, dovrai seguire i passi del protagonista mentre naviga attraverso intricati intrighi politici, affronta nemici spietati e prende decisioni cruciali che plasmeranno il suo destino e il destino del suo regno.
              </Text>

              {/* <Text style={{ fontFamily: font.bold, fontSize: 20, color: colors.secondary, textAlign: 'center' }}>Caccia al tesoro tra i bar</Text>
              <Text style={{ fontFamily: font.bold, fontSize: 20, color: colors.secondary, marginBottom: 10, textAlign: 'center' }}>(sfida alcolica)</Text>
              <Text style={{ fontFamily: font.medium, fontSize: 20, color: colors.bg, marginBottom: 10, textAlign: 'center' }}>Parco di Lanciano "Central Park" alle 22.30</Text>
              <Text style={[styles.text, {
                fontSize: 20,
                fontFamily: font.medium,
                marginBottom: 50
              }]}>I concorrenti competeranno sempre in un'avvincente caccia al tesoro, ma questa volta per i bar della città. Per ogni tappa, le squadre dovranno bere shottini per ricevere il prossimo indovinello e andare avanti nella competizione. Anche in questo caso le prime 3 squadre si qualificheranno alla finale.
              </Text> */}

            </ScrollView>
          </View>
          <View
            style={{
              width,
              alignItems: "center",
              padding: 20,
            }}
          >
            <ScrollView
              style={{
                width: "100%",
                height: "90%",
                backgroundColor: colors.primary,
                borderRadius: 20,
                padding: 30,
                marginBottom: 25
              }}
              contentContainerStyle={{ alignItems: 'center' }}
            >
              <Text
                style={[
                  styles.text,
                  { color: colors.secondary },
                ]}
              >
                GIORNATA 2
              </Text>
              <Text
                style={[
                  styles.text,
                  { color: colors.bg, marginBottom: 30, fontSize: 18, textAlign: 'center' },
                ]}
              >
                {"09/12/2023\nParco Pellerina"}
              </Text>
              <Text style={{ fontFamily: font.bold, fontSize: 30, color: colors.secondary, marginVertical: 5, textAlign: 'center' }}>Pako al mare!</Text>
              <Text style={{ fontFamily: font.medium, fontSize: 20, color: colors.bg, marginBottom: 10, textAlign: 'center' }}>Fontana dõ sBurracaõ alle 14:30</Text>
              <Text style={[styles.text, {
                fontSize: 20,
                fontFamily: font.medium,
                marginBottom: 20
              }]}>Immergiti nelle profondità marine e vivi l'emozionante avventura di Pako, un coraggioso pesce in cerca di suo padre. Attraversa gli intricati labirinti oceanici, affronta pericoli sconosciuti e incontra personaggi marini unici mentre sveli i misteri del vasto oceano. Portate occhialini, braccioli e slippini rossi per aiutare Pako
              </Text>

              {/* <Text style={[styles.text, {
                fontSize: 20,
                fontFamily: font.medium,
                marginBottom: 50
              }]}> Tra una sfida e l'altra ci sarà la possibilità di usufruire di un rinfresco per rifocillarsi dopo le fatiche della prima metà di giornata;
              </Text> */}
              {/* <Text style={{ fontFamily: font.bold, fontSize: 20, color: colors.secondary, textAlign: 'center', marginBottom: 10 }}>Fossaceca, non LA</Text>
              <Text style={{ fontFamily: font.medium, fontSize: 20, color: colors.bg, marginBottom: 10, textAlign: 'center' }}>Fossacesia alle 17:00</Text>
              <Text style={[styles.text, {
                fontSize: 20,
                fontFamily: font.medium,
                marginBottom: 50
              }]}>I partecipanti partecipanno ad una caccia al tesoro per i bar di fossacesia marina, nel corso della quale ci saranno anche sfide per progredire nel gioco. Le prime 2 squadre otterranno l'accesso alla finalissima.
              </Text> */}

            </ScrollView>
          </View>
          <View
            style={{
              width,
              alignItems: "center",
              padding: 20,
            }}
          >
            <ScrollView
              style={{
                width: "100%",
                height: "90%",
                backgroundColor: colors.primary,
                borderRadius: 20,
                padding: 30,
                marginBottom: 25
              }}
              contentContainerStyle={{ alignItems: 'center' }}
            >
              <Text
                style={[
                  styles.text,
                  { color: colors.secondary, textAlign: 'center', marginBottom: 5 },
                ]}
              >
                FINALE
              </Text>
              <Text
                style={[
                  styles.text,
                  { color: colors.bg, marginBottom: 30, fontSize: 18, textAlign: 'center' },
                ]}
              >
                09/12/23, Comala
              </Text>
              <Text style={{ fontFamily: font.bold, fontSize: 25, color: colors.secondary, marginBottom: 10 }}>Pako Rabanne</Text>
              <Text style={{ fontFamily: font.medium, fontSize: 20, color: colors.bg, marginBottom: 10, textAlign: 'center' }}>Comala verso le 21:00</Text>
              <Text style={[styles.text, {
                fontSize: 20,
                fontFamily: font.medium,
                marginBottom: 50
              }]}>Sperimenta il magnetismo avvolgente di “BOCCIA SENSORIALE”, la straordinaria fragranza di Pako Rabanne, attraverso questo coinvolgente gioco. Ogni mossa svela strati di eleganza senza tempo, trasportandoti in un mondo di lusso e raffinatezza sensoriale.
              </Text>
            </ScrollView>
            <TouchableOpacity
              title="Gioca"
              onPress={() => { handleButton() }}
              style={{
                width: "100%",
                paddingVertical: 15,
                backgroundColor: colors.primary,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 40,
                marginBottom: 50,
              }}
            >
              <Text
                style={{
                  color: colors.secondary,
                  fontSize: 35, fontFamily: font.bold,
                }}
              >
                Gioca
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.ScrollView>
        <PageIndicator
          style={styles.pageIndicator}
          count={pages.length}
          animatedCurrent={Animated.divide(scrollX, width)}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 35,
    color: "#ededed", fontFamily: font.bold,
  },
  root: {
    flex: 1,
  },
  page: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.bg,
  },
  pageIndicator: {
    left: 0,
    right: 0,
    bottom: 20,
    position: "absolute",
  },
});