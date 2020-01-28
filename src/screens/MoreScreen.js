import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';

const MoreScreen = () => {
  return (
    <SafeAreaView>
      <Text style={styles.header}>MoreScreen</Text>
    </SafeAreaView>
  );
};

MoreScreen.navigationOptions = {
  title: 'More',
  tabBarIcon: <FontAwesome name='gear' size={24} color='gray'/>
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: 'lightgray',
    borderBottomColor: 'gray',
    borderBottomWidth: 2,
  },
});

export default MoreScreen;