import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';

const ScheduleScreen = () => {
  return (
    <SafeAreaView>
      <Text style={styles.header}>ScheduleScreen</Text>
    </SafeAreaView>
  );
};

ScheduleScreen.navigationOptions = {
  title: 'Schedule',
  tabBarIcon: <FontAwesome name='calendar' size={20} color='gray'/>
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: 'lightgray',
  },
});

export default ScheduleScreen;