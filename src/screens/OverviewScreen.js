import React, { useContext, useEffect, useState } from 'react';
import { StatusBar, SafeAreaView } from 'react-native';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import UserAvatar from '../components/UserAvatar';
import PersonalOverview from '../components/PersonalOverview';
import TeamOverview from '../components/TeamOverview';
import { Context as BlogContext } from '../context/BlogContext';
import modalStyle from '../style/modalStyle';
// import { StackedBarChart, ProgressCircle } from 'react-native-svg-charts'

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
    <SafeAreaView >
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.screen}>
        <View style={styles.overviewContainer}>
          <PersonalOverview />
        </View>
        <View style={styles.overviewContainer}>
          <TeamOverview />
        </View>
      </ScrollView>
    </SafeAreaView >
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
    headerLeft: <UserAvatar />,
  };
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
  },
  screen: {
    backgroundColor: '#f6f6f6',
  },
  overviewContainer: {
    ...modalStyle.shadowContainer3,
    marginBottom: 15,
    marginTop: 15,
    marginHorizontal: 15,
    paddingBottom: 15,
  },
});

export default OverviewScreen;
