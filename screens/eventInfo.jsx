import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Button,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { colors } from '../shared/colors';
import { auth } from '../firebase/firebase';

export default function EventInfo({ navigation }) {
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
        <TouchableOpacity
          title="Gioca"
          onPress={() => {
            auth.currentUser
              ? navigation.navigate('Quiz', { quiz: '' })
              : navigation.navigate('Login');
          }}
          style={{
            height: 100,
            width: 200,
            backgroundColor: colors.secondary,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 100,
            borderRadius: 15,
          }}
        >
          <Text
            style={{ color: colors.primary, fontSize: 40, fontWeight: '800' }}
          >
            Gioca
          </Text>
        </TouchableOpacity>
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
