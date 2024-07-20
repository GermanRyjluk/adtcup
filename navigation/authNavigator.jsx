import React, { useState, useEffect } from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import NotLoggedInDrawer, { LoggedInDrawer } from "./homeDrawer";

import { useSelector } from "react-redux";

const Drawer = createDrawerNavigator();

export default function AuthNavigator() {
  const authStatus = useSelector((state) => state.auth.auth);
  return <>{authStatus ? <LoggedInDrawer /> : <NotLoggedInDrawer />}</>;
}
