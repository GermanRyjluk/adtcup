import React, { memo, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  useWindowDimensions,
} from "react-native";
import { Header } from "@//components/header";
import { Footer } from "@//components/footer";
import { colors } from "@//shared/colors";
import { font } from "@//shared/fonts";
import { MapPin, Info, X } from "lucide-react-native";

const HEADER_HEIGHT = 80; // adjust to your Header's height
const DRAWER_HEIGHT = 180; // adjust to your custom Drawer height

const BarScreen = ({ navigation, eventID, barData }) => {
  const { height } = useWindowDimensions();
  // Calculate card height dynamically.
  const cardHeight = height - HEADER_HEIGHT - DRAWER_HEIGHT - 40; // 40 for extra padding

  // State to track whether additional info is visible.
  const [moreInfoVisible, setMoreInfoVisible] = useState(false);

  const handleAddFavorite = (link) => {
    // const query = encodeURIComponent(barData.place);
    // const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
    Linking.openURL(link);
  };

  const handleMoreInfo = () => {
    setMoreInfoVisible(true);
  };

  const handleCloseInfo = () => {
    setMoreInfoVisible(false);
  };

  return (
    <View style={styles.root}>
      <Header screen={"OnGame"} />
      <ScrollView contentContainerStyle={styles.barContainer}>
        <View style={[styles.barCard, { height: cardHeight }]}>
          <Image source={{ uri: barData.photo }} style={styles.barImage} />
          <View
            style={[
              styles.barOverlay,
              {
                backgroundColor: moreInfoVisible
                  ? "rgba(0, 0, 0, 0.85)"
                  : "rgba(0, 0, 0, 0.50)",
              },
            ]}
          />

          <View style={styles.barContent}>
            {!moreInfoVisible && (
              <>
                <Text style={styles.barTitle}>{barData.title}</Text>
                <Text style={styles.barPlace}>{barData.place}</Text>
                <Text style={styles.barOpeningTime}>
                  Apertura: {barData.openingTime}
                </Text>
                <TouchableOpacity
                  style={styles.favButton}
                  onPress={() => handleAddFavorite(barData.link)}
                >
                  <MapPin color={colors.primary} style={{ marginRight: 10 }} />
                  <Text style={styles.favButtonText}>Apri in Google Maps</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.moreInfoButton}
                  onPress={handleMoreInfo}
                >
                  <Info color={colors.primary} style={{ marginRight: 10 }} />
                  <Text style={styles.favButtonText}>Scopri di più</Text>
                </TouchableOpacity>
              </>
            )}
            {moreInfoVisible &&
              barData.subtitles.map((doc, index) => {
                return (
                  <>
                    <Text style={styles.moreInfoTitle}>{doc.title}</Text>
                    <Text style={styles.moreInfoText}>{doc.text}</Text>
                  </>
                );
              })}
            {moreInfoVisible && (
              <TouchableOpacity
                style={styles.closeInfoButton}
                onPress={handleCloseInfo}
              >
                <X color={"white"} style={{ marginRight: 10 }} />
                <Text style={styles.closeButtonText}>Esci</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
      <Footer eventID={eventID} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  barContainer: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: colors.bg,
  },
  barCard: {
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: colors.primary,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  barImage: {
    width: "100%",
    height: "100%",
  },
  barOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  barContent: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  barTitle: {
    fontSize: 32,
    fontFamily: font.bold,
    color: "white",
    marginBottom: 10,
  },
  barPlace: {
    fontSize: 20,
    fontFamily: font.medium,
    color: "white",
    marginBottom: 3,
  },
  barOpeningTime: {
    fontSize: 16,
    fontFamily: font.regular,
    color: "white",
    marginBottom: 15,
    marginTop: 5,
  },
  favButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignSelf: "center",
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10,
  },
  favButtonText: {
    fontSize: 18,
    fontFamily: font.bold,
    color: colors.primary,
  },
  moreInfoButton: {
    backgroundColor: colors.bg,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignSelf: "center",
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10,
  },
  moreInfoTitle: {
    fontSize: 24,
    fontFamily: font.bold,
    color: "white",
    paddingHorizontal: 10,
    marginTop: 10,
  },
  moreInfoText: {
    fontSize: 16,
    fontFamily: font.regular,
    color: "white",
    padding: 10,
  },
  closeInfoButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: "white",
    alignSelf: "center",
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 10,
  },
  closeButtonText: {
    fontSize: 18,
    fontFamily: font.bold,
    color: "white",
  },
});

export default memo(BarScreen);
