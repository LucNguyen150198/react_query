import React from 'react';
import { Easing } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import ReactQueryTutorial from './ReactQueryTutorial';
import AnimationTutorial from './AnimationTutorial';
enableScreens();
const Stack = createSharedElementStackNavigator();
const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'AnimationTutorial'} headerMode="none">
        <Stack.Screen component={AnimationTutorial} name="AnimationTutorial" />
        <Stack.Screen
          component={ReactQueryTutorial}
          name="ReactQueryTutorial"
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
