import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { colors } from "../shared/colors";

export const Footer = ({ eventID }) => {
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("GameRules", {
              screen: "inside",
              eventID: eventID,
            });
          }}
          style={{
            top: -15,
            alignItems: "center",
            justifyContent: "center",
            height: 70,
            width: 70,
            borderRadius: 35,
            backgroundColor: colors.primary,
            borderWidth: 3,
            borderColor: colors.secondary,
          }}
        >
          <View>
            <Image
              source={require("../assets/trophyY.png")}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                tintColor: colors.secondary,
              }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            top: -35,
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: colors.primary,
            borderWidth: 3,
            borderColor: colors.secondary,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => navigation.navigate("Qr")}
        >
          <Image
            style={{ width: "50%", height: "50%", tintColor: colors.secondary }}
            source={require("../assets/qr.png")}
            resizeMode="contain"
          />
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => {
            navigation.navigate('Quiz');
          }}
          style={{
            top: -30,
            alignItems: 'center',
            justifyContent: 'center',
            height: 90,
            width: 90,
            borderRadius: 45,
            backgroundColor: colors.secondary,
            borderWidth: 4,
            borderColor: colors.primary,
          }}
        >
          <View>
            <Image
              source={require('../assets/question_mark.png')}
              resizeMode="contain"
              style={{
                width: 60,
                height: 60,
                tintColor: 'black',
              }}
            />
          </View>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("TeamInfo", {
              eventID: eventID,
            });
          }}
          style={{
            top: -15,
            alignItems: "center",
            justifyContent: "center",
            height: 70,
            width: 70,
            borderRadius: 35,
            backgroundColor: colors.primary,
            borderWidth: 3,
            borderColor: colors.secondary,
          }}
        >
          <View>
            <Image
              source={require("../assets/teamIcon.png")}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                tintColor: colors.secondary,
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    height: 58,
    width: "100%",
    borderTopColor: colors.secondary,
    borderBottomColor: colors.primary,
    borderLeftColor: colors.primary,
    borderRightColor: colors.primary,
    borderWidth: 3,
  },
  text: {
    color: colors.secondary,
    fontSize: 20,
    fontWeight: "800",
    marginHorizontal: 5,
  },
});
