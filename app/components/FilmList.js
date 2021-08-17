import React from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { film } from '@api';

import Images from '@assets';
import faker from 'faker';
const AVATAR_SIZE = 50;
const SPACING = 20;
export const FilmList = () => {
  const [page, setPage] = React.useState(1);
  let onEndReachedCalledDuringMomentum = true;
  const {
    data: films,
    isLoading,
    isError,
    isFetching,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = film.useGetFilms({ page });

  const onLoadMore = () => {
    if (hasNextPage && !onEndReachedCalledDuringMomentum) {
      setPage(page + 1);
      onEndReachedCalledDuringMomentum = true;
      fetchNextPage();
    }
  };

  const renderItem = ({ item, index }) => {
    const { title, release_date, director } = item;
    const avatar_url = `https://randomuser.me/api/portraits/${faker.helpers.randomize(
      ['women', 'men']
    )}/${faker.random.number(60)}.jpg`;
    return (
      <View style={styles.containerItem}>
        <Image
          style={styles.avatarStyle}
          source={{
            uri: avatar_url,
          }}
        />
        <View>
          <Text style={styles.txtName}>{title}</Text>
          <Text style={styles.txtBirthday}>
            <Text style={{ fontWeight: 'bold' }}>Release date: </Text>
            {release_date}
          </Text>
          <Text style={styles.txtGender}>
            <Text style={{ fontWeight: 'bold' }}>Director: </Text>
            {director}
          </Text>
        </View>
      </View>
    );
  };

  const renderFooter = () => {
    return isFetchingNextPage && <ActivityIndicator animating size="small" />;
  };

  if (isLoading) return <ActivityIndicator animating color="#a87332" />;
  if (isError) return <Text style={styles.txtLoading}>{error.message}</Text>;
  return (
    <View style={{ flex: 1 }}>
      <Image
        style={StyleSheet.absoluteFillObject}
        source={Images.background}
        blurRadius={10}
      />
      <FlatList
        contentContainerStyle={{
          padding: SPACING,
          paddingTop: StatusBar.currentHeight || 42,
        }}
        refreshing={isFetching}
        onRefresh={refetch}
        keyExtractor={(_, index) => index + ''}
        data={films?.pages[0]?.results ?? []}
        renderItem={renderItem}
        ListFooterComponent={renderFooter}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.5}
        removeClippedSubviews={true}
        initialNumToRender={20}
        maxToRenderPerBatch={5}
        onMomentumScrollBegin={() => {
          onEndReachedCalledDuringMomentum = false;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerItem: {
    flex: 1,
    flexDirection: 'row',
    padding: SPACING,
    marginBottom: SPACING,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    backgroundColor: '#FFF',
  },
  txtLoading: { color: '#eb4034' },
  avatarStyle: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE,
    marginRight: SPACING,
  },
  txtName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  txtGender: {
    fontSize: 14,
    opacity: 0.8,
  },
  txtBirthday: {
    fontSize: 14,
    opacity: 0.7,
  },
  txtPage: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  pageStyle: {
    height: AVATAR_SIZE,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  buttonStyle: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: 6,
    backgroundColor: '#fff',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING,
  },
});
