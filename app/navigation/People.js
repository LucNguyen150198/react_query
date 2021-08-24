import React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { PeopleList, PeopleDetail } from '@components';
const Stack = createSharedElementStackNavigator();
const PeopleStack = () => {
  return (
    <Stack.Navigator initialRouteName={'PeopleList'} headerMode="none">
      <Stack.Screen component={PeopleList} name="PeopleList" />
      <Stack.Screen component={PeopleDetail} name="PeopleDetail" />
    </Stack.Navigator>
  );
};

export default PeopleStack;
