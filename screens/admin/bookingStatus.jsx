import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { font } from '../../shared/fonts';

export default function BookingStatus({ route }) {
    const userID = route.params.userID;
    const [user, setUser] = useState()

    const searchBookingStatus = async () => {
        try {
            await getDoc(doc(db, "events", "1VgaAztg9yvbzRLuIjql", "bookings", userID)).then((snapshot) => {
                if (snapshot) {
                    setUser(snapshot.data())
                }
            })
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        searchBookingStatus()
    }, [])

    if (user) {
        return (
            <View style={[styles.card, { borderColor: user.status == 'playing' ? 'green' : 'red' }]}>
                <Text style={[styles.text, { color: user.status == 'playing' ? 'green' : 'red' }]}>{user.name}</Text>
                <Text style={[styles.text, { color: user.status == 'playing' ? 'green' : 'red', fontSize: 20 }]}>{user.status == 'playing' ? 'ADT player' : 'Non è in gioco'}</Text>
            </View>
        )
    } else {
        return (
            <View style={styles.card}>
                <ActivityIndicator />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 15,
    },
    text: {
        fontSize: 30,
        fontFamily: font.medium,
    },
})