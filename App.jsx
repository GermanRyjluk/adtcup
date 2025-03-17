// import "expo-dev-client";
import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  PermissionsAndroid,
  Alert,
  Platform,
} from "react-native";
import { colors } from "./shared/colors";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthNavigator from "./navigation/authNavigator";
import * as Font from "expo-font";
import Loading from "./components/loading";

// Redux
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";

import messaging from "@react-native-firebase/messaging";

// Register background handler
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log("Message handled in the background!", remoteMessage);
});

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  // Funzione per richiedere i permessi per le notifiche
  const requestUserPermission = async () => {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log("Authorization status:", authStatus);
        return true;
      } else {
        console.log("Notification permission not granted");
        return false;
      }
    } catch (error) {
      console.error("Errore nella richiesta dei permessi:", error);
      return false;
    }
  };

  // Richiesta di permesso per le notifiche su Android
  useEffect(() => {
    if (Platform.OS === "android") {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
    }
  }, []);

  // Inizializza la messaggistica FCM
  useEffect(() => {
    const initMessaging = async () => {
      const permissionGranted = await requestUserPermission();
      if (permissionGranted) {
        const token = await messaging().getToken();
        console.log("FCM Token:", token);
      }
      // Controlla se l'app è stata aperta da una notifica in stato "quit"
      messaging()
        .getInitialNotification()
        .then((remoteMessage) => {
          if (remoteMessage) {
            console.log(
              "Notification opened app from quit state:",
              remoteMessage.notification
            );
          }
        });

      // Ascolta le notifiche quando l'app è in primo piano
      const unsubscribe = messaging().onMessage(async (remoteMessage) => {
        Alert.alert("Nuovo messaggio FCM!", JSON.stringify(remoteMessage));
      });
      return unsubscribe;
    };

    const unsubscribeMessaging = initMessaging();
    return () => {
      if (unsubscribeMessaging && typeof unsubscribeMessaging === "function") {
        unsubscribeMessaging();
      }
    };
  }, []);

  const getFonts = async () => {
    return Font.loadAsync({
      "cherry-regular": require("./assets/fonts/CherryBomb.ttf"),
      "m-3": require("./assets/fonts/Montserrat-Light.ttf"),
      "m-5": require("./assets/fonts/Montserrat-Medium.ttf"),
      "m-7": require("./assets/fonts/Montserrat-Bold.ttf"),
    });
  };

  useEffect(() => {
    if (Platform.OS === "ios") {
      messaging()
        .subscribeToTopic("all_ios")
        .then(() => console.log('Iscritto al topic "all_ios"'));
    }
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
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
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
