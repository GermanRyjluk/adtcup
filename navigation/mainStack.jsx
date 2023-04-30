import { View, Text } from 'react-native';
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import HomeDrawer from './homeDrawer';
import Intro from '../screens/intro';
import Login from '../screens/login';
import Register from '../screens/register';
import EventInfo from '../screens/eventInfo';
import EventStatus from '../screens/eventStatus';
import QrReader from '../screens/qrReader';
import GameRules from '../screens/gameRules';
import TeamInfo from '../screens/teamInfo';
import QuizHome from '../screens/quizHome';

const Stack = createStackNavigator();

export function LoggedIn() {
  console.log('Logged In');
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Quiz"
    >
      <Stack.Screen name="HomeDrawer" component={HomeDrawer} />
      <Stack.Screen name="Intro" component={Intro} />
      {/* <Stack.Screen name="EventInfo" component={EventInfo} /> */}
      <Stack.Screen name="EventStatus" component={EventStatus} />
      <Stack.Screen name="Quiz" component={QuizHome} />
      <Stack.Screen name="GameRules" component={GameRules} />
      <Stack.Screen name="TeamInfo" component={TeamInfo} />
      <Stack.Screen name="Qr" component={QrReader} />
    </Stack.Navigator>
  );
}
export function NotLoggedIn() {
  console.log('Not Logged In');
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeDrawer" component={HomeDrawer} />
      <Stack.Screen name="Intro" component={Intro} />
      <Stack.Screen name="EventInfo" component={EventInfo} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      {/* <Stack.Screen name="EventStatus" component={EventStatus} />
      <Stack.Screen name="Quiz" component={QuizHome} />
      <Stack.Screen name="GameRules" component={GameRules} />
      <Stack.Screen name="TeamInfo" component={TeamInfo} />
      <Stack.Screen name="Qr" component={QrReader} /> */}
    </Stack.Navigator>
  );
}
