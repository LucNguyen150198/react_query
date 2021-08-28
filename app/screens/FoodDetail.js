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
import { dimensions, SPACING, foodSpec } from '@themes';
import Images from '@assets';
const { CELL_WIDTH, CELL_HEIGHT, FULL_SIZE } = foodSpec;
const { width, height } = dimensions;
const DURATION = 400;
const TRANSLATE_Y = {
  0: {
    opacity: 0,
    translateY: 100,
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

const TRANSLATE_XY = (from) => {
  return {
    0: {
      opacity: 0,
      translateY: -100,
      translateX: from,
    },
    1: {
      opacity: 1,
      translateY: 0,
      translateX: 0,
    },
  };
};
const createAnimation = [
  TRANSLATE_XY(100),
  TRANSLATE_XY(0),
  TRANSLATE_XY(-100),
];

export const FoodDetail = ({ navigation, route }) => {
  const { item } = route.params;

  const back = () => {
    navigation.goBack();
  };

  const SubCategories = () => {
    return (
      <View style={styles.subCategoryContainer}>
        {item?.subcategories?.map((subCate, index) => {
          return (
            <Animatable.View
              useNativeDriver
              animation={createAnimation[index]}
              delay={DURATION}
              key={index + ''}
              style={{
                backgroundColor: `${item.fullColor}99`,
                padding: SPACING,
                borderRadius: CELL_WIDTH * 0.1,
                zIndex: 2,
              }}
            >
              <Image source={subCate.image} style={styles.subCategoryImage} />
            </Animatable.View>
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FFF',
      }}
    >
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

      <SharedElement
        id={`item.${item.key}.meta`}
        style={StyleSheet.absoluteFillObject}
      >
        <View
          style={{ position: 'absolute', top: SPACING * 4, left: SPACING * 2 }}
        >
          <Text style={[styles.foodType]}>{item.type}</Text>
          <Text style={[styles.foodSubType]}>{item.subType}</Text>
        </View>
      </SharedElement>

      <View style={{ marginTop: height * 0.1 }}>
        <SharedElement id={`item.${item.key}.image`}>
          <Image source={item.image} style={styles.foodImage} />
        </SharedElement>
        <SubCategories />
      </View>

      <View style={{ padding: SPACING }}>
        <Animatable.Text
          useNativeDriver
          animation={TRANSLATE_Y}
          duration={DURATION}
          delay={DURATION + 300}
          style={styles.foodPrice}
        >
          {item?.price}
        </Animatable.Text>
        <Animatable.Text
          useNativeDriver
          animation={TRANSLATE_Y}
          delay={DURATION + 400}
          duration={DURATION}
          style={styles.foodDes}
        >
          {item?.description}
        </Animatable.Text>
      </View>

      <TouchableOpacity style={styles.close}>
        <Animatable.View animation={ANIMATION} delay={300} useNativeDriver>
          <Icon name="close" onPress={back} size={20} />
        </Animatable.View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

FoodDetail.sharedElements = (route) => {
  const { item } = route.params;
  return [
    {
      id: `item.${item.key}.bg`,
    },
    {
      id: `item.${item.key}.image`,
    },
    {
      id: `item.${item.key}.meta`,
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
  foodType: { fontSize: 22, fontWeight: '800' },
  foodSubType: { fontSize: 12, opacity: 0.8 },
  foodImage: {
    width: CELL_WIDTH * 0.9,
    height: CELL_WIDTH * 0.9,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: SPACING * 4,
  },
  subCategoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: SPACING * 3,
  },
  subCategoryImage: {
    width: CELL_WIDTH * 0.1,
    height: CELL_WIDTH * 0.1,
    resizeMode: 'contain',
  },
  foodPrice: { fontSize: 32, fontWeight: '800', paddingBottom: SPACING / 2 },
  foodDes: { fontSize: 14, opacity: 0.8, lineHeight: 20 },
});
