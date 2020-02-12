import React from 'react';
import { StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements';

const SearchTimesheet = ({ search, setSearch }) => {
  return (
    <SearchBar
      placeholder="Type Here..."
      onChangeText={setSearch}
      value={search}
      containerStyle={styles.containerStyle}
      inputContainerStyle={styles.inputContainerStyle}
      // placeholderTextColor='#20b2aa'
      searchIcon={{ size: 20, color: '#20b2aa' }}
      inputStyle={styles.inputStyle}
      autoCapitalize='none'
    />
  )
}
const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: '#fff',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  inputContainerStyle: {
    marginHorizontal: 5,
    marginTop: -10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#dcdcdc',
    borderBottomWidth: 1,
  },
  placeholderTextColor: {
    color: '#20b2aa'
  },
  inputStyle: {
    fontSize: 14,
    color: '#333',
    paddingVertical: 0,
  }
});
export default SearchTimesheet
