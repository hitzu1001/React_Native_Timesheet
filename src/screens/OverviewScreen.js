import React, { useContext, useEffect } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Context as BlogContext } from '../context/BlogContext';
import ProgressChart from '../components/ProgressChart'
import BarComponent from '../components/BarComponent'
// import { StackedBarChart, ProgressCircle } from 'react-native-svg-charts'
import { Text, G } from 'react-native-svg'

const OverviewScreen = ({ navigation }) => {
  const { getBlogPosts } = useContext(BlogContext);
  useEffect(() => {
    getBlogPosts();
    const listener = navigation.addListener('didFocus', () => {
      getBlogPosts();
    });

    return () => {
      listener.remove();
    };
  }, []);


  return (
    <ScrollView style={styles.headerContainer}>
      <Text style={styles.header}>OverviewScreen</Text>
      <BarComponent />
      <ProgressChart />
    </ScrollView>
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
