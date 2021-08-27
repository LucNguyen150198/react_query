import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import { dimensions, SPACING } from '@themes';
import Images from '@assets';

const { width, height } = dimensions;
const CIRCLE_SIZE = Math.sqrt(Math.pow(height, 2) + Math.pow(width, 2));
const LETTER_ANIMATION = {
  0: {
    opacity: 0,
    translateY: -42,
  },
  1: {
    opacity: 1,
    translateY: 0,
  },
};

const ANIMATION = {
  0: {
    translateX: width,
  },
  1: {
    translateX: 0,
  },
};

export const HeadPhoneDetail = ({ navigation, route }) => {
  const { item } = route.params;

  const back = () => {
    navigation.goBack();
  };

  const letters = item?.type?.split('');

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FFF',
      }}
    >
      <SharedElement id={`item.${item.key}.circle`} style={StyleSheet.absoluteFillObject}>
        <View
          style={[
            StyleSheet.absoluteFillObject,
            { justifyContent: 'center', alignItems: 'center' },
          ]}
        >
          <View style={[styles.circle, { backgroundColor: item.color }]} />
        </View>
      </SharedElement>

      <SharedElement id={`item.${item.key}.image`}>
        <Image style={styles.image} source={item.imageUri} />
      </SharedElement>

      <TouchableOpacity style={styles.close}>
        <Animatable.View animation={ANIMATION} delay={300} useNativeDriver>
          <Icon name="close" onPress={back} size={20} />
        </Animatable.View>
      </TouchableOpacity>

      <View style={styles.typeContainer}>
        <View style={{ flexDirection: 'row', overflow: 'hidden' }}>
          {letters.map((type, index) => {
            return (
              <Animatable.Text
                useNativeDriver
                animation={LETTER_ANIMATION}
                delay={300 + index * 50}
                key={index + ''}
                style={styles.type}
              >
                {type}
              </Animatable.Text>
            );
          })}
        </View>

        <View style={styles.colorContainer}>
          <Animatable.Text
            useNativeDriver
            animation={LETTER_ANIMATION}
            delay={350 + letters?.length * 50}
            style={[styles.colorText, { color: item.color }]}
          >
            {item.color}
          </Animatable.Text>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          padding: SPACING,
          alignItems: 'center',
        }}
      >
        <View style={styles.leftContainer}>
          <Animatable.View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              backgroundColor: '#FFF',
              padding: SPACING,
              marginRight: SPACING,
            }}
            useNativeDriver
            animation={ANIMATION}
            delay={300}
          >
            <Animatable.View useNativeDriver animation={ANIMATION} delay={400}>
              <Text adjustsFontSizeToFit numberOfLines={1} style={styles.title}>
                Advertising
              </Text>
              <Text adjustsFontSizeToFit numberOfLines={1} style={styles.title}>
                Market
              </Text>
            </Animatable.View>

            <Animatable.View
              useNativeDriver
              animation={ANIMATION}
              delay={500}
              style={styles.playVideo}
            >
              <Text style={styles.playVideoLabel}>Play video</Text>
              <Icon name={'play-circle'} size={20} />
            </Animatable.View>
          </Animatable.View>
        </View>
        <Animatable.View style={styles.rightContainer}>
          <Animatable.Image
            useNativeDriver
            animation={ANIMATION}
            delay={600}
            source={{ uri: Images.marketingImage }}
            style={StyleSheet.absoluteFillObject}
          />
        </Animatable.View>
      </View>
    </SafeAreaView>
  );
};

HeadPhoneDetail.sharedElements = (route) => {
  const { item } = route.params;
  return [
    {
      id: `item.${item.key}.image`,
    },
    {
      id: `item.${item.key}.circle`,
    },
  ];
};

const styles = StyleSheet.create({
  typeContainer: {
    position: 'absolute',
    top: SPACING * 4,
    left: SPACING,
  },
  type: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#444',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  playVideo: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  playVideoLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginRight: SPACING / 2,
  },

  colorContainer: {},

  colorText: {
    fontWeight: '800',
    fontSize: 20,
    textTransform: 'uppercase',
  },
  image: {
    width: width * 0.9,
    height: width * 0.9,
    resizeMode: 'contain',
    marginTop: 120,
    alignSelf: 'center',
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    opacity: 0.2,
  },
  leftContainer: {
    flex: 0.35,
    height: '100%',
    overflow: 'hidden',
  },
  rightContainer: {
    flex: 0.65,
    height: '100%',
  },
  close: {
    position: 'absolute',
    top: SPACING * 4,
    right: SPACING,
    padding: SPACING / 2,
  },
});
