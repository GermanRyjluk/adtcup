import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { colors } from '../shared/colors';

import Icon from 'react-native-vector-icons/Octicons'; //Gear (gear) and Hamburger(three-bars)
import Icon1 from 'react-native-vector-icons/FontAwesome5'; //Trophy (trophy)

export const Footer = () => {
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('GameRules');
          }}
          style={{
            top: -15,
            alignItems: 'center',
            justifyContent: 'center',
            height: 70,
            width: 70,
            borderRadius: 35,
            backgroundColor: colors.bg,
            borderWidth: 4,
            borderColor: colors.primary,
          }}
        >
          <View>
            <Image
              source={require('../assets/yellow_trophy.png')}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                tintColor: 'black',
              }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Quiz');
          }}
          style={{
            top: -30,
            alignItems: 'center',
            justifyContent: 'center',
            height: 90,
            width: 90,
            borderRadius: 45,
            backgroundColor: colors.secondary,
            borderWidth: 4,
            borderColor: colors.primary,
          }}
        >
          <View>
            <Image
              source={require('../assets/question_mark.png')}
              resizeMode="contain"
              style={{
                width: 60,
                height: 60,
                tintColor: 'black',
              }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('TeamInfo');
          }}
          style={{
            top: -15,
            alignItems: 'center',
            justifyContent: 'center',
            height: 70,
            width: 70,
            borderRadius: 35,
            backgroundColor: colors.bg,
            borderWidth: 4,
            borderColor: colors.primary,
          }}
        >
          <View>
            <Image
              source={require('../assets/teamIcon.png')}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                tintColor: colors.primary,
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 58,
    width: '100%',
  },
  text: {
    color: colors.secondary,
    fontSize: 20,
    fontWeight: '800',
    marginHorizontal: 5,
  },
});
