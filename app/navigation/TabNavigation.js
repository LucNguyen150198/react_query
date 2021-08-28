import * as React from 'react';
import { StyleSheet, Animated, TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  TravelList,
  PhotoGraphyList,
  HeadPhoneList,
  FoodList,
  SalonList,
} from '@screens';
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
    key: 'photography',
    name: 'camera',
  },
  {
    key: 'headphone',
    name: 'headphones',
  },
  {
    key: 'salon',
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

        const opacityBehindIcon = progress.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [0, 0.2, 0],
          extrapolate: 'clamp',
        });

        const scaleBehindIcon = progress.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [0, 1, 0],
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
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Animated.View
              style={[
                styles.indicator,
                {
                  opacity: opacityBehindIcon,
                  transform: [{ scale: scaleBehindIcon }],
                },
              ]}
            />
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
      initialRouteName="SalonList"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'rgb(253,189,27)',
        tabBarInactiveTintColor: '#D8DCE3',
        tabBarStyle: styles.tabBarStyle,
      }}
      tabBar={(props) => <MyTabBar {...props} />}
    >
      <Tab.Screen
        name="FoodList"
        component={FoodList}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="TravelTab"
        component={TravelList}
        options={{
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="PhotoGraphyTab"
        component={PhotoGraphyList}
        options={{
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="HeadPhoneList"
        component={HeadPhoneList}
        options={{
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="SalonList"
        component={SalonList}
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
  indicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgb(253,189,27)',
    position: 'absolute',
  },
});
