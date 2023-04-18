import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { colors } from '../shared/colors';

import { Header } from '../components/header';

import Icon1 from 'react-native-vector-icons/FontAwesome5'; //Trophy (trophy)

export const Home = () => {
  return (
    <>
      <Header />
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
};
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  textBox: {
    position: 'absolute',
    left: 140,
  },
});
