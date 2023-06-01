import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
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
import Admin from "./navigation/adminStack";

import * as Font from "expo-font";

export default function App() {
  const getFonts = () => {
    return Font.loadAsync({
      "cherry-regular": require("./assets/fonts/CherryBomb.ttf"),
    });
  };

  const [appIsReady, setAppIsReady] = useState(false);
  useEffect(() => {
    async function prepare() {
      try {
        // SplashScreen.preventAutoHideAsync();
        await getFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        // SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!appIsReady) {
    return null;
  }
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
          <AuthNavigator />
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
