import React from 'react';
import { Easing } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import TabNavigation from './TabNavigation';
import {
  TravelDetail,
  PhotoGraphyDetail,
  HeadPhoneDetail,
  FoodDetail,
  SalonDetail,
} from '@screens';
enableScreens();
const Stack = createSharedElementStackNavigator();
const AnimationTutorial = () => {
  const options = {
    useNativeDriver: true,
    gestureEnabled: false,

    cardStyleInterpolator: ({ current: { progress } }) => ({
      cardStyle: {
        opacity: progress,
      },
    }),
    transitionSpec: {
      open: {
        animation: 'timing',
        config: {
          duration: 400,
          easing: Easing.inOut(Easing.ease),
        },
      },
      close: {
        animation: 'timing',
        config: {
          duration: 400,
          easing: Easing.inOut(Easing.ease),
        },
      },
    },
  };
  return (
    <Stack.Navigator initialRouteName={'TabNavigation'} headerMode="none">
      <Stack.Screen component={TabNavigation} name="TabNavigation" />
      <Stack.Screen
        component={TravelDetail}
        name={'TravelDetail'}
        options={options}
      />
      <Stack.Screen
        component={PhotoGraphyDetail}
        name={'PhotoGraphyDetail'}
        options={options}
      />

      <Stack.Screen
        component={HeadPhoneDetail}
        name={'HeadPhoneDetail'}
        options={options}
      />
      <Stack.Screen
        component={FoodDetail}
        name={'FoodDetail'}
        options={options}
      />

      <Stack.Screen
        component={SalonDetail}
        name={'SalonDetail'}
        options={options}
      />
    </Stack.Navigator>
  );
};

export default AnimationTutorial;
