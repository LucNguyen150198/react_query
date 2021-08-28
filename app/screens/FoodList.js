import React, { useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
  StatusBar,
  FlatList,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { tabs, foods, popularFood } from '@mocks';
import { SPACING, dimensions, foodSpec } from '@themes';
import Images from '@assets';
import { SharedElement } from 'react-navigation-shared-element';
const { width, height } = dimensions;
const { CELL_WIDTH, CELL_HEIGHT, FULL_SIZE } = foodSpec;
export const FoodList = ({ navigation }) => {
  const [selectedTab, setTab] = React.useState(tabs[0]);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const onGoToDetail = (item) => {
    navigation.navigate('FoodDetail', { item });
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setTab(item)}
        style={{ padding: SPACING }}
      >
        <View
          style={[
            styles.itemTab,
            {
              backgroundColor: selectedTab === item ? 'orange' : 'transparent',
            },
          ]}
        >
          <Text
            style={[
              styles.tabLabel,
              {
                color: selectedTab === item ? '#FFF' : 'orange',
              },
            ]}
          >
            {item}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderPopularItem = ({ item, index }) => {
    return (
      <View style={styles.popularContainer}>
        <Image source={item.image} style={styles.popularImage} />
        <View style={{ flex: 1 }}>
          <Text style={styles.popularType}>{item.type}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AntDesign
              name="star"
              color="orange"
              size={16}
              style={{ margin: SPACING / 2 }}
            />
            <Text style={styles.popularRating}>{item.rating}</Text>
          </View>
        </View>
        <Text style={styles.popularPrice}>{item.price}</Text>
      </View>
    );
  };

  const renderFoodItem = ({ item, index }) => {
    const inputRange = [
      (index - 0.55) * FULL_SIZE,
      index * FULL_SIZE,
      (index + 0.55) * FULL_SIZE,
    ];
    const scrollXType = scrollX.interpolate({
      inputRange,
      outputRange: [FULL_SIZE * 0.1, 0, -FULL_SIZE * 0.1],
    });
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => onGoToDetail(item)}>
        <View style={styles.foodContainer}>
          <SharedElement
            id={`item.${item.key}.bg`}
            style={[StyleSheet.absoluteFillObject]}
          >
            <View
              style={[
                StyleSheet.absoluteFillObject,
                { backgroundColor: item.color, borderRadius: 16 },
              ]}
            />
          </SharedElement>
          <SharedElement id={`item.${item.key}.meta`} style={StyleSheet.absoluteFillObject}>
            <Animated.View
              style={{ position: 'absolute', top: SPACING, left: SPACING }}
            >
              <Animated.Text
                style={[
                  styles.foodType,
                  { transform: [{ translateX: scrollXType }] },
                ]}
              >
                {item.type}
              </Animated.Text>
              <Animated.Text
                style={[
                  styles.foodSubType,
                  { transform: [{ translateX: scrollXType }] },
                ]}
              >
                {item.subType}
              </Animated.Text>
            </Animated.View>
          </SharedElement>

          <SharedElement id={`item.${item.key}.image`} style={styles.foodImage}>
            <Image source={item.image} style={styles.foodImage} />
          </SharedElement>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#FFF',
      }}
    >
      <FlatList
        contentContainerStyle={{ paddingBottom: SPACING * 4 }}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index + ''}
        data={popularFood}
        renderItem={renderPopularItem}
        ListHeaderComponent={() => (
          <View>
            <FlatList
              horizontal
              pagingEnabled
              scrollEventThrottle={16}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index + ''}
              data={tabs}
              renderItem={renderItem}
            />
            <Animated.FlatList
              horizontal
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: true }
              )}
              snapToInterval={FULL_SIZE}
              decelerationRate="fast"
              scrollEventThrottle={16}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index + ''}
              data={foods}
              renderItem={renderFoodItem}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tabContainer: {},
  itemTab: {
    paddingHorizontal: SPACING,
    paddingVertical: SPACING / 2,
    borderRadius: 20,
  },
  tabLabel: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  popularContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING,
  },
  popularPrice: { fontWeight: '800' },
  popularImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: SPACING,
  },
  popularType: {
    fontSize: 16,
    fontWeight: '800',
  },
  foodContainer: {
    width: CELL_WIDTH,
    height: CELL_HEIGHT,
    padding: SPACING,
    margin: SPACING,
    justifyContent: 'center',
    alignItems: 'center',
  },
  foodType: { fontSize: 22, fontWeight: '800' },
  foodSubType: { fontSize: 12, opacity: 0.8 },
  foodImage: {
    width: CELL_WIDTH * 0.7,
    height: CELL_WIDTH * 0.7,
    resizeMode: 'contain',
  },
});
