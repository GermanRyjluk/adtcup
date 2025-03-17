import React from 'react'
import { updateProfile } from "firebase/auth";
import { auth } from "firebase/auth";
import { useState } from "react";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { loginAccount } from "../store/authSlice";

export default updateProfile = async (name, email) => {
    console.log(name, email);
    dispatch = useDispatch();
    const [password, setPassword] = useState(null)
    Alert.alert("Inserire password per proseguire: ")
    Alert.prompt(
        'Conferma identità',
        'Inserire password per proseguire: ',
        [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'OK',
                onPress: (value) => {
                    setPassword(value);
                },
            },
        ],
        'secure-text',
        "Password",
    );
    if (password != '') {
        try {
            await dispatch(loginAccount({ email, password }));
            await updateProfile(auth.currentUser, {
                displayName: name,
            });
            return true;
        } catch (e) {
            console.error(e);
            return fasle;
        }
    } else {
        Alert.alert("Errore", "Password non inserita");
        return false;
    }
}