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
import { color } from "react-native-reanimated";
import { PageIndicator } from "react-native-page-indicator";

const pages = [{ text: "asd" }, { text: "123" }];

export default function EventInfo({ navigation, route }) {
  const { width, height } = Dimensions.get("window");
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
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
          <View
            style={{
              width: "100%",
              height: "95%",
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
              Event info 1
            </Text>
            <Text style={[styles.text, { fontSize: 20 }]}>
              La donzelletta vien dalla campagna, in sul calar del sole, col suo
              fascio dell’erba; e reca in mano un mazzolin di rose e di viole.
            </Text>
          </View>
        </View>
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
              height: "95%",
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
            <Text style={[styles.text, { fontSize: 20 }]}>
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
        </View>
      </Animated.ScrollView>
      <PageIndicator
        style={styles.pageIndicator}
        count={pages.length}
        animatedCurrent={Animated.divide(scrollX, width)}
      />
    </View>
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
    fontWeight: "800",
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
    bottom: 30,
    position: "absolute",
  },
});
