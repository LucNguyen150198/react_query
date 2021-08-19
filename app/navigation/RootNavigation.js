import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { PeopleList, PeopleDetail } from '@components';
const Stack = createSharedElementStackNavigator();
const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'PeopleList'} headerMode="none">
        <Stack.Screen component={PeopleList} name="PeopleList" />
        <Stack.Screen component={PeopleDetail} name="PeopleDetail" />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
