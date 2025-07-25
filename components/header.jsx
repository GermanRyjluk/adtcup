import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { DrawerActions, useNavigation } from "@react-navigation/native";

import { colors } from "../shared/colors";

import Icon from "react-native-vector-icons/Octicons"; //Gear (gear) and Hamburger(three-bars)
import Icon1 from "react-native-vector-icons/FontAwesome5"; //Trophy (trophy)
import Ionicons from "react-native-vector-icons/Ionicons";

export const Header = ({ screen }) => {
  const navigation = useNavigation();
  const openDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };
  // const closeDrawer = () => {
  //   navigation.closeDrawer();
  // };

  return (
    <>
      <View style={styles.container}>
        {/* <TouchableOpacity>
          <Icon name="gear" size={25} color={colors.secondary} />
        </TouchableOpacity> */}
        {screen == "home" ? null : screen == "OnGame" ? (
          <TouchableOpacity
            style={{ position: "absolute", left: 30 }}
            onPress={() => navigation.navigate("HomeDrawer")}
          >
            <Ionicons name="home" size={30} color={colors.secondary} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{ position: "absolute", left: 30 }}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={40} color={colors.secondary} />
          </TouchableOpacity>
        )}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <Text style={styles.text}>ADT</Text>
          <Image
            source={require("../assets/icon-nobg.png")}
            style={{ height: 30, width: 30, top: 3 }}
            resizeMethod="auto"
          />
          {/* <Icon1 name="trophy" size={25} color={colors.secondary} /> */}
          <Text style={styles.text}>CUP</Text>
        </View>
        <TouchableOpacity
          style={{ position: "absolute", right: 30 }}
          onPress={() => openDrawer()}
        >
          <Icon name="three-bars" size={25} color={colors.secondary} />
        </TouchableOpacity>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    height: 58,
    width: "100%",
  },
  text: {
    color: colors.secondary,
    fontSize: 25,
    marginHorizontal: 5,
    fontFamily: "cherry-regular",
  },
});
