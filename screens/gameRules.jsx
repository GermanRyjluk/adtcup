import { View, Text } from 'react-native';
import React from 'react';
import { Header } from '../components/header';
import { colors } from '../shared/colors';
import { QrButton } from '../components/qrButton';

export default function GameRules({ navigation }) {
  return (
    <>
      <Header />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.bg,
          height: '100%',
          padding: 30,
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: '800',
            position: 'absolute',
            top: 30,
          }}
        >
          GameRules
        </Text>
        <Text style={{ fontSize: 20, fontWeight: '500', marginVertical: 5 }}>
          1- Non farti le pippe
        </Text>
        <Text style={{ fontSize: 20, fontWeight: '500', marginVertical: 5 }}>
          2- Non fare farti le pippe
        </Text>
        <Text style={{ fontSize: 20, fontWeight: '500', marginVertical: 5 }}>
          3- Non farti le pippe
        </Text>
        <Text style={{ fontSize: 20, fontWeight: '500', marginVertical: 5 }}>
          4- Non fare farti le pippe
        </Text>
        <Text style={{ fontSize: 20, fontWeight: '500', marginVertical: 5 }}>
          5- Non farti le pippe
        </Text>
        <Text style={{ fontSize: 20, fontWeight: '500', marginVertical: 5 }}>
          6- Non farti le pippe
        </Text>
        <Text style={{ fontSize: 20, fontWeight: '500', marginVertical: 5 }}>
          7- Non fare farti le pippe
        </Text>
        <View style={{ position: 'absolute', bottom: 100, right: 15 }}>
          <QrButton />
        </View>
      </View>
    </>
  );
}
