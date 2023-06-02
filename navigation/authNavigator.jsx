import React, { useState, useEffect } from "react";

import { auth } from "../firebase/firebase";
import { LoggedIn, NotLoggedIn } from "./mainStack";

import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "../components/customDrawer";
import { colors } from "../shared/colors";
import { Header } from "../components/header";
import NotLoggedInDrawer, { LoggedInDrawer } from "./homeDrawer";

const Drawer = createDrawerNavigator();

export default function AuthNavigator() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = () => {
      auth.onAuthStateChanged((user) => {
        setUser(user);
      });
    };
    return checkUser();
  }, []);

  return <>{user ? <LoggedInDrawer /> : <NotLoggedInDrawer />}</>;
}

// return (
//   <Drawer.Navigator
//     useLegacyImplementation={true}
//     initialRouteName="Home"
//     drawerContent={(props) => <CustomDrawer {...props} />}
//     screenOptions={{
//       headerShown: false,
//       drawerPosition: "right",
//       drawerActiveBackgroundColor: colors.primary,
//       drawerActiveTintColor: "#fff",
//       drawerInactiveTintColor: "#333",
//       drawerLabelStyle: {
//         // fontFamily: 'Roboto-Medium',
//         fontSize: 15,
//       },
//     }}
//   >
//     {user ? (
//       <Drawer.Screen
//         name="LoggedIn"
//         component={LoggedIn}
//         options={{ header: () => <Header /> }}
//       />
//     ) : (
//       <Drawer.Screen
//         name="NotLoggedIn"
//         component={NotLoggedIn}
//         options={{ header: () => <Header /> }}
//       />
//     )}
//   </Drawer.Navigator>
// );

// options={{
//   drawerItemStyle: { height: 0 },
// }}
