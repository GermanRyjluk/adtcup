import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
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
import { signOut, updateProfile } from "firebase/auth";
import { font } from "../shared/fonts";

const CustomDrawer = (props) => {
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(auth.currentUser?.name);

  const updateCurrentUserName = async (name) => {
    if (auth.currentUser.displayName != name) {
      console.log(name);
      updateProfile(auth.currentUser, {
        displayName: name,
      });
      setNewName(name);
      setEditing(false);
      Alert.alert("Nome cambiato con successo", "il nome " + newName + " verrà applicato al riavvio dell'app");
    } else {
      setEditing(false);
      Alert.alert("Nome non cambiato", "il nome " + newName + " è uguale al precedente");
    }
  }

  // useEffect(() => {
  //   const updateCurrentUserName = async (name) => {
  //     if (auth.currentUser.displayName != name) {
  //       console.log(name);
  //       updateProfile(auth.currentUser, {
  //         displayName: name,
  //       });
  //       setNewName(name);
  //       setEditing(false);
  //       Alert.alert("Nome cambiato con successo", "il nuovo nome verrà applicato al riavvio dell'app");
  //     }
  //   }

  // }, [newName, auth.currentUser.displayName]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
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
            {editing ? <TextInput
              style={{
                flex: 1,
                height: 40,
                marginRight: 10,
                borderRadius: 10,
                backgroundColor: "rgba(210, 210, 210, 0.2)",
                paddingHorizontal: 15,
                paddingVertical: 10,
                color: "#fff",
                fontSize: 18,
                fontFamily: font.medium,
                marginBottom: 5,
              }}
              onSubmitEditing={() => { updateCurrentUserName(newName); }}
              onChangeText={(text) => setNewName(text)}
            >
              {auth.currentUser.displayName}
            </TextInput> :

              <Text
                style={{
                  color: "#fff",
                  fontSize: 18,
                  fontFamily: font.medium,
                  marginBottom: 5,
                }}
              >
                {auth.currentUser ? auth.currentUser.displayName : "Anonimo"}
              </Text>
            }
            {auth.currentUser ? (
              !editing ?
                <TouchableOpacity onPress={() => setEditing(true)}>
                  <Ionicons name="ellipsis-vertical-circle-sharp" size={25} color="white" />
                </TouchableOpacity>
                : <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity onPress={() => updateCurrentUserName(newName)}>
                    <Ionicons name="checkmark-circle" size={25} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setEditing(false)}>
                    <Ionicons name="close-circle" size={25} color="white" />
                  </TouchableOpacity>
                </ View>
            ) : null}
          </View>
        </View>
        <View style={{ flex: 1, backgroundColor: colors.bg, paddingTop: 10 }}>
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
        <TouchableOpacity onPress={() => { }} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="share-social-outline" size={22} color={"#fff"} />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
                color: "white",
                marginLeft: 20,
                fontFamily: font.medium,
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
                fontFamily: font.medium,
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
