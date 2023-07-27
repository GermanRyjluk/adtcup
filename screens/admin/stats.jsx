import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Header } from '../../components/header'

export default function Stats() {
  return (
    <>
      <Header />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Prossimamente...</Text>
      </View>
    </>
  )
}

const styles = StyleSheet.create({})