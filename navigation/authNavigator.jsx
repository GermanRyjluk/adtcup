import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';

import { auth } from '../firebase/firebase';
import { LoggedIn, NotLoggedIn } from './mainStack';

export default function AuthNavigator() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = () => {
      auth.onAuthStateChanged((user) => {
        setUser(user);
        // console.log(user);
      });
    };
    return checkUser();
  }, []);

  return <>{user ? <LoggedIn /> : <NotLoggedIn />}</>;
}
