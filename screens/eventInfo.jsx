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

const pages = [{ text: "1" }, { text: "2" }, { text: "3" }];

export default function EventInfo({ navigation, route }) {

  const handleButton = () => {
    if (auth.currentUser) {
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
                GIORNATA 1
              </Text>
              <Text
                style={[
                  styles.text,
                  { color: colors.bg, marginBottom: 50, fontSize: 18 },
                ]}
              >
                19/08/2023, Lanciano
              </Text>
              <Text style={{ fontFamily: font.bold, fontSize: 25, color: colors.secondary }}>SFIDA 1</Text>
              <Text style={{ fontFamily: font.bold, fontSize: 20, color: colors.secondary, marginBottom: 10, textAlign: 'center' }}>Alla ricerca delle gemme nascoste della città</Text>
              <Text style={{ fontFamily: font.medium, fontSize: 20, color: colors.bg, marginBottom: 10, textAlign: 'center' }}>Piazza Plebiscito a Lanciano alle 18:00</Text>
              <Text style={[styles.text, {
                fontSize: 20,
                fontFamily: font.medium,
                marginBottom: 20
              }]}>Le squadre si sfideranno in una vera e propria caccia al tesoro costituita da un susseguirsi di indovinelli(che visualizzerete grazie a dei Qr Code). Nel mezzo ci saranno anche delle sfide finchè non si arriverà ad un checkpoint, dove solo un numero chiuso di squadre riuscirà a qualificarsi per la seconda parte della sfida.
                Successivamente, le squadre rimaste continueranno a risolvere indovinelli e, alla fine, le prime 3 squadre arrivate al traguardo si qualificheranno per la finale.
              </Text>
              <Text style={{ fontFamily: font.bold, fontSize: 25, color: colors.secondary }}>SFIDA 2</Text>
              <Text style={{ fontFamily: font.bold, fontSize: 20, color: colors.secondary, textAlign: 'center' }}>Caccia al tesoro tra i bar</Text>
              <Text style={{ fontFamily: font.bold, fontSize: 20, color: colors.secondary, marginBottom: 10, textAlign: 'center' }}>(sfida alcolica)</Text>
              <Text style={{ fontFamily: font.medium, fontSize: 20, color: colors.bg, marginBottom: 10, textAlign: 'center' }}>Parco di Lanciano "Central Park" alle 22.30</Text>
              <Text style={[styles.text, {
                fontSize: 20,
                fontFamily: font.medium,
                marginBottom: 50
              }]}>I concorrenti competeranno sempre in un'avvincente caccia al tesoro, ma questa volta per i bar della città. Per ogni tappa, le squadre dovranno bere shottini per ricevere il prossimo indovinello e andare avanti nella competizione. Anche in questo caso le prime 3 squadre si qualificheranno alla finale.
              </Text>
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
                  { color: colors.bg, marginBottom: 50, fontSize: 18, textAlign: 'center' },
                ]}
              >
                21/08/2023, Le morge/Fossacesia
              </Text>
              <Text style={{ fontFamily: font.bold, fontSize: 25, color: colors.secondary }}>SFIDA 1</Text>
              <Text style={{ fontFamily: font.bold, fontSize: 20, color: colors.secondary, marginBottom: 10, textAlign: 'center' }}>Tutti al mare!</Text>
              <Text style={{ fontFamily: font.medium, fontSize: 20, color: colors.bg, marginBottom: 10, textAlign: 'center' }}>Le Morge alle 11:00</Text>
              <Text style={[styles.text, {
                fontSize: 20,
                fontFamily: font.medium,
                marginBottom: 20
              }]}> Le squadre questa volta avranno la possibilità di partecipare a diversi giochi sulla spiaggia e in acqua. Questa volta ci sarà una classifica a punti che decreterà le altre squadre che approderanno in finale, quests volta saranno 2;
              </Text>
              <Text style={[styles.text, {
                fontSize: 20,
                fontFamily: font.medium,
                marginBottom: 20
              }]}> Tra una sfida e l'altra ci sarà la possibilità di usufruire di un rinfresco per rifocillarsi dopo le fatiche della prima metà di giornata;
              </Text>
              <Text style={{ fontFamily: font.bold, fontSize: 25, color: colors.secondary }}>SFIDA 2</Text>
              <Text style={{ fontFamily: font.bold, fontSize: 20, color: colors.secondary, textAlign: 'center', marginBottom: 10 }}>Fossaceca, non LA</Text>
              <Text style={{ fontFamily: font.medium, fontSize: 20, color: colors.bg, marginBottom: 10, textAlign: 'center' }}>Fossacesia alle 17:00</Text>
              <Text style={[styles.text, {
                fontSize: 20,
                fontFamily: font.medium,
                marginBottom: 50
              }]}>I partecipanti partecipanno ad una caccia al tesoro per i bar di fossacesia marina, nel corso della quale ci saranno anche sfide per progredire nel gioco. Le prime 2 squadre otterranno l'accesso alla finalissima.
              </Text>
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
                GIORNATA 3
              </Text>
              <Text
                style={[
                  styles.text,
                  { color: colors.bg, marginBottom: 50, fontSize: 18, textAlign: 'center' },
                ]}
              >
                22/08/2023 Luogo da comunicare
              </Text>
              <Text style={{ fontFamily: font.bold, fontSize: 25, color: colors.secondary, marginBottom: 10 }}>FINALE</Text>
              <Text style={[styles.text, {
                fontSize: 20,
                fontFamily: font.medium,
                marginBottom: 20
              }]}>I finalisti si scontreranno per vincere l'ambito premio in una serie di sfide d'abilità. La finale però non è solo questo: parallelamente ci sarà una vera e propria festa, con musica e vari mini eventi al suo interno. Il party e' aperto a tutti, anche a chi non ha partecipato alla CUP fino ad ora. Una sola parola d'ordine per accedere all'evento: DIVERTIRSI!
              </Text>
            </ScrollView>
            <TouchableOpacity
              title="Gioca"
              onPress={() => { handleButton() }}
              style={{
                position: 'absolute',
                bottom: 50,
                height: 70,
                width: "60%",
                backgroundColor: colors.secondary,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 40,
                marginBottom: 20
              }}
            >
              <Text
                style={{
                  color: colors.primary,
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
    fontSize: 40,
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