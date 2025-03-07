import { View, Text } from "react-native";
import React, { useCallback, useEffect, useState } from "react";

import { createStackNavigator } from "@react-navigation/stack";

import Intro from "../screens/intro";
import Login from "../screens/login";
import Register from "../screens/register";
import EventInfo from "../screens/eventInfo";
import EventStatus from "../screens/eventStatus";
import QrReader from "../screens/qrReader";
import GameRules from "../screens/eventInfo";
import TeamInfo from "../screens/teamInfo";
import QuizHome from "../screens/quizHome/quizHome";
import GeolocationCheck from "../screens/geolocationCheck";
import Ticket from "../screens/ticket";
import EventBooking from "../screens/eventBooking";
import TermsAndConditions from "../screens/termsAndConditions";
import Hints from "../screens/hints";
import userScoreboard from "../screens/userScoreboard";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import Admin from "./adminStack";
import { Header } from "../components/header";
import Home from "../screens/home";
import EditTeamInfo from "../screens/editTeamInfo";
import PastEvents from "../screens/pastEvent";
import BonusMalus from "../screens/bonusMalus";

import { useDispatch, useSelector } from "react-redux";
import { logoutAccount } from "../store/authSlice";

const Stack = createStackNavigator();

export function LoggedInStack() {
  const [userData, setUserData] = useState(null);
  // console.log("Logged In");

  const auth = useSelector((state) => state.auth);

  // const dispatch = useDispatch();
  const getUser = useCallback(async () => {
    // dispatch(logoutAccount());
    try {
      await getDoc(doc(db, "users", auth.currentUser.uid)).then((snapshot) => {
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
    if (userData["420"] != undefined) {
      // console.log("Admin");
      return <Admin />;
    } else {
      // console.log("User");
      return (
        <>
          {/* <Header /> */}

          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="HomeDrawer"
          >
            <Stack.Screen name="HomeDrawer" component={Home} />
            <Stack.Screen name="Intro" component={Intro} />
            <Stack.Screen name="PastEvents" component={PastEvents} />
            <Stack.Screen name="EventInfo" component={EventInfo} />
            <Stack.Screen name="EventBooking" component={EventBooking} />
            <Stack.Screen
              name="TermsAndConditions"
              component={TermsAndConditions}
            />
            <Stack.Screen name="EventStatus" component={EventStatus} />
            <Stack.Screen name="Ticket" component={Ticket} />
            {/* <Stack.Screen
              name="GeolocationCheck"
              component={GeolocationCheck}
            /> */}
            <Stack.Screen name="Quiz" component={QuizHome} />
            <Stack.Screen name="Hint" component={Hints} />
            <Stack.Screen name="BonusMalus" component={BonusMalus} />
            <Stack.Screen name="userScoreboard" component={userScoreboard} />
            <Stack.Screen name="GameRules" component={GameRules} />
            <Stack.Screen name="TeamInfo" component={TeamInfo} />
            <Stack.Screen name="EditTeamInfo" component={EditTeamInfo} />
            <Stack.Screen name="Qr" component={QrReader} />
          </Stack.Navigator>
        </>
      );
    }
  }
}
export function NotLoggedInStack() {
  // console.log("Not Logged In");
  return (
    <>
      {/* <Header /> */}

      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeDrawer" component={Home} />
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="PastEvents" component={PastEvents} />
        <Stack.Screen name="EventInfo" component={EventInfo} />
        <Stack.Screen
          name="TermsAndConditions"
          component={TermsAndConditions}
        />
        {/* <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} /> */}
      </Stack.Navigator>
    </>
  );
}
