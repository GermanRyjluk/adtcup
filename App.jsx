import "react-native-gesture-handler";
import React from "react";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";

import { colors } from "./shared/colors";

import { NavigationContainer } from "@react-navigation/native";

import { SafeAreaProvider } from "react-native-safe-area-context";

import Onboarding from "react-native-onboarding-swiper";
import { Header } from "./components/header";
import AuthNavigator from "./navigation/authNavigator";
import GeolocationCheck from "./screens/geolocationCheck";
import Admin from "./navigation/adminStack";

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar backgroundColor={colors.primary} />
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: colors.primary,
            // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
          }}
        >
          {/* <Header /> */}
          {/* <AuthNavigator /> */}
          <Admin />

          {/* <GeolocationCheck /> */}
        </SafeAreaView>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
-(
  {
    /* <Onboarding
      pages={[
        {
          backgroundColor: '#fff',
          image: <Image source={require('./assets/icon.png')} />,
          title: '1',
          subtitle: 'Done with React Native Onboarding Swiper',
        },
        {
          backgroundColor: '#fff',
          image: <Image source={require('./assets/icon.png')} />,
          title: '2',
          subtitle: 'Done with React Native Onboarding Swiper',
        },
        {
          backgroundColor: '#fff',
          image: <Image source={require('./assets/icon.png')} />,
          title: '3',
          subtitle: 'Done with React Native Onboarding Swiper',
        },
      ]}
      // onDone={<MainStack />}
    /> */
  }
);
