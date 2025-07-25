import React, { memo } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
} from "react-native";
import { Header } from "@//components/header";
import BottomActionBar from "@//components/BottomActionBar";
import { Footer } from "@//components/footer";
import { colors } from "@//shared/colors";
import { font } from "@//shared/fonts";

const QuizMessage = ({
  navigation,
  eventID,
  quizData,
  userTeam,
  scoreboardPublic,
  refreshing,
  handleRefresh,
}) => (
  <View style={{ backgroundColor: colors.bg, flex: 1 }}>
    <Header screen={"OnGame"} />
    <ScrollView
      contentContainerStyle={styles.quizMessageContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <ScrollView style={styles.quizCardMessage}>
        <Text style={styles.quizTitle}>Indovinello</Text>
        {/* Nested scrollable container per il testo lungo */}
        <Text style={styles.quizMessage}>{quizData.message}</Text>

        <View style={styles.quizNumberContainerMessage}>
          <Text style={styles.quizNumberText}>{quizData.number}/??</Text>
        </View>
      </ScrollView>
      <BottomActionBar
        navigation={navigation}
        eventID={eventID}
        userTeam={userTeam}
        scoreboardPublic={scoreboardPublic}
      />
    </ScrollView>
    <Footer eventID={eventID} />
  </View>
);

const styles = StyleSheet.create({
  quizMessageContainer: {
    padding: 20,
    backgroundColor: colors.bg,
    flexGrow: 1,
  },
  quizCardMessage: {
    width: "100%",
    maxHeight: 450, // Limite massimo, ma la card si adatta se il testo è breve
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 20,
    marginBottom: 10,
  },
  cardTextContainer: {
    flex: 1,
  },
  quizTitle: {
    fontSize: 20,
    fontFamily: font.bold,
    color: colors.secondary,
    marginBottom: 20,
  },
  quizMessage: {
    fontSize: 20,
    fontFamily: font.medium,
    color: "white",
    marginBottom: 10,
  },
  quizNumberContainerMessage: {
    marginTop: 10,
    alignItems: "center",
  },
  quizNumberText: {
    fontSize: 20,
    fontFamily: font.medium,
    color: "white",
    marginBottom: 50,
  },
});

export default memo(QuizMessage);
