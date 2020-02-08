import React, { useContext, useEffect, useState } from 'react';
import { StatusBar, SafeAreaView } from 'react-native';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import UserAvatar from '../components/UserAvatar';
import PersonalOverview from '../components/PersonalOverview';
import TeamSummary from '../components/TeamSummary';
import { Context as BlogContext } from '../context/BlogContext';
import { Context as UserContext } from '../context/AuthContext';
import modalStyle from '../style/modalStyle';

const OverviewScreen = ({ navigation }) => {
  const { state, getBlogPosts } = useContext(BlogContext);
  const { getUser, state: user } = useContext(UserContext);
  const [userId, setUserId]  = useState("")
  let [personalSchedule, setPersonalSchedule] = useState([])
  // let personalSchedule = []

  useEffect(() => {
    getBlogPosts();
    getUser();
    Array.isArray(user) && setUserId(user[0]._id)

    const listener = navigation.addListener('didFocus', () => {
      getBlogPosts();
      Array.isArray(user) && setUserId(user[0]._id)
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
          <PersonalOverview blogPosts={state} userId={userId}/>
        </View>
        {/* <View style={styles.overviewContainer}>
          <TeamSummary blogPosts={state} />
        </View> */}
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
