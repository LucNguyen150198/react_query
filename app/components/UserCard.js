import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { cardSpec, SHADOW } from '@themes';
import { CustomImage } from './CustomImage';
const { ITEM_WIDTH, ITEM_HEIGHT, SPACING } = cardSpec;
export const UserCard = ({ user }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <CustomImage
          style={styles.avatarStyle}
          source={{
            uri: user.avatar,
          }}
        />
        <View style={{ flex: 1 }}>
          <Text adjustsFontSizeToFit numberOfLines={1} style={styles.name}>
            {user?.name}
          </Text>
          <Text
            adjustsFontSizeToFit
            numberOfLines={2}
            style={styles.numberLabel}
          >
            {user.job}
          </Text>
        </View>
      </View>

      <View style={styles.content}>
      {user?.details?.map((item,index)=>{
          return (
            <View key={index +''} style={styles.number}>
            <Text style={styles.numberValue}>{item?.value}</Text>
            <Text style={styles.numberLabel}>{item.label}</Text>
          </View>
          )
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...SHADOW,
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    padding: SPACING * 2,
    margin: SPACING,
    backgroundColor: '#FFF',
    justifyContent: 'space-between',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING,
  },
  number: {
    alignItems: 'center',
  },
  numberValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  numberLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: '#C9CCDD',
    marginTop: 3,
  },
  avatarStyle: {
    width: 65,
    height: 65,
    borderRadius: 30,
    marginRight: SPACING,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  colSpace: {
    height: 40,
    width: 1,
    backgroundColor: '#C9CCDD',
    marginHorizontal: SPACING,
  },
});
