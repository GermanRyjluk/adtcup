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

import { Home } from './screens/home.jsx';
import { Login } from './screens/login';
import { Register } from './screens/register';

export default function App() {
  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.bg,
          // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        }}
      >
        <Home />
      </SafeAreaView>
      <StatusBar backgroundColor={colors.primary} />
    </>
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
