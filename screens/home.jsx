import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';

import { Header } from '../components/header';

import { colors } from '../shared/colors';

import Icon1 from 'react-native-vector-icons/FontAwesome5'; //Trophy (trophy)

const events = [
  { name: 'LANGIAN', photo: 'null', date: '23-8-2023', price: '€15' },
  { name: 'FOSSACESIA', photo: 'null', date: '25-8-2023', price: '€10' },
  { name: 'SANTVIT', photo: 'null', date: '24-8-2023', price: '€20' },
];
export default function Home({ navigation }) {
  return (
    <>
      <Header />

      <ScrollView style={{ flex: 1, padding: 30 }}>
        {events.map((data, i) => {
          return (
            <TouchableOpacity key={i}>
              <View style={styles.eventCard}>
                <Text style={styles.text}>{data.name}</Text>
                <View style={styles.eventButton}>
                  <Text style={[styles.text, { color: colors.primary }]}>
                    Gioca
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
        <View style={{ width: '100%', height: 90 }} />
      </ScrollView>
      <TouchableOpacity style={styles.infoBox}>
        <View style={styles.trophyBox}>
          <Icon1 name="trophy" size={50} color={colors.secondary} />
        </View>
        <View style={styles.textBox}>
          <Text style={styles.text}>Manuale ADT</Text>
        </View>
      </TouchableOpacity>
    </>
  );
}
const styles = StyleSheet.create({
  infoBox: {
    backgroundColor: colors.primary,
    position: 'absolute',
    bottom: 0,
    height: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderTopWidth: 3,
    borderTopColor: 'black',
  },
  text: {
    color: colors.secondary,
    fontSize: 30,
    fontWeight: '800',
    marginHorizontal: 5,
  },
  trophyBox: {
    position: 'absolute',
    top: -50,
    left: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: 'black',
    //Ios Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    //Android Shadow
    elevation: 24,
  },
  textBox: {
    position: 'absolute',
    left: 140,
  },
  eventCard: {
    width: '100%',
    height: 250,
    backgroundColor: colors.primary,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  eventButton: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: colors.primary,
    borderRadius: 15,
  },
});
