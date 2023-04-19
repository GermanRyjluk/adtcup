import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { colors } from '../shared/colors';

import Icon from 'react-native-vector-icons/Octicons'; //Gear (gear) and Hamburger(three-bars)
import Icon1 from 'react-native-vector-icons/FontAwesome5'; //Trophy (trophy)

export const Header = () => {
  const navigation = useNavigation();
  const openDrawer = () => {
    navigation.openDrawer();
  };
  const closeDrawer = () => {
    navigation.closeDrawer();
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity>
          <Icon name="gear" size={25} color={colors.secondary} />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}
        >
          <Text style={styles.text}>ADT</Text>
          <Icon1 name="trophy" size={25} color={colors.secondary} />
          <Text style={styles.text}>CUP</Text>
        </View>
        <TouchableOpacity onPress={() => openDrawer()}>
          <Icon name="three-bars" size={25} color={colors.secondary} />
        </TouchableOpacity>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 58,
    width: '100%',
    borderColor: 'black',
    borderBottomWidth: 3,
  },
  text: {
    color: colors.secondary,
    fontSize: 20,
    fontWeight: '800',
    marginHorizontal: 5,
  },
});
