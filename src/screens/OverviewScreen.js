import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const OverviewScreen = () => {
  return (
    <SafeAreaView style={styles.headerContainer}>
      <Text style={styles.header}>OverviewScreen</Text>
    </SafeAreaView>
  );
};

OverviewScreen.navigationOptions = {
  title: 'Overview',
  tabBarIcon: <MaterialCommunityIcons name='view-dashboard-outline' size={22} color='gray' />
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: 'lightgray',
  },
});

export default OverviewScreen;
