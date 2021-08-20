import React from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const SIZE = 30;
const SPACING = 20;
export const CustomInput = ({ icon, touched, error, ...props }) => {
  return (
    <View style={styles.wrapperInputStyle}>
      <View style={styles.containerStyle}>
        <Icon
          name={icon}
          size={20}
          style={{ paddingHorizontal: SPACING / 2 }}
        />
        <TextInput
          style={styles.inputStyle}
          placeholderTextColor="#9E9E9E"
          autoCapitalize="none"
          underlineColorAndroid="transparent"
          {...props}
        />
      </View>
      {error && touched && <Text style={styles.errorStyle}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    width: '100%',
    height: SIZE + 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e3e1e1',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    marginVertical: SPACING / 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrapperInputStyle: { width: '90%' },
  inputStyle: {
    flex: 1,
    fontSize: 14,
  },
  errorStyle: {
    fontSize: 12,
    color: 'red',
    textAlign: 'left',
    paddingLeft: SPACING / 2,
  },
});
