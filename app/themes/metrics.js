import { Dimensions } from 'react-native';
export const dimensions = ({ width, height } = Dimensions.get('window'));
export const SIZE = 64;
export const ICONS_SIZE = SIZE * 0.6;
export const SPACING = 12;
export const SHADOW = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 10,
  },
  shadowOpacity: 0.3,
  shadowRadius: 20,
  backgroundColor: '#FFF',
};
const s = width * 0.68;

const s_card = width * 0.85;

export const travelSpec = {
  ITEM_WIDTH: s,
  ITEM_HEIGHT: s * 1.5,
  RADIUS: 18,
  SPACING,
  FULL_SIZE: s + SPACING * 2,
};

export const cardSpec = {
  ITEM_WIDTH: s_card,
  ITEM_HEIGHT: s_card * 0.6,
  RADIUS: 18,
  SPACING,
  FULL_SIZE: s_card + SPACING * 2,
};
