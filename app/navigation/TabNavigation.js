import * as React from 'react';
import {
  StyleSheet,
  Animated,
  TouchableOpacity,
  View,
  Easing,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import UserStack from './User';
import PeopleStack from './People';
import TravelStack from './Travel';
const IconTab = Animated.createAnimatedComponent(Icon);
const Tab = createBottomTabNavigator();

const ICONS = [
  {
    key: 'home',
    name: 'home',
  },
  {
    key: 'travel',
    name: 'map-marked',
  },
  {
    key: 'user',
    name: 'user-alt',
  },
];

function MyTabBar({ state, descriptors, navigation }) {
  const progress = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.tabBarStyle}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const isFocused = state.index === index;

        const isColor = isFocused
          ? options.tabBarActiveTintColor
          : options.tabBarInactiveTintColor;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          Animated.timing(progress, {
            toValue: index,
            duration: 250,
            useNativeDriver: true,
          }).start();

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const scale = progress.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [0.9, 1.1, 0.9],
          extrapolate: 'clamp',
        });

        const opacity = progress.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [0.8, 1, 0.8],
          extrapolate: 'clamp',
        });

        return (
          <TouchableOpacity
            key={index + ''}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={{ flex: 1, alignItems: 'center' }}
          >
            <IconTab
              name={ICONS[index].name}
              size={22}
              color={isColor}
              style={{
                transform: [{ scale }],
                opacity,
              }}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function TabNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="TravelStack"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'rgb(253,189,27)',
        tabBarInactiveTintColor: '#D8DCE3',
        tabBarStyle: styles.tabBarStyle,
      }}
      tabBar={(props) => <MyTabBar {...props} />}
    >
      <Tab.Screen
        name="UserStack"
        component={UserStack}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="TravelStack"
        component={TravelStack}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="PeopleStack"
        component={PeopleStack}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#FFF',
    position: 'absolute',
    bottom: 25,
    borderRadius: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 35,
    height: 70,
    width: '90%',
  },
  icon: {
    // position: 'absolute',
    // top: '50%',
  },
});
