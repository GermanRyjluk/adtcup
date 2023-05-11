import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../shared/colors";
import {createStackNavigator} from '@react-navigation/stack';
import Dashboard from "../screens/admin/dashboard";
import Stats from "../screens/admin/stats";
import Teams from "../screens/admin/teams";
import Map from "../screens/admin/map";
import Scoreboard from "../screens/admin/scoreboard";
import Settings from "../screens/admin/settings";

const Stack = createStackNavigator();

export default function Admin() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Stats" component={Stats} />
      <Stack.Screen name="Teams" component={Teams} />
      <Stack.Screen name="Map" component={Map} />
      <Stack.Screen name="Scoreboard" component={Scoreboard} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}
