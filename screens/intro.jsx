import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Button,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useRef } from "react";
import { colors } from "../shared/colors";
import { auth } from "../firebase/firebase";
import { PageIndicator } from "react-native-page-indicator";
import { Header } from "../components/header";
import { font } from "../shared/fonts";

const pages = [{ text: "1" }, { text: "2" }, { text: "3" }];

export default function EventInfo({ navigation, route }) {
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
          style={{ backgroundColor: colors.primary }}
        >
          <View>
            <View
              style={{
                width,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: colors.primary,
                  padding: 20,
                  alignItems: "center",
                }}
              >
                <ScrollView style={{ marginBottom: 20, width: '100%' }} showsVerticalScrollIndicator={false}>

                  <Text
                    style={[
                      styles.text,
                      { color: colors.secondary, marginBottom: 20 },
                    ]}
                  >
                    REGOLE
                  </Text>
                  <View>
                    <View style={{ flexDirection: 'row', marginBottom: 25, width: '90%' }}>
                      <Text style={{ color: colors.secondary, fontFamily: font.medium, fontSize: 25, marginRight: 5 }}>1)</Text>
                      <Text style={[styles.text, {
                        fontSize: 20,
                        fontFamily: font.medium,
                      }]}>Le squadre saranno composte da 4 partecipanti;</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 25, width: '90%' }}>
                      <Text style={{ color: colors.secondary, fontFamily: font.medium, fontSize: 25, marginRight: 5 }}>2)</Text>
                      <Text style={[styles.text, {
                        fontSize: 20,
                        fontFamily: font.medium,
                      }]}>I vincitori di una sfida non parteciperanno alle altre, ma potranno assistere i presentatori nelle loro avventure;</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 25, width: '90%' }}>
                      <Text style={{ color: colors.secondary, fontFamily: font.medium, fontSize: 25, marginRight: 5 }}>3)</Text>
                      <Text style={[styles.text, {
                        fontSize: 20,
                        fontFamily: font.medium,
                      }]}>4 shot a squadra per ogni bar (nelle sfide serali);</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 25, width: '90%' }}>
                      <Text style={{ color: colors.secondary, fontFamily: font.medium, fontSize: 25, marginRight: 5 }}>4)</Text>
                      <Text style={[styles.text, {
                        fontSize: 20,
                        fontFamily: font.medium,
                      }]}>Sarà possibile prendere parte sia ad una sola sfida che a tutte, inoltre servirà la disponibilità dei partecipanti a giocare, in caso di qualificazione, la finale;</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 25, width: '90%' }}>
                      <Text style={{ color: colors.secondary, fontFamily: font.medium, fontSize: 25, marginRight: 5 }}>5)</Text>
                      <Text style={[styles.text, {
                        fontSize: 20,
                        fontFamily: font.medium,
                      }]}>Le alleanze tra 2 squadre sono consentite, a patto che esse si scambino le rispettive bandiere per tuta la durata dell'accordo;</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 25, width: '90%' }}>
                      <Text style={{ color: colors.secondary, fontFamily: font.medium, fontSize: 25, marginRight: 5 }}>6)</Text>
                      <Text style={[styles.text, {
                        fontSize: 20,
                        fontFamily: font.medium,
                      }]}>In caso di parità al traguardo di più di 2 squadre, causa alleanza, nessuna tra queste sarà premiata come vincitrice della sfida;</Text>
                    </View>
                  </View>
                </ScrollView>
              </View>
            </View>
          </View>
          <View
            style={{
              width,
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: colors.primary,
                padding: 20,
                alignItems: "center",
              }}
            >
              <ScrollView style={{ marginBottom: 20 }} showsVerticalScrollIndicator={false}>

                <Text
                  style={[
                    styles.text,
                    { color: colors.secondary, marginBottom: 20 },
                  ]}
                >
                  LA NOSTRA STORIA
                </Text>
                <Text style={[styles.text, { fontSize: 20, fontFamily: font.medium }]}>
                  Siamo due ragazzi che amano divertirsi e scoprire il mondo con i loro amici.
                  Abbiamo sempre cercato di rendere unica ogni nostra esperienza e nell’organizzare
                  una di queste ci è venuta un’idea. Volevamo festeggiare al meglio il compleanno
                  di un amico speciale, ADT: abbiamo pensato di regalargli un weekend che gli
                  permettesse di vivere Torino a 360, tra la sua storia e i suoi bar. Ma le tappe
                  erano tante e il tempo a nostra disposizione era poco, così abbiamo deciso di rendere
                  tutto il tour un gioco. Ma che gioco? Abbiamo creato una competizione a squadra
                  suddivisa in 3 parti. Una caccia al tesoro per i bar della città che ha
                  determinato le prime tre finaliste.
                  Un’altra cacia al tesoro, questa volta tra le gemme nascoste della città,
                  che ha visto vincitrici tre coppie. una finale, durante la quale i partecipanti
                  si sono cimentati in varie sfide per vincere l’ambito premio. Il tutto con il
                  convolgimento del pubblico, formato sia dai non finalisti che dagli spettatori
                  venuti per tifare i propri amici. Purtoppo ADT non ha potuto prendere parte alla
                  prima edizione. Quindi abbiamo pensato: “se ADT non va dalla Cup, la Cup va da ADT”
                  E da qui ADT CUP Lanciano.
                  Ma perché fermarsi qui quando possiamo portare il nostro gioco in giro per il mondo.
                </Text>
              </ScrollView>
            </View>
          </View>
          <View
            style={{
              width,
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: colors.primary,
                padding: 20,
                alignItems: "center",
              }}
            >
              <ScrollView style={{ marginBottom: 20 }} showsVerticalScrollIndicator={false}>
                <Text
                  style={[
                    styles.text,
                    { color: colors.secondary, marginBottom: 20 },
                  ]}
                >
                  I NOSTRI OBIETTIVI
                </Text>
                <Text style={{ fontFamily: font.bold, fontSize: 20, color: colors.secondary, marginBottom: 10 }}>CACCIA AL TESORO URBANA</Text>
                <Text style={[styles.text, {
                  fontSize: 20,
                  fontFamily: font.medium,
                  marginBottom: 20
                }]}>
                  Il progetto ADT CUP si pone l’obiettivo ambizioso di farvi scoprire la città.
                  Dagli antichi monumenti storici alla movida dei bar più sconosciuti. Avrete modo di esplorare i siti più famosi al pubblico e le gemme nascoste conosciute solo dalle persone del posto.
                  L’ADT CUP ti permetterà di vivere il territorio dagli occhi di chi lo conosce, arrivando a poterti immergere completamente nelle sue radici e nelle sue novità nel giro di un solo weekend.
                </Text>
                <Text style={{ fontFamily: font.bold, fontSize: 20, color: colors.secondary, marginBottom: 10 }}>CREARE LEGAMI: IL METODO ADT</Text>
                <Text style={[styles.text, {
                  fontSize: 20,
                  fontFamily: font.medium,
                  marginBottom: 20
                }]}>
                  Con l’ADT CUP abbandoneremo le solite routine di formazione delle squadre e utilizzeremo un approccio diverso, basato sulle caratteristiche uniche di ciascun partecipante. Abbiamo preparato un questionario dettagliato che ci aiuterà a conoscere meglio le tue abilità, interessi e personalità.
                  Il nostro obiettivo è creare squadre bilanciate e complementari, dove ciascun membro porterà al tavolo il proprio mix unico di talenti. Questo porterà a una competizione avvincente e, allo stesso tempo, vi permetterà di scoprire nuove amicizie e di apprendere dagli altri.
                  Se decidete di partecipare con i vostri amici, vi potrete sfidare negli incontri a squadre dove saranno i vostri avversari. Bisogna conoscere bene il nemico ma ancor meglio il proprio alleato per riuscire nei giochi.
                  Ricorda, l'obiettivo principale è divertirsi e creare un ambiente inclusivo e amichevole.
                </Text>
                <Text style={{ fontFamily: font.bold, fontSize: 20, color: colors.secondary, marginBottom: 10 }}>UN NUOVO MODO DI DIVERTIRSI</Text>
                <Text style={[styles.text, {
                  fontSize: 20,
                  fontFamily: font.medium,
                  marginBottom: 20
                }]}>
                  Hai voglia di vivere un weekend completamente diverso dal solito?
                  Se cerchi un’alternativa ai soliti sabato tra discoteca e aperitivi, nasce un nuovo modo di vivere il weekend: l’ADT CUP, una caccia al tesoro urbana che vi farà fare festa per tutta la città con dei perfetti sconosciuti. Potrete scoprire il luogo, conoscere persone nuove e divertirvi ad affrontare le sfide nelle quali voi e il vostro team collaborerete per vincere il premio finale.
                  Il vero premio di questa competizione è però, il suo svolgimento. E’ un’esperienza unica, che vi permetterà di vivere un posto nuovo in un modo del tutto innovativo.
                </Text>
              </ScrollView>
            </View>
          </View>
          {/* <View>
            <View
              style={{
                width,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: colors.primary,
                  padding: 20,
                  alignItems: "center",
                }}
              >
                <ScrollView style={{ marginBottom: 20 }}>

                  <Text
                    style={[
                      styles.text,
                      { color: colors.secondary, marginBottom: 20 },
                    ]}
                  >
                    IL NOSTRO TEAM
                  </Text>
                  <Text style={[styles.text, {
                    fontSize: 20,
                    fontFamily: font.medium,
                  }]}>
                    Stare coi fratelli mi rianima sempre in cornerHo dentro uno squalo
                    ma se lo ignoro è come non ci fosseFumo, fumo g fino alla
                    tosseVedo troppe cose che per me son non sense
                  </Text>
                </ScrollView>
              </View>
            </View>
          </View> */}
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
    fontSize: 38,
    color: "#ededed",
    fontFamily: font.bold,
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
