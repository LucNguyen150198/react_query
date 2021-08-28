import React from 'react';
import { enableScreens } from 'react-native-screens';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import {
  UserDetail,
  UserForm,
  PeopleDetail,
  PeopleList,
  UserList,
} from '@screens';
enableScreens();
const Stack = createSharedElementStackNavigator();
const ReactQueryTutorial = () => {
  return (
    <Stack.Navigator initialRouteName={'UserList'} headerMode="none">
      <Stack.Screen component={UserList} name="UserList" />
      <Stack.Screen component={PeopleList} name="PeopleList" />
      <Stack.Screen component={UserDetail} name="UserDetail" />
      <Stack.Screen component={UserForm} name="UserForm" />
      <Stack.Screen component={PeopleDetail} name="PeopleDetail" />
    </Stack.Navigator>
  );
};

export default ReactQueryTutorial;
