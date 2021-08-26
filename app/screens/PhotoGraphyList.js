import React, { useRef } from 'react';
import {
  View,
  Image,
  ActivityIndicator,
  StyleSheet,
  Animated,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import { UserCard, PhotographicItemDetails, MasonryList } from '@components';
import { travel } from '@api';
import { travelSpec, dimensions } from '@themes';
import { generatePhotoGraphics } from '@utils';
import { SharedElement } from 'react-navigation-shared-element';
const { SPACING } = travelSpec;
const { width, height } = dimensions;

export const PhotoGraphyList = ({ navigation }) => {
  let onEndReachedCalledDuringMomentum = true;
  const scrollX = useRef(new Animated.Value(0)).current;

  const {
    data: search_travels,
    isLoading: isSearchLoading,
    isError: isSearchError,
  } = travel.useSearchTravel({ query: 'wildlife' });

  const GRAPHICS = generatePhotoGraphics(search_travels?.photos?.length ?? 0);
  const onGoToDetail = (item) => {
    navigation.navigate('PhotoGraphyDetail', { item });
  };

  renderItem = ({ item, index }) => {
    const { src, photographer, id } = item;
    const user = { ...GRAPHICS[index]?.user, name: photographer };
    return (
      <View key={id + ''} style={{ flex: 1, width, height }}>
        <SharedElement id={`item.${item.id}.image`}>
          <Image
            source={{ uri: src.large2x }}
            style={[
              StyleSheet.absoluteFillObject,
              {
                width,
                height,
              },
            ]}
            resizeMode="cover"
          />
        </SharedElement>

        <View style={styles.card}>
          <TouchableScale
            onPress={() => onGoToDetail({ ...item, user })}
            activeScale={0.8}
            tension={20}
            friction={7}
            useNativeDriver={true}
          >
            <SharedElement id={`item.${item.id}.userCard`}>
              <UserCard user={user} />
            </SharedElement>
          </TouchableScale>
        </View>
      </View>
    );
  };

  const renderFooter = () => {
    return (
      isFetchingNextPage && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator animating size="large" color="rgb(253,189,27)" />
        </View>
      )
    );
  };
  if (isSearchLoading)
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ActivityIndicator animating color="#a87332" />
      </SafeAreaView>
    );
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000',
      }}
    >
      <StatusBar hidden />
      <Animated.FlatList
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        horizontal
        pagingEnabled
        keyExtractor={(_, index) => index + ''}
        data={search_travels?.photos ?? []}
        renderItem={renderItem}
        removeClippedSubviews={true}
        initialNumToRender={20}
        maxToRenderPerBatch={5}
        onMomentumScrollBegin={() => {
          onEndReachedCalledDuringMomentum = false;
        }}
      />
      <PhotographicItemDetails
        data={GRAPHICS}
        style={styles.itemDetail}
        scrollX={scrollX}
      />
    </View>
  );
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
