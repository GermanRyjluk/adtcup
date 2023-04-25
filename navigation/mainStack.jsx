import { View, Text } from 'react-native';
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Welcome from '../screens/welcome';
import HomeDrawer from './homeDrawer';
import Intro from '../screens/intro';
import Login from '../screens/login';
import Register from '../screens/register';
import EventInfo from '../screens/eventInfo';
import EventStatus from '../screens/eventStatus';
import OnGameTabs from './onGameTabs';
import QrReader from '../screens/qrReader';

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Welcome"
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="HomeDrawer" component={HomeDrawer} />
      <Stack.Screen name="Intro" component={Intro} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="EventInfo" component={EventInfo} />
      <Stack.Screen name="EventStatus" component={EventStatus} />
      <Stack.Screen name="OnGameTabs" component={OnGameTabs} />
      <Stack.Screen name="Qr" component={QrReader} />
    </Stack.Navigator>
  );
}
