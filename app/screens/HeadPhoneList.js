import React, { useRef } from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Animated,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import { headPhones } from '../mocks';
import { logoSpec, dimensions } from '@themes';
import Images from '@assets';
import { SharedElement } from 'react-navigation-shared-element';
const { LOGO_WIDTH, LOGO_HEIGHT, DOT_SIZE, TICKER_HEIGHT, CIRCLE_SIZE } =
  logoSpec;
const { width, height } = dimensions;
export const HeadPhoneList = ({ navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const modalRef = React.useRef(null);

  const onGoToDetail = (item) => {
    modalRef.current?.forceQuit();
    navigation.navigate('TravelDetail', { item });
  };

  const renderItem = ({ item, index }) => {
    const { heading, imageUri, description, color, type } = item;
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];

    const inputRangeOpacity = [
      (index - 0.3) * width,
      index * width,
      (index + 0.3) * width,
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0, 1, 0],
    });

    const opacity = scrollX.interpolate({
      inputRange: inputRangeOpacity,
      outputRange: [0, 1, 0],
    });
    const translateXHeading = scrollX.interpolate({
      inputRange,
      outputRange: [width * 0.2, 0, -width * 0.2],
    });
    const translateXDescription = scrollX.interpolate({
      inputRange,
      outputRange: [width * 0.6, 0, -width * 0.6],
    });
    return (
      <View style={styles.item}>
        <Animated.Image
          source={imageUri}
          style={[
            styles.image,
            {
              transform: [{ scale }],
            },
          ]}
        />
        <View style={styles.textContainer}>
          <Animated.Text
            style={[
              styles.heading,

              { opacity, transform: [{ translateX: translateXHeading }] },
            ]}
          >
            {heading}
          </Animated.Text>
          <Animated.Text
            style={[
              styles.description,
              { opacity, transform: [{ translateX: translateXDescription }] },
            ]}
          >
            {description}
          </Animated.Text>
        </View>
      </View>
    );
  };

  const Pagination = () => {
    return (
      <View style={styles.pagination}>
        {headPhones.map((item, index) => {
          const { color, key } = item;
          return (
            <View key={key} style={styles.paginationDotContainer}>
              <View
                style={[styles.paginationDot, { backgroundColor: color }]}
              />
            </View>
          );
        })}
      </View>
    );
  };

  const Ticker = () => {
    const inputRange = [-width, 0, width];
    const translateY = scrollX.interpolate({
      inputRange,
      outputRange: [TICKER_HEIGHT, 0, -TICKER_HEIGHT],
    });
    return (
      <View style={styles.tickerContainer}>
        <Animated.View style={{ transform: [{ translateY }] }}>
          {headPhones.map((item, index) => {
            return (
              <Text key={item.key} style={styles.tickerText}>
                {item.type}
              </Text>
            );
          })}
        </Animated.View>
      </View>
    );
  };

  const Circle = () => {
    return (
      <View style={styles.circleContainer}>
        {headPhones.map((item, index) => {
          const inputRange = [
            (index - 0.5) * width,
            index * width,
            (index + 0.5) * width,
          ];
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
            extrapolate: 'clamp',
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 0.2, 0],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={item.key}
              style={[
                styles.circle,
                {
                  backgroundColor: item.color,
                  opacity,
                  transform: [{ scale }],
                },
              ]}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FFF',
      }}
    >
      <StatusBar hidden />
      <Circle />
      <Animated.FlatList
        horizontal
        pagingEnabled
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key + ''}
        data={headPhones}
        renderItem={renderItem}
      />
      <Image source={Images.ue_black_logo} style={styles.logo} />
      <Pagination />
      <Ticker />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    width,
    height: height * 0.85,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop:40
  },
  image: {
    width: width * 0.75,
    height: width * 0.75,
    resizeMode: 'contain',
    flex: 1,
  },
  textContainer: {
    alignItems: 'flex-start',
    alignSelf: 'flex-end',
    flex: 0.5,
  },
  heading: {
    fontSize: 24,
    fontWeight: '800',
    color: '#444',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ccc',
    width: width * 0.75,
    marginRight: 10,
    lineHeight: 16 * 1.5,
  },
  logo: {
    position: 'absolute',
    left: 10,
    bottom: 70,
    width: LOGO_WIDTH,
    height: LOGO_HEIGHT,
    resizeMode: 'contain',
    transform: [
      {
        translateX: -LOGO_WIDTH / 2,
      },
      {
        translateY: -LOGO_HEIGHT / 2,
      },
      {
        rotateZ: '-90deg',
      },
      {
        translateX: LOGO_WIDTH / 2,
      },
      {
        translateY: LOGO_HEIGHT / 2,
      },
    ],
  },
  pagination: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    height: DOT_SIZE,
  },
  paginationDotContainer: {
    width: DOT_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationDot: {
    width: DOT_SIZE * 0.3,
    height: DOT_SIZE * 0.3,
    borderRadius: DOT_SIZE * 0.15,
  },
  tickerContainer: {
    position: 'absolute',
    top: 40,
    left: 20,
    overflow: 'hidden',
    height: TICKER_HEIGHT,
  },
  tickerText: {
    fontSize: TICKER_HEIGHT,
    lineHeight: TICKER_HEIGHT,
    fontWeight: '800',
    textTransform: 'uppercase',
  },

  circleContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    position: 'absolute',
    top: '15%',
  },
});
