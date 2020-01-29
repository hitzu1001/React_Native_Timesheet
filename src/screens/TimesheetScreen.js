import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TimeSheetForm from '../components/TimeSheetForm'


const TimesheetScreen = () => {
  return (
    <SafeAreaView>
      <Text style={styles.header}>TimesheetScreen</Text>
      <TimeSheetForm/>
    </SafeAreaView>
  );
};

TimesheetScreen.navigationOptions = {
  title: 'Timesheet',
  tabBarIcon: <MaterialCommunityIcons name='chart-timeline' size={24} color='gray'/>
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: 'lightgray',
    borderBottomColor: 'gray',
    borderBottomWidth: 2,
  },
});

export default TimesheetScreen;