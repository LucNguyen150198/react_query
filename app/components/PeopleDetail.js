import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Image } from 'react-native';
import { people } from '@api';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CustomImage } from '@components';
export const PeopleDetail = ({ route, navigation }) => {
  const { item } = route.params;
  const { data, isLoading, isError, isFetching, isSuccess, error } =
    people.useGetPeople(item.id);
  if (isLoading || isFetching)
    return <ActivityIndicator animating color="#a87332" />;

  if (isError) return <Text style={styles.txtLoading}>{error.message}</Text>;

  return (
    <View style={styles.container}>
      <CustomImage
        style={StyleSheet.absoluteFillObject}
        source={{ uri: 'https://random.responsiveimages.io/v1/docs' }}
        resizeMode="cover"
      />

      <View style={styles.backIconStyle}>
        <Icon name="arrow-left" size={20} onPress={() => navigation.goBack()} />
      </View>

      <View style={styles.content}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <CustomImage
            style={styles.avatarStyle}
            source={{
              uri: item?.avatar_url,
            }}
          />
          <Text style={styles.txtName}>{data?.name}</Text>
        </View>

        <View style={{ padding: 10 }}>
          <Text style={styles.txtGender}>
            <Text style={{ fontWeight: 'bold' }}>Gender: </Text>
            {data?.gender}
          </Text>
          <Text style={styles.txtBirthday}>
            <Text style={{ fontWeight: 'bold' }}>BirthDay: </Text>
            {data?.birth_year}
          </Text>
          <Text style={styles.txtBirthday}>
            <Text style={{ fontWeight: 'bold' }}>Height: </Text>
            {data?.height}
          </Text>
          <Text style={styles.txtBirthday}>
            <Text style={{ fontWeight: 'bold' }}>Mass: </Text>
            {data?.mass}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
        >
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.txtColorStyle}>Hair Color</Text>
            <Text style={styles.txtBirthday}>{data?.hair_color}</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.txtColorStyle}>Skin Color</Text>
            <Text style={styles.txtBirthday}>{data?.skin_color}</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.txtColorStyle}>Eye Color</Text>
            <Text style={styles.txtBirthday}>{data?.eye_color}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  content: {
    height: 300,
    width: '100%',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    backgroundColor: '#FFF',
    padding: 20,
  },

  avatarStyle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10,
    borderColor: '#00ff62',
    borderWidth: 2,
  },
  txtName: {
    fontSize: 21,
    fontWeight: 'bold',
  },
  txtGender: {
    fontSize: 14,
    opacity: 0.8,
    marginVertical: 5,
  },
  txtBirthday: {
    fontSize: 14,
    opacity: 0.7,
    marginVertical: 5,
  },
  txtColorStyle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  backIconStyle: {
    position: 'absolute',
    top: 40,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 40,
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
