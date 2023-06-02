import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../screens/home";
import Settings from "../screens/settings";
import CustomDrawer from "../components/customDrawer";
import OnGameTabs from "./onGameTabs";

import { colors } from "../shared/colors";
import Login from "../screens/login";
import Register from "../screens/register";
import { LoggedInStack, NotLoggedInStack } from "./mainStack";
import { Image, Text } from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";

const Drawer = createDrawerNavigator();

export function LoggedInDrawer() {
  return (
    <Drawer.Navigator
      useLegacyImplementation={true}
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerPosition: "right",
        drawerActiveBackgroundColor: colors.primary,
        drawerActiveTintColor: colors.secondary,
        drawerInactiveTintColor: "#333",
        drawerLabelStyle: {
          // fontFamily: 'Roboto-Medium',
          fontSize: 15,
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={LoggedInStack}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function NotLoggedInDrawer() {
  return (
    <Drawer.Navigator
      // useLegacyImplementation={true}
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerPosition: "right",
        drawerActiveBackgroundColor: colors.primary,
        drawerActiveTintColor: colors.secondary,
        drawerInactiveTintColor: "#333",
        drawerLabelStyle: {
          marginLeft: -20,
          // fontFamily: 'Roboto-Medium',
          fontSize: 15,
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={NotLoggedInStack}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Login"
        component={Login}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Register"
        component={Register}
        options={{
          drawerItemStyle: { height: 0 },
        }}
      />
    </Drawer.Navigator>
  );
}
