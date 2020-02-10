import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import Spacer from '../components/Spacer';
import { withNavigation } from 'react-navigation';

const NavLink = ({ navigation, routeName, text }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
      <Text style={styles.link}>{text}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  link: {
    marginHorizontal: 30,
    paddingVertical: 20,
    color: '#20b2aa',
  }
});
export default withNavigation(NavLink);
