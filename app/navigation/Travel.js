import React from 'react';

import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { TravelList, TravelDetail } from '@components';
import { Easing } from 'react-native-reanimated';
export const iosTransitionSpec = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 10,
    restSpeedThreshold: 10,
  },
};
const Stack = createSharedElementStackNavigator();
const TravelStack = () => {
  return (
    <Stack.Navigator initialRouteName={'TravelList'} headerMode="none" screenOptions={{
      useNativeDriver: true,
    }}>
      <Stack.Screen component={TravelList} name="TravelList" />
      <Stack.Screen
        component={TravelDetail}
        name="TravelDetail"
        options={{
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
        }}
      />
    </Stack.Navigator>
  );
};

export default TravelStack;
