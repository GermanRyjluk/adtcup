import { View, Text } from 'react-native';
import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/home';
import Login from '../screens/login';

const drawer = createDrawerNavigator();

export const Drawer = () => {
  return (
    <drawer.Navigator
      useLegacyImplementation={true}
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <drawer.Screen name="Home" component={Home} />
      <drawer.Screen name="Login" component={Login} />
    </drawer.Navigator>
  );
};
