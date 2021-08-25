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
} from 'react-native';
import { HeaderSearchBar, CustomImage, Add } from '@components';
import { travel } from '@api';
import { travelSpec } from '@themes';
import { SharedElement } from 'react-navigation-shared-element';
const { ITEM_WIDTH, ITEM_HEIGHT, RADIUS, SPACING, FULL_SIZE } = travelSpec;
export const TravelList = ({ navigation }) => {
  const [paramSearch, setParamSearch] = React.useState(null);
  let onEndReachedCalledDuringMomentum = true;
  const scrollX = useRef(new Animated.Value(0)).current;
  const modalRef = React.useRef(null);
  const {
    data: travels,
    isLoading,
    isError,
    isFetching,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = travel.useGetTravels();

  const {
    data: search_travels,
    isLoading: isSearchLoading,
    isError: isSearchError,
    isFetching: isSearchFetching,
    isSuccess: isSearchSuccess,
  } = travel.useSearchTravel(paramSearch);

  const onLoadMore = () => {
    if (hasNextPage && !onEndReachedCalledDuringMomentum) {
      onEndReachedCalledDuringMomentum = true;
      fetchNextPage();
    }
  };

  const onGoToDetail = (item) => {
    modalRef.current?.forceQuit();
    navigation.navigate('TravelDetail', { item });
  };

  const onSubmitSearch = (params) => {
    setParamSearch({ query: params?.search });
  };

  renderItem = ({ item, index }) => {
    return item?.photos?.map((photo, index) => {
      const { src, photographer } = photo;
      const randomNumberDays = Math.floor(Math.random() * 100);
      const inputRange = [
        (index - 1) * FULL_SIZE,
        index * FULL_SIZE,
        (index + 1) * FULL_SIZE,
      ];
      const translateX = scrollX.interpolate({
        inputRange,
        outputRange: [ITEM_WIDTH, 0, -ITEM_WIDTH],
      });
      const scale = scrollX.interpolate({
        inputRange,
        outputRange: [1, 1.1, 1],
      });
      return (
        <TouchableOpacity
          key={index + ''}
          onPress={() => onGoToDetail(photo)}
          style={styles.itemContainer}
        >
          <SharedElement
            id={`item.${photo.id}.photo`}
            style={StyleSheet.absoluteFillObject}
          >
            <Animated.Image
              source={{ uri: src.large }}
              style={[
                StyleSheet.absoluteFillObject,
                {
                  transform: [{ scale: scale }],
                },
              ]}
              resizeMode="cover"
            />
          </SharedElement>
          <SharedElement id={`item.${photo.id}.photographer`}>
            <Animated.Text
              adjustsFontSizeToFit
              style={[
                styles.name,
                {
                  transform: [{ translateX }],
                },
              ]}
            >
              {photographer}
            </Animated.Text>
          </SharedElement>
          <Add size={26} backgroundColor="#00b82e" style={styles.icon} />
          <View style={styles.days}>
            <Text adjustsFontSizeToFit style={styles.daysValue}>
              {randomNumberDays}
            </Text>
            <Text adjustsFontSizeToFit style={styles.daysLabel}>
              Days
            </Text>
          </View>
        </TouchableOpacity>
      );
    });
  };

  renderSearchItem = ({ item, index }) => {
    const { src, photographer } = item;
    const randomNumberDays = Math.floor(Math.random() * 100);
    return (
      <TouchableOpacity
        key={index + ''}
        onPress={() => onGoToDetail(item)}
        style={styles.itemContainer}
      >
        <SharedElement
          id={`item.${item.id}.photo`}
          style={StyleSheet.absoluteFillObject}
        >
          <CustomImage
            source={{ uri: src.large }}
            style={[StyleSheet.absoluteFillObject]}
            resizeMode="cover"
          />
        </SharedElement>
        <SharedElement id={`item.${item.id}.photographer`}>
          <Text adjustsFontSizeToFit style={[styles.name]}>
            {photographer}
          </Text>
        </SharedElement>
        <Add size={26} backgroundColor="#00b82e" style={styles.icon} />
        <View style={styles.days}>
          <Text adjustsFontSizeToFit style={styles.daysValue}>
            {randomNumberDays}
          </Text>
          <Text adjustsFontSizeToFit style={styles.daysLabel}>
            Days
          </Text>
        </View>
      </TouchableOpacity>
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
  if (isLoading)
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ActivityIndicator animating color="#a87332" />
      </SafeAreaView>
    );
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FFF',
      }}
    >
      <HeaderSearchBar
        ref={modalRef}
        renderItem={renderSearchItem}
        onSubmit={onSubmitSearch}
        data={search_travels?.photos ?? []}
        loading={isSearchFetching || isSearchLoading}
        success={isSearchSuccess}
      />
      <View style={{ marginTop: SPACING * 4 }}>
        <Text adjustsFontSizeToFit style={styles.stripLabel}>
          Trips
        </Text>

        <Animated.FlatList
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          horizontal
          // snapToAlignment="center"
          snapToInterval={FULL_SIZE}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index + ''}
          data={travels?.pages ?? []}
          renderItem={renderItem}
          ListFooterComponent={renderFooter}
          onEndReached={onLoadMore}
          onEndReachedThreshold={0.1}
          removeClippedSubviews={true}
          initialNumToRender={20}
          maxToRenderPerBatch={5}
          onMomentumScrollBegin={() => {
            onEndReachedCalledDuringMomentum = false;
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: RADIUS,
    margin: SPACING,
    overflow: 'hidden',
  },
  loadingContainer: {
    width: ITEM_WIDTH * 0.3,
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 30,
    color: '#FFF',
    fontWeight: '800',
    width: ITEM_WIDTH * 0.8,
    textTransform: 'uppercase',
    position: 'absolute',
    top: SPACING,
    left: SPACING,
  },
  days: {
    position: 'absolute',
    bottom: SPACING,
    left: SPACING * 2 + 52,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'tomato',
    justifyContent: 'center',
    alignItems: 'center',
  },
  daysLabel: { fontSize: 12, color: '#FFF' },
  daysValue: { fontSize: 18, color: '#FFF', fontWeight: '800' },
  stripLabel: {
    fontSize: 18,
    fontWeight: '800',
    textTransform: 'uppercase',
    paddingHorizontal: SPACING + 5,
    alignSelf: 'flex-start',
  },
  icon: {
    position: 'absolute',
    bottom: SPACING,
    left: SPACING,
  },
});
