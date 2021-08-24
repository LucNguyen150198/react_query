import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import TabNavigation from './TabNavigation';
const Stack = createSharedElementStackNavigator();
const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'TabNavigation'} headerMode="none">
        <Stack.Screen component={TabNavigation} name="TabNavigation" />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
