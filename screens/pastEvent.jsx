import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Button,
  TouchableOpacity,
  Animated,
  Image,
  Linking,
} from "react-native";
import React, { useRef } from "react";
import { colors } from "../shared/colors";
import { auth } from "../firebase/firebase";
import { PageIndicator } from "react-native-page-indicator";
import { Header } from "../components/header";
import { font } from "../shared/fonts";

import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";


const pages = [{ text: "asd" }, { text: "123" }];

export default function PastEvents({ navigation, route }) {
  const { width, height } = Dimensions.get("window");
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <>
      <Header />
      <View style={styles.root}>
        <View
          // horizontal={true}
          // pagingEnabled={true}
          // showsHorizontalScrollIndicator={false}
          // onScroll={Animated.event(
          //   [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          //   {
          //     useNativeDriver: true,
          //   }
          // )}
          style={{ backgroundColor: colors.bg }}
        >
          <View
            style={{
              width,
              alignItems: "center",
              padding: 20,
            }}
          >
            <View
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: colors.primary,
                borderRadius: 20,
                padding: 20,
                alignItems: "center",
              }}
            >
              <Image source={require("../assets/videoTorino.gif")} style={{ width: '100%', height: '75%', borderRadius: 20 }} />
              <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: "100%", marginVertical: 15 }}>

                <TouchableOpacity style={{ width: 60, height: 60, backgroundColor: colors.secondary, justifyContent: 'center', alignItems: 'center', borderRadius: 20 }} onPress={() => Linking.openURL("https://www.tiktok.com/@adt_cup")}>
                  <Image source={require("../assets/tiktok-blue.png")} style={{ width: 45, height: 51 }} />
                </TouchableOpacity>
                <TouchableOpacity style={{ width: 60, height: 60, backgroundColor: colors.secondary, justifyContent: 'center', alignItems: 'center', borderRadius: 20 }} onPress={() => Linking.openURL("https://www.instagram.com/adt_cup")}>
                  <Ionicons name="logo-instagram" size={50} color={colors.primary} />
                </TouchableOpacity>
              </View>
              <Text style={{ fontFamily: font.bold, color: colors.secondary, fontSize: 23 }}>Premi per vedere di più!</Text>
            </View>
          </View>
          {/* <View
            style={{
              width,
              alignItems: "center",
              padding: 20,
            }}
          >
            <View
              style={{
                width: "100%",
                height: "96%",
                backgroundColor: colors.primary,
                borderRadius: 20,
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
                Event info 2
              </Text>
              <Text style={[styles.text, {
                fontSize: 20,
                fontFamily: font.medium
              }]}>
                onde, siccome suole, ornare ella si appresta dimani, al dì di
                festa, il petto e il crine.
              </Text>
              <TouchableOpacity
                title="Gioca"
                onPress={() => {
                  auth.currentUser
                    ? navigation.navigate("EventBooking", {
                      eventID: route.params.eventID,
                    })
                    : navigation.navigate("Login");
                }}
                style={{
                  position: "absolute",
                  bottom: 20,
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
          </View> */}
        </View>
        {/* <PageIndicator
          style={styles.pageIndicator}
          count={pages.length}
          animatedCurrent={Animated.divide(scrollX, width)}
        /> */}
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
    fontSize: 45,
    color: "#ededed",
    fontFamily: font.bold
  },
  root: {
    flex: 1,
    backgroundColor: colors.bg
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
