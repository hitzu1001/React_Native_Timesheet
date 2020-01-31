import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';

const ScheduleScreen = () => {
  return (
    <View>
      <Text style={styles.header}>ScheduleScreen</Text>
    </View>
  );
};

ScheduleScreen.navigationOptions = ({ navigation }) => {
  return {
    title: 'Schedule',
    headerLeft: <Avatar rounded title="TS" containerStyle={styles.avatar} />,
    headerRight: <TouchableOpacity onPress={() => {}}>
      <FontAwesome style={styles.searchIcon} name='search' />
    </TouchableOpacity>,
  };
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
  },
  searchIcon: {
    fontSize: 20,
    color: '#20b2aa',
    marginRight: 20,
  },
  avatar: {
    marginLeft: 20
  }
});

export default ScheduleScreen;