import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Events from "../screens/admin/events";
import NewEvent from "../screens/admin/newEvent";
import EventDashboard from "../screens/admin/eventDashboard";
import Stats from "../screens/admin/stats";
import Teams from "../screens/admin/teams";
import TeamSettings from "../screens/admin/teamSettings";
import Bookings from "../screens/admin/bookings";
import Map from "../screens/admin/map";
import Scoreboard from "../screens/admin/scoreboard/scoreboard";
import Settings from "../screens/admin/settings";
import PlayerSettings from "../screens/admin/playerSettings";
import MapPlayers from "../screens/admin/mapPlayers";
import QrReader from "../screens/quizHome/qrReader";
import BookingStatus from "../screens/admin/bookingStatus";
import Quiz from "../screens/admin/quiz";
import QuizInfo from "../screens/admin/quizInfo";
import QuizEdit from "../screens/admin/quizEdit";

const Stack = createStackNavigator();

export default function Admin() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="EventDashboard" component={EventDashboard} />
      <Stack.Screen name="NewEvent" component={NewEvent} />
      <Stack.Screen name="Events" component={Events} />
      <Stack.Screen name="Stats" component={Stats} />
      <Stack.Screen name="Teams" component={Teams} />
      <Stack.Screen name="TeamSettings" component={TeamSettings} />
      <Stack.Screen name="Bookings" component={Bookings} />
      <Stack.Screen name="PlayerSettings" component={PlayerSettings} />
      <Stack.Screen name="Map" component={Map} />
      <Stack.Screen name="Quiz" component={Quiz} />
      <Stack.Screen name="QuizInfo" component={QuizInfo} />
      <Stack.Screen name="QuizEdit" component={QuizEdit} />
      <Stack.Screen name="MapPlayers" component={MapPlayers} />
      <Stack.Screen name="Scoreboard" component={Scoreboard} />
      <Stack.Screen name="QrReader" component={QrReader} />
      <Stack.Screen name="BookingStatus" component={BookingStatus} />
      <Stack.Screen name="AdminSettings" component={Settings} />
    </Stack.Navigator>
  );
}
