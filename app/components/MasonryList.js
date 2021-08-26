import React from 'react';
import { StyleSheet, FlatList, View, Image } from 'react-native';

import { dimensions, travelSpec } from '@themes';
import { CustomImage } from './CustomImage';
import { travel } from '@api';
const { SPACING } = travelSpec;
const { width, height } = dimensions;
export const MasonryList = () => {
  const { data } = travel.useSearchTravel({
    query: 'wildlife',
  });

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.item}>
        <Image
          source={{ uri: item?.src?.large }}
          resizeMode="cover"
          style={[
            {
              width: width * 0.45,
              height: width * 0.6,
            },
          ]}
        />
      </View>
    );
  };

  return (
    <FlatList
      numColumns={2}
      data={data?.photos ?? []}
      style={{ flex: 1 }}
      contentContainerStyle={{
        padding: SPACING,
        paddingBottom: 40,
        alignItems: 'center',
      }}
      keyExtractor={(item, index) => item.id + 'masonry'}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    margin: SPACING / 2,
    borderRadius: 0,
    overflow: 'hidden',
    alignItems: 'center',
  },
});
