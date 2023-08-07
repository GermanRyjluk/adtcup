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

import { useNavigation } from '@react-navigation/native';

const CustomDrawer = (props) => {
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(auth.currentUser?.name);

  const navigation = useNavigation();

  const updateCurrentUserName = async (name) => {
    if (auth.currentUser.displayName != name) {
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


  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{
        padding: 20, backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
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
            justifyContent: auth.currentUser ? "space-evenly" : "center",
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
            (auth.currentUser ?
              <Text
                style={{
                  color: "#fff",
                  fontSize: 18,
                  fontFamily: font.medium,
                }}
              >
                {auth.currentUser.displayName}
              </Text> : <TouchableOpacity style={{ backgroundColor: colors.secondary, paddingVertical: 10, paddingHorizontal: 15, width: 100, borderRadius: 10, alignItems: 'center' }} onPress={() => navigation.navigate("Login")}>
                <Text style={{ fontSize: 15, fontFamily: font.bold, color: colors.primary }}>Accedi</Text>
              </TouchableOpacity>)
          }
          {auth.currentUser ? (
            !editing ?
              <TouchableOpacity onPress={() => setEditing(true)} style={{ position: 'absolute', right: 10 }}>
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
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ marginTop: -50 }}
      >
        <View style={{ flex: 1, backgroundColor: colors.bg }}>
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
        {/* <TouchableOpacity onPress={() => { navigation.navigate("AdtTeam") }} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="people" size={22} color={"#fff"} />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
                color: "white",
                marginLeft: 20,
                fontFamily: font.medium,
              }}
            >
              Team ADT
            </Text>
          </View>
        </TouchableOpacity> */}
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
