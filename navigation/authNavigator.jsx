import React, { useState, useEffect } from "react";

import { auth } from "../firebase/firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoggedIn, NotLoggedIn } from "./mainStack";

import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "../components/customDrawer";
import { colors } from "../shared/colors";
import { Header } from "../components/header";
import NotLoggedInDrawer, { LoggedInDrawer } from "./homeDrawer";

import { useDispatch, useSelector } from 'react-redux';
import { logoutAccount } from "../store/authSlice";

const Drawer = createDrawerNavigator();

export default function AuthNavigator() {
  // const [user, setUser] = useState(null)

  // const user = useSelector(selectUser);
  // const dispatch = useDispatch();
  // dispatch(logoutAccount());

  // useEffect(() => {
  //   const checkUser = async () => {
  //     try {
  //       auth.onAuthStateChanged(auth, (userAuth) => {
  //         if (userAuth) {
  //           // user is logged in, send the user's details to redux, store the current user in the state
  //           dispatch(
  //             login({
  //               email: userAuth.email,
  //               uid: userAuth.uid,
  //               displayName: userAuth.displayName,
  //               photoUrl: userAuth.photoURL,
  //             })
  //           );
  //         } else {
  //           dispatch(logout());
  //         }
  //       });
  //     } catch (error) {
  //       console.error('Error retrieving user', error);
  //     }
  //   };

  //   checkUser();
  // }, [dispatch]);

  // useEffect(() => {

  const authStatus = useSelector(state => state.auth.auth)
  // console.log("authStatus: ", authStatus);

  //   const checkUser = () => {
  // auth.onAuthStateChanged((user) => {
  //   if (user) {
  //     // console.log("USER: " + user + " " + user?.email);
  //     setUser(user);
  //   }
  // });
  // auth.onAuthStateChanged((user) => {
  //   setUser(user);
  // });
  //   };
  //   return checkUser();
  // }, []);

  return <>{authStatus ? <LoggedInDrawer /> : <NotLoggedInDrawer />}</>;
}

