import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";

import { colors } from "./shared/colors";

import { NavigationContainer } from "@react-navigation/native";

import { SafeAreaProvider } from "react-native-safe-area-context";

import AuthNavigator from "./navigation/authNavigator";

import * as Font from "expo-font";
import Loading from "./components/loading";

export default function App() {
  const getFonts = () => {
    return Font.loadAsync({
      "cherry-regular": require("./assets/fonts/CherryBomb.ttf"),
      "m-3": require("./assets/fonts/Montserrat-Light.ttf"),
      "m-5": require("./assets/fonts/Montserrat-Medium.ttf"),
      "m-7": require("./assets/fonts/Montserrat-Bold.ttf"),
    });
  };

  // SplashScreen.preventAutoHideAsync();
  const [appIsReady, setAppIsReady] = useState(false);
  useEffect(() => {
    async function prepare() {
      try {
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
    return <Loading />;
  }
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor={colors.primary} />
      <NavigationContainer>
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
