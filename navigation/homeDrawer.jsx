import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../screens/home";
import Settings from "../screens/settings";
import CustomDrawer from "../components/customDrawer";
import OnGameTabs from "./onGameTabs";

import { colors } from "../shared/colors";
import Login from "../screens/login";
import Register from "../screens/register";
import QuizHome from "../screens/quizHome";

const Drawer = createDrawerNavigator();

export default function HomeDrawer() {
  return (
    <Drawer.Navigator
      useLegacyImplementation={true}
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerPosition: "right",
        drawerActiveBackgroundColor: colors.primary,
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#333",
        drawerLabelStyle: {
          // fontFamily: 'Roboto-Medium',
          fontSize: 15,
        },
      }}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="Login" component={Login} />
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
