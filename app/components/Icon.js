import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
const ICON_SIZE = 20;
export const Add = ({
  size,
  backgroundColor = '#FFF',
  tintColor = '#FFF',
  style,
  onPress = () => {},
}) => {
  const fullSize = size ?? ICON_SIZE;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.iconStyle,
        {
          width: fullSize * 2,
          height: fullSize * 2,
          borderRadius: fullSize * 2,
          backgroundColor: backgroundColor,
        },
        style,
      ]}
    >
      <AntDesign name="plus" size={fullSize} color={tintColor} />
    </TouchableOpacity>
  );
};

export const Edit = ({ size, backgroundColor, style, onPress = () => {} }) => {
  const fullSize = size ?? ICON_SIZE;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.iconStyle,
        {
          width: fullSize * 2,
          height: fullSize * 2,
          borderRadius: fullSize * 2,
          backgroundColor,
        },
        style,
      ]}
    >
      <Icon name="add" size={fullSize} />
    </TouchableOpacity>
  );
};

export const Back = ({ size, backgroundColor, style, onPress = () => {} }) => {
  const fullSize = size ?? ICON_SIZE;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.iconStyle,
        {
          width: fullSize * 2,
          height: fullSize * 2,
          borderRadius: fullSize * 2,
          backgroundColor,
          position: 'absolute',
          top: 40,
          left: 20,
        },
        style,
      ]}
    >
      <Icon name="arrow-left" size={fullSize} onPress={onPress} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
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
});
