import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { colors } from '../../shared/colors'

export default function Dashboard({navigation}) {
  return (
    <View style={{backgroundColor: colors.primary, flex: 1}}>

    <View style={styles.container}>
      <View style={{ flexDirection: "row", marginBottom: 15, justifyContent:'space-between' }}>
        <TouchableOpacity style={[styles.box,{backgroundColor:colors.secondary}]} onPress={()=>navigation.navigate("Stats")}>
          <Text style={styles.text}>Statistiche</Text>
        </TouchableOpacity>
        <View style={{width: 10, height: 100}}/>
        <TouchableOpacity style={[styles.box,{backgroundColor:colors.bg}]} onPress={()=>navigation.navigate("Teams")}>
          <Text style={styles.text}>Squadre</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={[styles.box, { marginBottom: 15, width: "100%", backgroundColor: "#229D5B" }]} onPress={()=>navigation.navigate("Map")}>
        <Text style={styles.text}>Mappa</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.box, { marginBottom: 15, width: "100%", backgroundColor: "#A22FB5" }]} onPress={()=>navigation.navigate("Scoreboard")}>
          <Text style={styles.text}>Classifica</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: "row", justifyContent:'space-between' }}>
        <TouchableOpacity style={[styles.box,{backgroundColor: '#B52F2F'}]} onPress={()=>{
            Alert.alert(
                "Riavvia Gioco",
                "Tutti i giocatori potranno giocare, sei sicuro?",
                [
                    {
                      text: 'Si',
                      onPress: () => Alert.alert('Gioco riavviato'),
                      style: 'cancel',
                    },
                    {
                        text: 'Anulla',
                        onPress: () => null,
                        style: 'cancel',
                      },
                  ],
                  {
                    cancelable: true,
                  },
                [
    ],
    {
      cancelable: true,
      onDismiss: () =>
        Alert.alert(
          'This alert was dismissed by tapping outside of the alert dialog.',
        ),
    },)
            }}>
          <Text style={styles.text}>Restart game</Text>
        </TouchableOpacity>
        <View style={{width: 10, height: 100}}/>
        <TouchableOpacity style={[styles.box,{backgroundColor: 'grey'}]} onPress={()=>navigation.navigate("Settings")}>
          <Text style={styles.text}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({container: {
    flex: 1,
    margin: 15,
    borderRadius: 10,
    padding: 10,
  },
  box: {
    flex: 1,
    height: 100,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  text: {
    fontSize: 20, 
    fontWeight: '800'
  }})