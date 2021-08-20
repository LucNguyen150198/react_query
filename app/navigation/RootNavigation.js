import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { PeopleList, PeopleDetail, UserList, UserDetail,UserForm } from '@components';
const Stack = createSharedElementStackNavigator();
const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'UserList'} headerMode="none">
        <Stack.Screen component={PeopleList} name="PeopleList" />
        <Stack.Screen component={PeopleDetail} name="PeopleDetail" />
        <Stack.Screen component={UserList} name="UserList" />
        <Stack.Screen component={UserDetail} name="UserDetail" />
        <Stack.Screen component={UserForm} name="UserForm" />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
