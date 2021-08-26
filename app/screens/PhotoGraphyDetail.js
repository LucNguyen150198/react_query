import React, { useRef } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { UserCard, MasonryList, Back } from '@components';
import { travelSpec, dimensions } from '@themes';
import { SharedElement } from 'react-navigation-shared-element';
import * as Animatable from 'react-native-animatable';
const { SPACING } = travelSpec;
const { width, height } = dimensions;

export const PhotoGraphyDetail = ({ navigation, route }) => {
  const { item } = route.params;

  const back = () => {
    navigation.goBack();
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FFF',
      }}
    >
      <SharedElement
        id={`item.${item.id}.image`}
        style={StyleSheet.absoluteFillObject}
      >
        <Image
          source={{ uri: item.src.large2x }}
          style={[
            StyleSheet.absoluteFillObject,
            {
              height: height / 2,
            },
          ]}
          resizeMode="cover"
        />
      </SharedElement>

      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          paddingTop: height / 2 - 100,
        }}
      >
        <SharedElement id={`item.${item.id}.userCard`}>
          <UserCard user={item?.user} />
        </SharedElement>
        <Animatable.View
          useNativeDriver
          animation="fadeInUp"
          duration={800}
          delay={200}
        >
          <MasonryList />
        </Animatable.View>
      </ScrollView>
      <Back onPress={back} backgroundColor="#FFF" />
    </View>
  );
};

PhotoGraphyDetail.sharedElements = (route) => {
  const { item } = route.params;
  return [
    {
      id: `item.${item.id}.image`,
    },
    {
      id: `item.${item.id}.userCard`,
    },
  ];
};

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    bottom: 120,
    alignSelf: 'center',
  },
  itemDetail: {
    position: 'absolute',
    top: SPACING * 4,
    alignSelf: 'center',
    width: width * 0.84,
    backgroundColor: 'red',
  },
});
