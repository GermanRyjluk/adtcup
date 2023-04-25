import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export const QrButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.box}
      onPress={() => navigation.navigate('Qr')}
    >
      <Image
        style={{ width: '50%', height: '50%' }}
        source={require('../assets/qr.png')}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
