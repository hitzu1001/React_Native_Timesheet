import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import iconStyle from '../style/iconStyle';

const ScheduleScreen = () => {
  return (
    <View>
      <Text style={styles.header}>ScheduleScreen</Text>
    </View>
  );
};

ScheduleScreen.navigationOptions = () => {
  return {
    title: 'Schedule',
    headerLeft: <Avatar rounded title="TS" containerStyle={styles.avatar} />,
    headerRight: <TouchableOpacity style={iconStyle.iconTouchRight}
      onPress={() => { }}>
      <Ionicons style={iconStyle.searchIcon} name='ios-search' />
    </TouchableOpacity>,
  };
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
  },
  avatar: {
    marginLeft: 20
  },
});

export default ScheduleScreen;