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
} from 'react-native';
import { CustomInput } from '@components';
import { user } from '@api';
import Images from '@assets';
import { useFormik } from 'formik';
import { useMutation, useQueryClient } from 'react-query';
import * as yup from 'yup';
const { width } = Dimensions.get('window');
const INITIAL_USER = {
  name: '',
  job: '',
};
export const UserForm = ({ route, navigation }) => {
  // const { item } = route.params;
  const queryClient = useQueryClient();
  const { isLoading, isError, isFetching, error, mutate, data } = useMutation(
    'user',
    user.addUser,
    {
      onSuccess: (data, variables) => {
        navigation.goBack();
      },
      onError: (err, newUser, context) => {
        //queryClient.setQueryData('user', context.previousValue);
      },
      onSettled: (data) => {
        queryClient.invalidateQueries('user');
      },
    }
  );

  const schema = yup.object().shape({
    name: yup.string().required('The field not empty'),
    job: yup.string().required('The field not empty'),
  });

  const { handleChange, handleSubmit, values, errors, touched, handleBlur } =
    useFormik({
      initialValues: INITIAL_USER,
      validationSchema: schema,
      onSubmit: (value) => mutate(value),
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
        placeholder="Job"
        icon="briefcase"
        value={values.job}
        onChangeText={handleChange('job')}
        onBlur={handleBlur('job')}
        error={errors.job}
        touched={touched.job}
      />
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
});
