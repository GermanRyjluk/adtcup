import React from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";

import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import { colors } from "../shared/colors";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";

const CustomDrawer = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: colors.primary }}
      >
        <View style={{ padding: 20, backgroundColor: colors.primary }}>
          <Image
            source={
              auth.currentUser
                ? {
                    uri: auth.currentUser.photoURL,
                  }
                : {
                    uri: "https://media.istockphoto.com/id/1130884625/vector/user-member-vector-icon-for-ui-user-interface-or-profile-face-avatar-app-in-circle-design.jpg?s=612x612&w=0&k=20&c=1ky-gNHiS2iyLsUPQkxAtPBWH1BZt0PKBB1WBtxQJRE=",
                  }
            }
            style={{
              height: 80,
              width: 80,
              borderRadius: 40,
              marginBottom: 10,
            }}
          />
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 18,
                //   fontFamily: 'Roboto-Medium',
                marginBottom: 5,
              }}
            >
              {auth.currentUser ? auth.currentUser.displayName : "Anonimo"}
            </Text>
            {auth.currentUser ? (
              <TouchableOpacity>
                <Ionicons name="construct-outline" size={22} color="white" />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
        <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View
        style={{
          padding: 20,
          borderTopWidth: 1,
          borderTopColor: "#ccc",
          backgroundColor: colors.primary,
        }}
      >
        <TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="share-social-outline" size={22} color={"#fff"} />
            <Text
              style={{
                fontSize: 15,
                // fontFamily: 'Roboto-Medium',
                marginLeft: 5,
                color: "white",
                marginLeft: 20,
              }}
            >
              Tell a Friend
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => auth.signOut()}
          style={{ paddingVertical: 15 }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="exit-outline" size={22} color={"#fff"} />
            <Text
              style={{
                fontSize: 15,
                // fontFamily: 'Roboto-Medium',
                marginLeft: 5,
                color: "white",
                marginLeft: 20,
              }}
            >
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
