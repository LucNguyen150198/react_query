import React from 'react';
import { Easing } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import TabNavigation from './TabNavigation';
import {
  UserDetail,
  UserForm,
  TravelDetail,
  PeopleDetail,
  PhotoGraphyDetail,
  HeadPhoneDetail,
  FoodDetail,
} from '@screens';
enableScreens();
const Stack = createSharedElementStackNavigator();
const RootNavigation = () => {
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
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'TabNavigation'} headerMode="none">
        <Stack.Screen component={TabNavigation} name="TabNavigation" />
        <Stack.Screen
          component={UserDetail}
          name="UserDetail"
          options={options}
        />
        <Stack.Screen component={UserForm} name="UserForm" />
        <Stack.Screen component={PeopleDetail} name="PeopleDetail" />
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
