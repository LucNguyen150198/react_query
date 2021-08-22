import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
  Switch,
} from 'react-native';
import { CustomInput, CustomPicker } from '@components';
import { user } from '@api';
import Images from '@assets';
import { useFormik } from 'formik';
import { useMutation, useQueryClient } from 'react-query';

import * as yup from 'yup';
const { width } = Dimensions.get('window');
const INITIAL_USER = {
  name: '',
  email: '',
  gender: '',
  status: true,
};
const GENDERS = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
];
export const UserForm = ({ route, navigation }) => {
  // const { item } = route.params;
  const queryClient = useQueryClient();
  const { isLoading, isFetching, mutate } = useMutation('user', user.addUser, {
    onSuccess: async ({ data }, variables, context) => {
      navigation.goBack();
    },
    onError: (err, newUser, context) => {
      resetForm();
      alert(err.message);
    },
    onSettled: (data) => {
      queryClient.invalidateQueries('user');
    },
  });

  const schema = yup.object().shape({
    name: yup.string().required('The field not empty'),
    email: yup
      .string()
      .email('The email invalid')
      .required('The field not empty'),
    gender: yup.string().required('The field not empty'),
  });

  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    touched,
    handleBlur,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: INITIAL_USER,
    validationSchema: schema,
    onSubmit: (value) => {
      const newValue = { ...value };
      newValue.status = newValue.status ? 'active' : 'inactive';
      mutate(newValue);
    },
  });

  const Button = ({ onPress, label, disabled = false, transparent, color }) => {
    return (
      <TouchableOpacity onPress={onPress} disabled={disabled}>
        <View
          style={[
            styles.buttonStyle,
            transparent && styles.buttonTransparentStyle,
          ]}
        >
          {isLoading || isFetching ? (
            <ActivityIndicator animating color="#ff5b29" />
          ) : (
            <Text style={[styles.txtSubmit, color && { color }]}>{label}</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={StyleSheet.absoluteFillObject}
        source={Images.background}
        blurRadius={10}
      />
      <Text style={styles.txtTitle}>CREATE USER</Text>
      <CustomInput
        placeholder="Name"
        icon={'user-circle'}
        value={values.name}
        onChangeText={handleChange('name')}
        onBlur={handleBlur('name')}
        error={errors.name}
        touched={touched.name}
      />
      <CustomInput
        placeholder="Email"
        icon="envelope-o"
        value={values.email}
        onChangeText={handleChange('email')}
        onBlur={handleBlur('email')}
        error={errors.email}
        touched={touched.email}
      />
      <CustomPicker
        value={values.gender}
        items={GENDERS}
        placeholder="Select gender"
        onChangeValue={handleChange('gender')}
        error={errors.gender}
        touched={touched.gender}
      />

      <View style={styles.switchStyle}>
        <Text style={styles.txtStatus}>Status: </Text>
        <Switch
          value={values.status}
          onValueChange={(value) => setFieldValue('status', value)}
          style={{ transform: [{ scale: 0.8 }] }}
          disabled={isLoading || isFetching}
        />
      </View>

      <Button
        label={'Submit'}
        onPress={handleSubmit}
        disabled={isLoading || isFetching}
      />

      <Button
        label={'Go back'}
        color="black"
        onPress={() => navigation.goBack()}
        transparent
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  txtTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#ff5b29',
    marginBottom: 10,
  },
  txtSubmit: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  txtStatus: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  buttonStyle: {
    width: width * 0.5,
    height: 40,
    borderRadius: 40,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff5b29',
  },
  buttonTransparentStyle: {
    backgroundColor: 'transparent',
    borderRadius: 0,
    height: 20,
    margin: 0,
  },
  switchStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 10,
    width: '85%',
  },
});
