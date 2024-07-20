import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Header } from "../../components/header";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { colors } from "../../shared/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";

const Events = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const getEvents = useCallback(async () => {
    await getDocs(collection(db, "events/")).then((snapshot) => {
      setEvents(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);
  useEffect(() => {
    getEvents();
  }, []);

  return (
    <View style={{ backgroundColor: colors.bg, height: "100%" }}>
      <Header />
      <View style={{ backgroundColor: colors.primary }}>
        <TouchableOpacity
          style={{
            backgroundColor: colors.secondary,
            padding: 20,
            margin: 10,
            marginBottom: 20,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
          onPress={() => {
            navigation.navigate("NewEvent");
          }}
        >
          <Icon
            name="add-circle"
            size={35}
            color={colors.primary}
            style={{ marginRight: 10 }}
          />
          <Text
            style={{
              color: colors.primary,
              fontSize: 25,
              fontWeight: "800",
            }}
          >
            Crea evento
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {events.map((doc, i) => {
          return (
            <View
              style={{
                paddingVertical: 20,
                paddingHorizontal: 15,
                margin: 10,
                borderRadius: 10,
                backgroundColor: colors.primary,
                flexDirection: "row",
              }}
            >
              <View>
                <Text
                  style={{
                    color: "white",
                    fontSize: 20,
                    fontWeight: "800",
                    marginBottom: 5,
                  }}
                >
                  {doc.name}
                </Text>
                <Text
                  style={{ color: colors.bg, fontSize: 12, fontWeight: "800" }}
                >
                  {doc.date}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  position: "absolute",
                  right: 15,
                  top: "50%",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    if (doc.isLocked) {
                    } else {
                    }
                  }}
                >
                  {doc.isLocked ? (
                    <Icon
                      name="lock-open"
                      size={35}
                      color="white"
                      style={{ marginHorizontal: 10 }}
                    />
                  ) : (
                    <Icon
                      name="lock-closed"
                      size={35}
                      color="white"
                      style={{ marginHorizontal: 10 }}
                    />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    if (doc.isLocked) {
                    } else {
                    }
                  }}
                >
                  <Icon name="trash" size={35} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    if (doc.isLocked) {
                    } else {
                    }
                  }}
                >
                  <Icon
                    name="build"
                    size={35}
                    color="white"
                    style={{ marginHorizontal: 10 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Events;

const styles = StyleSheet.create({});
