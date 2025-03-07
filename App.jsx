import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthNavigator from "./navigation/authNavigator";

import { colors } from "./shared/colors";
import * as Font from "expo-font";

import Loading from "./components/loading";

// Redux
import { Provider } from "react-redux";
import { store, persistor } from "./store"; // Assuming you have set up your Redux store
import { PersistGate } from "redux-persist/integration/react";

import registerNNPushToken from "native-notify";

export default function App() {
  registerNNPushToken(22645, "RLdbS1bBfc9vjKoy0FA8x1");
  const getFonts = async () => {
    return Font.loadAsync({
      "cherry-regular": require("./assets/fonts/CherryBomb.ttf"),
      "m-3": require("./assets/fonts/Montserrat-Light.ttf"),
      "m-5": require("./assets/fonts/Montserrat-Medium.ttf"),
      "m-7": require("./assets/fonts/Montserrat-Bold.ttf"),
    });
  };

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await getFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
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
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <SafeAreaView
              style={{
                flex: 1,
                backgroundColor: colors.primary,
              }}
            >
              <AuthNavigator />
            </SafeAreaView>
          </NavigationContainer>
        </PersistGate>
      </Provider>
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
