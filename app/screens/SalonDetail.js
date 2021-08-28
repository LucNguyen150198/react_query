import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as Animatable from 'react-native-animatable';
import { dimensions, SPACING } from '@themes';
import { detailIcon } from '@mocks';

const { width, height } = dimensions;
const ITEM_HEIGHT = height * 0.18;
const TOP_HEADER_HEIGHT = height * 0.3;
const DURATION = 400;

const ANIMATION = {
  0: {
    translateX: width,
  },
  1: {
    translateX: 0,
  },
};

export const SalonDetail = ({ navigation, route }) => {
  const { item } = route.params;

  const back = () => {
    navigation.goBack();
  };

  const Categories = () => {
    return (
      <View>
        {item.categories?.map((category, index) => {
          return (
            <Animatable.View
              useNativeDriver
              animation="fadeInUp"
              delay={DURATION * 2 + index * 100}
              key={index + ''}
              style={{ marginVertical: SPACING }}
            >
              <Text style={styles.title}>{category.title}</Text>

              {category.subcats.map((subcat, index) => {
                return (
                  <View key={index + ''} style={styles.content}>
                    <View style={styles.dot} />
                    <Text style={styles.subTitle}>{subcat}</Text>
                  </View>
                );
              })}
            </Animatable.View>
          );
        })}
      </View>
    );
  };

  const DetailIcons = () => {
    return (
      <View style={styles.detailIcon}>
        {detailIcon?.map((detail, index) => {
          return (
            <Animatable.View
              useNativeDriver
              animation="bounceIn"
              delay={DURATION + index * 100}
              key={index + ''}
              style={[{ backgroundColor: detail.color }, styles.detailItem]}
            >
              <AntDesign name={detail.icon} size={24} color="#FFF" />
            </Animatable.View>
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
      <SharedElement
        id={`item.${item.key}.bg`}
        // style={StyleSheet.absoluteFillObject}
      >
        <View
          style={[
            {
              backgroundColor: item.color,
              height: TOP_HEADER_HEIGHT + 32,
              borderRadius: 0,
            },
            StyleSheet.absoluteFillObject,
          ]}
        />
      </SharedElement>

      <SharedElement id={`item.${item.key}.name`}>
        <Text style={styles.name}>{item.name}</Text>
      </SharedElement>

      <SharedElement id={`item.${item.key}.image`}>
        <Image source={item.image} style={styles.image} />
      </SharedElement>

      <TouchableOpacity style={styles.close}>
        <Animatable.View animation={ANIMATION} delay={300} useNativeDriver>
          <Icon name="close" onPress={back} size={20} />
        </Animatable.View>
      </TouchableOpacity>

      <SharedElement id={'general.bg'}>
        <View style={styles.bg}>
          <ScrollView style={{ flex: 1 }}>
            <DetailIcons />
            <Categories />
          </ScrollView>
        </View>
      </SharedElement>
    </View>
  );
};

SalonDetail.sharedElements = (route) => {
  const { item } = route.params;
  return [
    {
      id: `item.${item.key}.bg`,
    },
    {
      id: `item.${item.key}.name`,
    },
    {
      id: `item.${item.key}.image`,
    },
    {
      id: 'general.bg',
    },
  ];
};

const styles = StyleSheet.create({
  close: {
    position: 'absolute',
    top: SPACING * 4,
    right: SPACING,
    padding: SPACING / 2,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    position: 'absolute',
    left: SPACING,
    top: TOP_HEADER_HEIGHT - SPACING * 4,
  },
  jobTitle: { fontSize: 12, opacity: 0.8 },
  image: {
    width: ITEM_HEIGHT * 0.7,
    height: ITEM_HEIGHT * 0.7,
    resizeMode: 'contain',
    position: 'absolute',
    top: TOP_HEADER_HEIGHT - ITEM_HEIGHT * 0.7 + 5,
    right: SPACING,
  },
  bg: {
    width,
    height,
    position: 'absolute',
    borderRadius: 32,
    padding: SPACING,
    paddingTop: SPACING + 32,
    transform: [{ translateY: TOP_HEADER_HEIGHT }],
    backgroundColor: '#FFF',
  },
  detailIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: SPACING + 32,
  },
  detailItem: {
    width: 64,
    height: 64,
    borderRadius: 64 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: 'gold',
    marginRight: SPACING,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING / 2,
    marginLeft: SPACING,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: SPACING / 2,
  },
  subTitle: {
    fontSize: 14,
    opacity: 0.8,
  },
});
