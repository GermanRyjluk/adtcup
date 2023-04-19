import 'react-native-gesture-handler';
import React from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { colors } from './shared/colors';

import { NavigationContainer } from '@react-navigation/native';
import { Drawer } from './navigation/homeDrawer';

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.bg,
          // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        }}
      >
        <Drawer />
      </SafeAreaView>
      <StatusBar backgroundColor={colors.primary} />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
