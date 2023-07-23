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

const pages = [{ text: "asd" }, { text: "123" }];

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
          style={{ backgroundColor: colors.bg }}
        >
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
              <Text
                style={[
                  styles.text,
                  { color: colors.secondary, marginBottom: 20 },
                ]}
              >
                Chi siamo?
              </Text>
              <Text style={[styles.text, { fontSize: 20, fontFamily: font.medium }]}>
                Lei un po' mi ama un po' mi fa star dentro una bubbleOh baby,
                lady, ciao ciao, bye bye, halo Yo, già ho consumato le suoleDietro
                ho 'ste qui di cui non so neanche il nome, ioCerco me anche se non
                dovevo ma me ne sto andandoCorro più veloce di Lambo, lascio le
                scorie
              </Text>
              {/* <TouchableOpacity
              title="Avanti"
              onPress={() => {
              }}
              style={{
                position: "absolute",
                bottom: 50,
                height: 80,
                width: "100%",
                backgroundColor: colors.secondary,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 100,
                borderRadius: 40,
              }}
            >
              <Text
                style={{
                  color: colors.primary,
                  fontSize: 40,
                  fontWeight: "800",
                }}
              >
                Avanti
              </Text>
            </TouchableOpacity> */}
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
              <Text
                style={[
                  styles.text,
                  { color: colors.secondary, marginBottom: 20 },
                ]}
              >
                Regole
              </Text>
              <Text style={[styles.text, {
                fontSize: 20,
                fontFamily: font.medium,
              }]}>
                Stare coi fratelli mi rianima sempre in cornerHo dentro uno squalo
                ma se lo ignoro è come non ci fosseFumo, fumo g fino alla
                tosseVedo troppe cose che per me son non sense
              </Text>
              <TouchableOpacity
                title="Gioca"
                onPress={() => {
                  navigation.goBack();
                }}
                style={{
                  position: "absolute",
                  bottom: 50,
                  height: 80,
                  width: "100%",
                  backgroundColor: colors.secondary,
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 100,
                  borderRadius: 40,
                }}
              >
                <Text
                  style={{
                    color: colors.primary,
                    fontSize: 40,
                    fontWeight: "800",
                  }}
                >
                  Gioca
                </Text>
              </TouchableOpacity>
            </View>
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
    fontSize: 50,
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
