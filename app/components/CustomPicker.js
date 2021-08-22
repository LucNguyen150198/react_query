import React from 'react';
import { StyleSheet, Text, Dimensions } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
const { width } = Dimensions.get('window');
const SIZE = 30;
const SPACING = 20;
export const CustomPicker = ({
  items = [],
  value: item,
  error,
  touched,
  ...props
}) => {
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState(items);
  const [value, setValue] = React.useState(item);
  React.useEffect(() => {
    setValue(item);
  }, [item]);
  return (
    <React.Fragment>
      <DropDownPicker
        open={open}
        items={values}
        setOpen={setOpen}
        setItems={setValues}
        setValue={setValue}
        value={value}
        style={styles.pickerStyle}
        disableBorderRadius={false}
        containerStyle={styles.containerStyle}
        placeholderStyle={{
          color: '#9E9E9E',
        }}
        {...props}
      />
      {error && touched && <Text style={styles.errorStyle}>{error}</Text>}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: SPACING / 2,
    width: '90%',
  },
  pickerStyle: {
    backgroundColor: '#FFF',
    height: SIZE + 10,
    borderRadius: 20,
    borderColor: '#e3e1e1',
  },
  errorStyle: {
    fontSize: 12,
    color: 'red',
    alignSelf: 'flex-start',
    marginLeft: width * 0.08,
  },
});
