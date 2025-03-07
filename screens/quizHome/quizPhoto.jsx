import React, { memo } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  RefreshControl,
} from "react-native";
import { Header } from "@//components/header";
import BottomActionBar from "@//components/BottomActionBar";
import { Footer } from "@//components/footer";
import { colors } from "@//shared/colors";
import { font } from "@//shared/fonts";

const QuizPhoto = ({
  navigation,
  eventID,
  quizData,
  userTeam,
  scoreboardPublic,
  refreshing,
  handleRefresh,
}) => (
  <>
    <Header screen={"OnGame"} />
    <ScrollView
      style={styles.quizPhotoContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <View style={styles.quizCardPhoto}>
        <Image source={{ uri: quizData.photo }} style={styles.quizPhoto} />
        <View style={styles.photoFooter}>
          <Text style={styles.quizNumberText}>{quizData.number}/??</Text>
        </View>
      </View>
      <BottomActionBar
        navigation={navigation}
        eventID={eventID}
        userTeam={userTeam}
        scoreboardPublic={scoreboardPublic}
      />
    </ScrollView>
    <Footer eventID={eventID} />
  </>
);

const styles = StyleSheet.create({
  quizPhotoContainer: {
    padding: 20,
    flex: 1,
    backgroundColor: colors.bg,
  },
  quizCardPhoto: {
    width: "100%",
    height: 450,
    backgroundColor: colors.primary,
    borderRadius: 20,
    overflow: "hidden",
  },
  quizPhoto: {
    width: "100%",
    height: "85%",
  },
  photoFooter: {
    width: "100%",
    height: "15%",
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
  },
  quizNumberText: {
    fontSize: 20,
    fontFamily: font.medium,
    color: "white",
  },
});

export default memo(QuizPhoto);
