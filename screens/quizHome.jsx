import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { Header } from '../components/header';
import { colors } from '../shared/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { QrButton } from '../components/qrButton';

export default function QuizHome() {
  return (
    <>
      <Header />
      <View
        style={{
          height: '100%',
          backgroundColor: colors.bg,
          padding: 30,
        }}
      >
        <Text style={{ fontSize: 30, fontWeight: '800', marginBottom: 20 }}>
          1/??
        </Text>
        <View>
          <Image
            source={require('../assets/langian.png')}
            resizeMode="contain"
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 20,
              borderRadius: 10,
              marginBottom: 20,
            }}
          />
          <TouchableOpacity
            style={{
              backgroundColor: '#d9d9d9',
              height: 100,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 20,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: '500' }}>
              Informazione sull'indovinello 1 che va avanti fino a quando non
              diventa troppo lungo...
            </Text>
          </TouchableOpacity>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 4,
                borderRadius: 10,
                backgroundColor: 'lime',
                marginTop: 30,
                width: '60%',
              }}
            >
              <Text
                style={{
                  fontSize: 60,
                  fontWeight: '800',
                }}
              >
                60:00
              </Text>
            </View>
          </View>
        </View>
        <View style={{ position: 'absolute', bottom: 100, right: 15 }}>
          <QrButton />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
