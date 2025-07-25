import React, { memo } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  RefreshControl,
} from "react-native";
import BottomActionBar from "@//components/BottomActionBar";
import { Header } from "@//components/header";
import { Footer } from "@//components/footer";
import { colors } from "@//shared/colors";
import { font } from "@//shared/fonts";

const QuizBoth = ({
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
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <ScrollView style={styles.quizCard}>
        {/* You can adjust the image height as needed */}
        <Image source={{ uri: quizData.photo }} style={styles.quizImage} />
        <View style={{ padding: 20, paddingBottom: 50 }}>
          <Text style={styles.quizTitle}>Indovinello</Text>
          <Text style={styles.quizMessage}>{quizData.message}</Text>
          <View style={styles.quizNumberContainer}>
            <Text style={styles.quizNumberText}>{quizData.number}/??</Text>
          </View>
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
  container: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: colors.bg,
  },
  quizCard: {
    width: "100%",
    maxHeight: 450,
    backgroundColor: colors.primary,
    borderRadius: 20,
    marginBottom: 10,
  },
  quizImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  quizTitle: {
    fontSize: 20,
    fontFamily: font.bold,
    color: colors.secondary,
    marginBottom: 10,
  },
  quizMessage: {
    fontSize: 20,
    fontFamily: font.medium,
    color: "white",
    marginBottom: 10,
  },
  quizNumberContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  quizNumberText: {
    fontSize: 20,
    fontFamily: font.medium,
    color: "white",
  },
});

export default memo(QuizBoth);
