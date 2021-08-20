import React from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { HeaderSearchBar, CustomImage, Add } from '@components';
import { user } from '@api';
import Images from '@assets';
import faker from 'faker';
import { SharedElement } from 'react-native-shared-element';
const AVATAR_SIZE = 50;
const SPACING = 20;
export const UserList = ({ navigation }) => {
  const [paramSearch, setParamSearch] = React.useState(null);
  let onEndReachedCalledDuringMomentum = true;

  const modalRef = React.useRef(null);
  const {
    data: users,
    isLoading,
    isError,
    isFetching,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = user.useGetUsers();

  // const {
  //   data: search_peoples,
  //   isLoading: isSearchLoading,
  //   isError: isSearchError,
  //   isFetching: isSearchFetching,
  //   isSuccess: isSearchSuccess,
  // } = people.useGetAllPeople(paramSearch);

  const onLoadMore = () => {
    if (hasNextPage && !onEndReachedCalledDuringMomentum) {
      onEndReachedCalledDuringMomentum = true;
      fetchNextPage();
    }
  };

  const onSubmitSearch = (params) => {
    setParamSearch(params);
  };

  // const onChangePage = (page) => () => {
  //   setPage(page);
  //   fetchPeoples(page);
  // };

  const onGoToDetail = (item) => () => {
    navigation.navigate('UserDetail', { item });
  };
  const onGoToCreate = () => {
    navigation.navigate('UserForm');
  };
  renderItem = ({ item, index }) => {
    return item?.data?.map((user, index) => {
      const { email, first_name, avatar, last_name, id } = user;
      const phone = faker.phone.phoneNumberFormat();
      return (
        <TouchableOpacity
          key={index + ''}
          style={styles.containerItem}
          onPress={onGoToDetail({ ...user, phone })}
        >
          <SharedElement id={`item.${id}.image`}>
            <CustomImage
              style={styles.avatarStyle}
              source={{
                uri: avatar,
              }}
            />
          </SharedElement>

          <View>
            <Text style={styles.txtName}>
              {first_name} {last_name}
            </Text>
            <Text style={styles.txtBirthday}>
              <Text style={{ fontWeight: 'bold' }}>Email: </Text>
              {email}
            </Text>
            <Text style={styles.txtBirthday}>
              <Text style={{ fontWeight: 'bold' }}>Phone: </Text>
              {phone}
            </Text>
          </View>
        </TouchableOpacity>
      );
    });
  };

  const renderSearchItem = ({ item, index }) => {
    const { name, birth_year, gender, url } = item;
    const id = url?.split('/').slice(-2)[0];
    const avatar_url = `https://randomuser.me/api/portraits/${faker.helpers.randomize(
      ['women', 'men']
    )}/${faker.random.number(60)}.jpg`;

    return (
      <TouchableOpacity
        key={index + ''}
        style={styles.containerItem}
        onPress={onGoToDetail({
          id,
          avatar_url,
        })}
      >
        <Image
          style={styles.avatarStyle}
          source={{
            uri: avatar_url,
          }}
        />
        <View>
          <Text style={styles.txtName}>{name}</Text>
          <Text style={styles.txtBirthday}>
            <Text style={{ fontWeight: 'bold' }}>BirthDay: </Text>
            {birth_year}
          </Text>
          <Text style={styles.txtGender}>
            <Text style={{ fontWeight: 'bold' }}>Gender: </Text>
            {gender}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderFooter = () => {
    return isFetchingNextPage && <ActivityIndicator animating size="small" />;
  };

  if (isLoading) return <ActivityIndicator animating color="#a87332" />;
  if (isError) return <Text style={styles.txtLoading}>{error.message}</Text>;
  return (
    <View style={{ flex: 1 }}>
      <Image
        style={StyleSheet.absoluteFillObject}
        source={Images.background}
        blurRadius={10}
      />
      <HeaderSearchBar
        ref={modalRef}
        title="User"
        renderItem={renderSearchItem}
        // onSubmit={onSubmitSearch}
        data={[]}
        // loading={isSearchFetching || isSearchLoading}
        // success={isSearchSuccess}
      />
      <FlatList
        contentContainerStyle={{
          padding: SPACING,
        }}
        refreshing={isFetching}
        onRefresh={refetch}
        keyExtractor={(_, index) => index + ''}
        data={users?.pages ?? []}
        renderItem={renderItem}
        ListFooterComponent={renderFooter}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.1}
        removeClippedSubviews={true}
        initialNumToRender={20}
        maxToRenderPerBatch={5}
        onMomentumScrollBegin={() => {
          onEndReachedCalledDuringMomentum = false;
        }}
      />

      <Add
        size={25}
        backgroundColor="#00b82e"
        style={styles.icon}
        onPress={onGoToCreate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerItem: {
    flex: 1,
    flexDirection: 'row',
    padding: SPACING,
    marginBottom: SPACING,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    backgroundColor: '#FFF',
  },
  txtLoading: { color: '#eb4034' },
  avatarStyle: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE,
    marginRight: SPACING,
  },
  txtName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  txtGender: {
    fontSize: 14,
    opacity: 0.8,
  },
  txtBirthday: {
    fontSize: 14,
    opacity: 0.7,
    marginVertical: 5,
  },
  txtPage: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  pageStyle: {
    height: AVATAR_SIZE,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  buttonStyle: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: 6,
    backgroundColor: '#fff',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING,
  },
  searchStyle: {
    // flex: 1,
    height: AVATAR_SIZE,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#0a0101',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING * 2,
    marginHorizontal: SPACING,
    backgroundColor: '#e3e1e1',
  },
  inputStyle: {
    flex: 1,
    width: '100%',
    fontSize: 14,
    paddingHorizontal: 10,
  },
  icon: {
    position: 'absolute',
    bottom: 40,
    right: 20,
  },
});
