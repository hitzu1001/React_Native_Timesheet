import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const OverviewScreen = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.header}>OverviewScreen</Text>
    </View>
  );
};

OverviewScreen.navigationOptions = ({ navigation }) => {
  return {
    title: 'Overview',
    // headerStyle: {
    //   backgroundColor: '#20b2aa',
    // },
    // headerTintColor: 'black',
    // headerTitleStyle: {
    //   fontWeight: 'bold',
    // },
    headerLeft: <Avatar rounded title="TS" containerStyle={styles.avatar} />,
  };
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
  },
  avatar: {
    marginLeft: 20
  }
});

export default OverviewScreen;
