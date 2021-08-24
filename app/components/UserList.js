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
import { HeaderSearchBar, CustomImage, Add, CustomPicker } from '@components';
import { user } from '@api';
import Images from '@assets';
import faker from 'faker';
import { SharedElement } from 'react-native-shared-element';
import { useQueryClient } from 'react-query';
const AVATAR_SIZE = 50;
const SPACING = 20;
const STATUS = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
];
export const UserList = ({ navigation }) => {
  const queryClient = useQueryClient();
  const [paramSearch, setParamSearch] = React.useState(null);
  const [status, setStatus] = React.useState(null);
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
  } = user.useGetUsers(status);

  const {
    data: search_users,
    isLoading: isSearchLoading,
    isError: isSearchError,
    isFetching: isSearchFetching,
    isSuccess: isSearchSuccess,
  } = user.useSearchUser(paramSearch);

  const onLoadMore = () => {
    if (hasNextPage && !onEndReachedCalledDuringMomentum) {
      onEndReachedCalledDuringMomentum = true;
      fetchNextPage();
    }
  };

  const onSubmitSearch = (params) => {
    setParamSearch({ name: params?.search });
  };

  const onGoToDetail = (item) => () => {
    navigation.navigate('UserDetail', { item });
    modalRef.current?.forceQuit();
  };
  const onGoToCreate = () => {
    navigation.navigate('UserForm');
  };

  renderItem = ({ item, index }) => {
    return item?.data?.map((user, index) => {
      const { email, avatar, name, id, status } = user;
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

          <View style={{ flex: 1 }}>
            <Text style={styles.txtName}>{name}</Text>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={styles.txtBirthday}
            >
              <Text style={{ fontWeight: 'bold' }}>Email: </Text>
              {email}
            </Text>
            <Text style={styles.txtBirthday}>
              <Text style={{ fontWeight: 'bold' }}>Phone: </Text>
              {phone}
            </Text>
            <Text
              style={[
                styles.txtBirthday,
                {
                  fontWeight: 'bold',
                  color: status === 'active' ? 'green' : 'red',
                },
              ]}
            >
              <Text
                style={{
                  color: 'black',
                }}
              >
                Status:{' '}
              </Text>
              {status}
            </Text>
          </View>
        </TouchableOpacity>
      );
    });
  };

  const renderSearchItem = ({ item, index }) => {
    const { email, avatar, name, id, gender } = item;
    const phone = faker.phone.phoneNumberFormat();
    return (
      <TouchableOpacity
        key={index + ''}
        style={styles.containerItem}
        onPress={onGoToDetail({ ...item, phone })}
      >
        <SharedElement id={`item.${id}.image`}>
          <CustomImage
            style={styles.avatarStyle}
            source={{
              uri: avatar,
            }}
          />
        </SharedElement>

        <View style={{ flex: 1 }}>
          <Text style={styles.txtName}>{name}</Text>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={styles.txtBirthday}
          >
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
  };

  const renderFooter = () => {
    return isFetchingNextPage && <ActivityIndicator animating size="small" />;
  };

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
        onSubmit={onSubmitSearch}
        data={search_users?.data ?? []}
        loading={isSearchFetching || isSearchLoading}
        success={isSearchSuccess}
      />
      <CustomPicker
        value={status}
        items={STATUS}
        placeholder="Select status"
        onChangeValue={(value) => setStatus(value)}
      />

      <FlatList
        contentContainerStyle={{
          padding: SPACING,
        }}
        refreshing={isFetching || isLoading}
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
    padding: SPACING - 10,
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
