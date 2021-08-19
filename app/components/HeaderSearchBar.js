import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  FlatList,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CustomModal } from './CustomModal';
const ICON_SIZE = 30;
const SPACING = 20;
export const HeaderSearchBar = ({
  title='React Query',
  data = [],
  renderItem,
  onSubmit,
  loading,
  success,
}) => {
  const [visible, setSearchBar] = React.useState(false);
  const [searchKey, setSearchKey] = React.useState(null);
  const [list, setList] = React.useState([]);

  React.useEffect(() => {
    setList(data);
  }, [data]);

  const openModalSearch = () => {
    setSearchBar(true);
  };
  const closeModalSearch = () => {
    setSearchBar(false);
    setSearchKey(null);
    setList([]);
  };
  const onSubmitSearch = () => {
    if (typeof onSubmit === 'function') {
      onSubmit({ search: searchKey });
    }
  };

  const onChangeValue = (val) => setSearchKey(val);
  const SearchBar = () => {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={styles.searchBarStyle}>
          <Icon name="arrow-left" size={20} onPress={closeModalSearch} />
          <View style={styles.searchStyle}>
            <TextInput
              style={styles.inputStyle}
              value={searchKey}
              onChangeText={onChangeValue}
              autoFocus={true}
              placeholder="Search..."
              onSubmitEditing={onSubmitSearch}
            />
          </View>
        </View>
        {loading && (
          <ActivityIndicator
            animating
            color="#a87332"
            style={{ padding: SPACING }}
          />
        )}
        {success && (
          <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={{
              padding: SPACING,
            }}
            keyExtractor={(_, index) => index + ''}
            data={list}
            renderItem={renderItem}
            removeClippedSubviews={true}
            initialNumToRender={20}
            maxToRenderPerBatch={5}
          />
        )}
      </View>
    );
  };
  return (
    <React.Fragment>
      <View style={styles.container}>
        <Text style={styles.txtTitle}>{title}</Text>
        <View>
          <TouchableOpacity onPress={openModalSearch}>
            <View style={styles.iconStyle}>
              <Icon name="search" size={15} />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {
        <CustomModal visible={visible}>
          <SearchBar />
        </CustomModal>
      }
    </React.Fragment>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: StatusBar.currentHeight || 42,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.3,
    borderBottomColor: '#465249',
    backgroundColor: '#FFF',
  },
  txtTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#465249',
  },
  iconStyle: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE,
    backgroundColor: '#e3e1e1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBarStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingTop: SPACING * 2,
    paddingHorizontal: SPACING,
  },
  searchStyle: {
    flex: 1,
    height: ICON_SIZE + 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e3e1e1',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: SPACING / 2,
    backgroundColor: '#e3e1e1',
  },
  inputStyle: {
    flex: 1,
    width: '100%',
    fontSize: 14,
    paddingHorizontal: 10,
  },
});