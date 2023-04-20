import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Button,
} from 'react-native';
import React from 'react';
import { colors } from '../shared/colors';

export default function Welcome({ navigation }) {
  const { width, height } = Dimensions.get('window');

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.primary }}
      contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
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
        <Text style={styles.text}>Welcome 1</Text>
      </View>
      <View
        style={{
          width,
          height,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={styles.text}>Welcome 2</Text>
        <Button
          title="Continue"
          onPress={() => {
            navigation.navigate('HomeDrawer');
          }}
        />
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
