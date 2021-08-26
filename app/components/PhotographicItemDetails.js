import React from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { dimensions } from '@themes';

const { width, height } = dimensions;

export const PhotographicItemDetails = ({ data = [], style, scrollX }) => {
  return (
    <View style={style}>
      {data.map((item, index) => {
        const inputRange = [
          (index - 0.5) * width,
          index * width,
          (index + 0.5) * width,
        ];

        const translateY = scrollX.interpolate({
          inputRange,
          outputRange: [-20, 0, -20],
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0, 1, 0],
        });

        return (
          <Animated.View
            key={index + ''}
            style={[
              styles.item,
              {
                opacity,
                transform: [
                  {
                    translateY,
                  },
                ],
              },
            ]}
          >
            <Text style={styles.title}>{item?.title}</Text>
            <Text style={styles.description}>{item?.description}</Text>
          </Animated.View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    position: 'absolute',
  },
  title: { fontSize: 18, color: '#FFF', fontWeight: 'bold' },
  description: { fontSize: 12, color: '#FFF', marginTop: 10 },
});
