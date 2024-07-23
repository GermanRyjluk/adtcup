import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Header } from "../../components/header";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { colors } from "../../shared/colors";
import { TouchableOpacity } from "react-native-gesture-handler";

import Icon from "react-native-vector-icons/Ionicons";

import { useDispatch } from "react-redux";
import { setEventIDValue } from "../../store/eventIDSlice";

const Events = ({ navigation }) => {
  const dispatch = useDispatch();

  const [events, setEvents] = useState([]);
  const getEvents = useCallback(async () => {
    try {
      await getDocs(collection(db, "events")).then((snapshot) => {
        setEvents(snapshot.docs.map((doc) => doc));
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    getEvents();
  }, []);

  const handleLocked = async () => {};
  const handleVisible = async () => {};
  const handleDelete = async () => {};
  const handleSelect = async (id) => {
    dispatch(setEventIDValue(id));
    navigation.navigate("EventDashboard");
  };

  function convertTimestampToDate({ nanoseconds, seconds }) {
    // Convert seconds to milliseconds
    const millisecondsFromSeconds = seconds * 1000;
    // Convert nanoseconds to milliseconds
    const millisecondsFromNanoseconds = nanoseconds / 1000000;
    // Add the two values together to get the total milliseconds
    const totalMilliseconds =
      millisecondsFromSeconds + millisecondsFromNanoseconds;
    // Create a Date object using the total milliseconds
    const date = new Date(totalMilliseconds);
    return date;
  }

  const renderCard = () => {
    return events.map((doc, i) => {
      let dateFormatted = convertTimestampToDate(doc.data().startTime);
      return (
        <View
          key={i}
          style={{
            paddingVertical: 20,
            paddingHorizontal: 15,
            margin: 10,
            borderRadius: 10,
            backgroundColor: colors.primary,
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
              {doc.data().name}
            </Text>
            <Text style={{ color: colors.bg, fontSize: 12, fontWeight: "800" }}>
              {dateFormatted.getDate()}/{dateFormatted.getMonth() + 1}/
              {dateFormatted.getFullYear()}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
            }}
          >
            <TouchableOpacity onPress={() => handleLocked()}>
              {doc.data().isLocked ? (
                <Icon name="lock-open" size={35} color="white" />
              ) : (
                <Icon name="lock-closed" size={35} color="white" />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleVisible()}>
              {doc.data().isVisible ? (
                <Icon
                  name="eye-off"
                  size={35}
                  color="white"
                  style={{ marginHorizontal: 10 }}
                />
              ) : (
                <Icon
                  name="eye"
                  size={35}
                  color="white"
                  style={{ marginHorizontal: 10 }}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete()}>
              <Icon name="trash" size={35} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSelect(doc.id)}>
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
    });
  };

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
      <ScrollView>{renderCard()}</ScrollView>
    </View>
  );
};

export default Events;
