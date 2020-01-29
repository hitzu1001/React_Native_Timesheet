import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TimesheetScreen = () => {
  return (
    <SafeAreaView>
      <Text style={styles.header}>TimesheetScreen</Text>
    </SafeAreaView>
  );
};

TimesheetScreen.navigationOptions = {
  title: 'Timesheet',
  tabBarIcon: <MaterialCommunityIcons name='playlist-edit' size={26} color='gray'/>
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: 'lightgray',
  },
});

export default TimesheetScreen;