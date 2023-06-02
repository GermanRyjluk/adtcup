import { View, Text } from "react-native";
import React, { useCallback, useEffect, useState } from "react";

import { createStackNavigator } from "@react-navigation/stack";

import Intro from "../screens/intro";
import Login from "../screens/login";
import Register from "../screens/register";
import EventInfo from "../screens/eventInfo";
import EventStatus from "../screens/eventStatus";
import QrReader from "../screens/qrReader";
import GameRules from "../screens/gameRules";
import TeamInfo from "../screens/teamInfo";
import QuizHome from "../screens/quizHome";
import GeolocationCheck from "../screens/geolocationCheck";
import Ticket from "../screens/ticket";
import EventBooking from "../screens/eventBooking";
import Hints from "../screens/hints";
import userScoreboard from "../screens/userScoreboard";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import Admin from "./adminStack";
import { Header } from "../components/header";
import Home from "../screens/home";

const Stack = createStackNavigator();

export function LoggedInStack() {
  const [userData, setUserData] = useState(null);
  console.log("Logged In");

  const getUser = useCallback(async () => {
    try {
      await getDoc(doc(db, "users", auth.currentUser?.uid)).then((snapshot) => {
        if (snapshot.exists()) {
          setUserData(snapshot.data());
        }
      });
    } catch (e) {
      console.error(e);
    }
  }, []);
  useEffect(() => {
    getUser();
  }, []);

  if (userData) {
    if (userData["420"]) {
      console.log("Admin");
      return <Admin />;
    } else if (userData["420"] == undefined) {
      console.log("User");
      return (
        <>
          <Header />

          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="HomeDrawer"
          >
            <Stack.Screen name="HomeDrawer" component={Home} />
            <Stack.Screen name="Intro" component={Intro} />
            <Stack.Screen name="EventInfo" component={EventInfo} />
            <Stack.Screen name="EventBooking" component={EventBooking} />
            <Stack.Screen name="EventStatus" component={EventStatus} />
            <Stack.Screen name="Ticket" component={Ticket} />
            <Stack.Screen
              name="GeolocationCheck"
              component={GeolocationCheck}
            />
            <Stack.Screen name="Quiz" component={QuizHome} />
            <Stack.Screen name="Hint" component={Hints} />
            <Stack.Screen name="userScoreboard" component={userScoreboard} />
            <Stack.Screen name="GameRules" component={GameRules} />
            <Stack.Screen name="TeamInfo" component={TeamInfo} />
            <Stack.Screen name="Qr" component={QrReader} />
          </Stack.Navigator>
        </>
      );
    }
  }
}
export function NotLoggedInStack() {
  console.log("Not Logged In");
  return (
    <>
      <Header />

      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeDrawer" component={Home} />
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="EventInfo" component={EventInfo} />
        {/* <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} /> */}
      </Stack.Navigator>
    </>
  );
}
