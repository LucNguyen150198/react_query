import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  FlatList,
  Dimensions,
} from 'react-native';
import { travel } from '@api';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CustomImage } from '@components';
import { travelSpec, dimensions } from '@themes';
import { SharedElement } from 'react-navigation-shared-element';
import * as Animatable from 'react-native-animatable';
const { ITEM_WIDTH, ITEM_HEIGHT, RADIUS, SPACING, FULL_SIZE } = travelSpec;
const { width } = dimensions;
const zoomIn = {
  from: {
    opacity: 0,
    scale: 0,
  },
  to: {
    opacity: 1,
    scale: 1,
  },
};

const zoomOut = {
  0: {
    opacity: 1,
    scale: 1,
  },
  1: {
    opacity: 0,
    scale: 0,
  },
};
export const TravelDetail = ({ route, navigation }) => {
  const { item } = route?.params;
  const {
    data: photo = {},
    isLoading,
    isError,
    isFetching,
    isSuccess,
    error,
  } = travel.useGetTravel(item.id);
  const [animation, setAnimation] = React.useState(zoomIn);
  let handleTextRef = React.useRef(null);
  const back = async () => {
    await setAnimation(zoomOut);

    setTimeout(() => {
      navigation.goBack();
    }, 300);
  };

  renderItem = ({ item:element, index }) => {
    return (
      <Animatable.View
        ref={handleTextRef}
        useNativeDriver={true}
        animation={animation}
        duration={700}
        delay={400 + index * 100}
        style={{
          backgroundColor: '#FFF',
          width: width * 0.35,
          height: width * 0.5,
          margin: SPACING,
          padding: SPACING,
          borderRadius: RADIUS,
          shadowColor: '#000',
          shadowOffset: {
            width: 5,
            height: 5,
          },
          shadowOpacity: 0.3,
        }}
      >
        <CustomImage
          source={{ uri: item?.src?.portrait }}
          style={{
            width: '100%',
            height: '70%',
          }}
          resizeMode="cover"
        />
        <Text adjustsFontSizeToFit>activity #{element + 1}</Text>
      </Animatable.View>
    );
  };

  if (isError) return <Text style={styles.txtLoading}>{error.message}</Text>;

  return (
    <View style={styles.container}>
      <SharedElement
        id={`item.${item.id}.photo`}
        style={StyleSheet.absoluteFillObject}
      >
        <View style={[StyleSheet.absoluteFillObject, { borderRadius: 0 }]}>
          <CustomImage
            style={StyleSheet.absoluteFillObject}
            source={{ uri: item?.src?.large }}
            resizeMode="cover"
          />
        </View>
      </SharedElement>

      <SharedElement id={`item.${item.id}.photographer`}>
        <Text adjustsFontSizeToFit style={[styles.name]}>
          {item.photographer}
        </Text>
      </SharedElement>

      <View style={styles.backIconStyle}>
        <Icon name="arrow-left" size={20} onPress={back} />
      </View>

      <View style={styles.bottomContainer}>
        <Text adjustsFontSizeToFit style={styles.bottom}>
          activities
        </Text>
        <FlatList
          horizontal
          contentContainerStyle={{
            paddingRight: SPACING,
          }}
          showsHorizontalScrollIndicator={false}
          data={[...Array(8).keys()]}
          keyExtractor={(item) => item + ''}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

TravelDetail.sharedElements = (route) => {
  const { item } = route.params;
  return [
    {
      id: `item.${item.id}.photo`,
    },
    {
      id: `item.${item.id}.photographer`,
    },
  ];
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  name: {
    fontSize: 30,
    color: '#FFF',
    fontWeight: '800',
    width: ITEM_WIDTH * 0.8,
    textTransform: 'uppercase',
    position: 'absolute',
    top: 100,
    left: SPACING * 2,
  },
  backIconStyle: {
    position: 'absolute',
    top: 40,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 120,
    left: SPACING,
  },
  bottom: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: '800',
    textTransform: 'uppercase',
    marginHorizontal: SPACING,
  },
});
