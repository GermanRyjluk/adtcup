import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import QuizHome from '../screens/quizHome';
import GameRules from '../screens/gameRules';
import TeamInfo from '../screens/teamInfo';
import { View, Image, TouchableOpacity } from 'react-native';
import { colors } from '../shared/colors';

const Tab = createBottomTabNavigator();
export default function MyTabs({ navigation }) {
  return (
    <Tab.Navigator
      initialRouteName="Quiz"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { height: 65, backgroundColor: colors.primary },
      }}
    >
      <Tab.Screen
        name="Rules"
        component={GameRules}
        options={{
          tabBarIcon: ({ focused }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Rules');
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
                borderColor: focused ? 'black' : colors.primary,
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
          ),
        }}
      />
      <Tab.Screen
        name="Quiz"
        component={QuizHome}
        options={{
          tabBarIcon: ({ focused }) => (
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
                borderColor: focused ? 'black' : colors.primary,
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
          ),
        }}
      />
      <Tab.Screen
        name="Team"
        component={TeamInfo}
        options={{
          tabBarIcon: ({ focused }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Team');
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
                borderColor: focused ? 'black' : colors.primary,
              }}
            >
              <View>
                <Image
                  source={require('../assets/teamIcon.png')}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: 'black',
                  }}
                />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
