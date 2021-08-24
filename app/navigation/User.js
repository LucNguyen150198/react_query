import React from 'react';

import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { UserList, UserDetail, UserForm } from '@components';
const Stack = createSharedElementStackNavigator();
const UserStack = () => {
  return (
    <Stack.Navigator initialRouteName={'UserList'} headerMode="none">
      <Stack.Screen component={UserList} name="UserList" />
      <Stack.Screen component={UserDetail} name="UserDetail" />
      <Stack.Screen component={UserForm} name="UserForm" />
    </Stack.Navigator>
  );
};

export default UserStack;
