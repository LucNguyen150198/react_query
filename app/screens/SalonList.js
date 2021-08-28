import React, { useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
  FlatList,
  SafeAreaView,
} from 'react-native';

import { salons } from '@mocks';
import { SPACING, dimensions } from '@themes';

import { SharedElement } from 'react-navigation-shared-element';
const { width, height } = dimensions;
const ITEM_HEIGHT = height * 0.18;
export const SalonList = ({ navigation }) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const onGoToDetail = (item) => {
    navigation.navigate('SalonDetail', { item });
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => onGoToDetail(item)}
        style={{ height: ITEM_HEIGHT, margin: SPACING }}
      >
        <View style={{ flex: 1, padding: SPACING }}>
          <SharedElement
            id={`item.${item.key}.bg`}
            style={StyleSheet.absoluteFillObject}
          >
            <View
              style={[
                { backgroundColor: item.color, borderRadius: 16 },
                StyleSheet.absoluteFillObject,
              ]}
            />
          </SharedElement>

          <SharedElement id={`item.${item.key}.name`}>
            <Text style={styles.name}>{item.name}</Text>
          </SharedElement>

          <Text style={styles.jobTitle}>{item.jobTitle}</Text>

          <SharedElement id={`item.${item.key}.image`} style={styles.image}>
            <Image source={item.image} style={styles.image} />
          </SharedElement>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FFF',
      }}
    >
      <FlatList
        contentContainerStyle={{ paddingBottom: SPACING * 4 }}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index + ''}
        data={salons}
        renderItem={renderItem}
      />
      <SharedElement id={'general.bg'} style={styles.bg}>
        <View style={styles.bg} />
      </SharedElement>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  name: {
    fontSize: 18,
    fontWeight: '700',
    position: 'absolute',
  },
  jobTitle: {
    fontSize: 12,
    opacity: 0.8,
    marginTop: SPACING * 2,
  },
  image: {
    width: ITEM_HEIGHT * 0.7,
    height: ITEM_HEIGHT * 0.7,
    resizeMode: 'contain',
    position: 'absolute',
    bottom: 0,
    right: SPACING,
  },
  bg: {
    width,
    height,
    position: 'absolute',
    borderRadius: 32,
    transform: [{ translateY: height }],
  },
});
