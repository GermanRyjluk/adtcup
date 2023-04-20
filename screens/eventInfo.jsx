import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import React from 'react';
import { colors } from '../shared/colors';

export default function EventInfo() {
  const { width, height } = Dimensions.get('window');
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
      }}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      pagingEnabled={true}
    >
      <View
        style={{
          width,
          height,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={styles.text}>Event info 1</Text>
      </View>
      <View
        style={{
          width,
          height,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={styles.text}>Event info 2</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 50,
    color: '#ededed',
    fontWeight: '800',
  },
});
