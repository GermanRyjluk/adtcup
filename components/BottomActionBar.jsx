import React, { memo } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { colors } from "../shared/colors";
import { font } from "../shared/fonts";

const BottomActionBar = ({
  navigation,
  eventID,
  userTeam,
  scoreboardPublic,
}) => (
  <View style={styles.bottomBar}>
    <TouchableOpacity
      style={styles.bottomButton}
      onPress={() => navigation.navigate("Hint", { eventID, userTeam })}
    >
      <Text style={styles.bottomButtonText}>Indizi</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.bottomButton}
      onPress={() =>
        scoreboardPublic
          ? navigation.navigate("userScoreboard", { eventID })
          : Alert.alert(
              "Classifica non disponibile",
              "In questa fase della gara non è possibile vedere la classifica"
            )
      }
    >
      <Icon name="leaderboard" size={55} color={colors.secondary} />
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.bottomButton}
      onPress={() => navigation.navigate("BonusMalus", { eventID, userTeam })}
    >
      <Text style={styles.bottomButtonText}>{"Bonus\nMalus"}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  bottomBar: {
    width: "100%",
    height: 80,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bottomButton: {
    height: "100%",
    paddingHorizontal: 15,
    backgroundColor: colors.primary,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomButtonText: {
    fontSize: 25,
    fontFamily: font.bold,
    color: colors.secondary,
    textAlign: "center",
  },
});

export default memo(BottomActionBar);
