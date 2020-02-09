import React, { useContext, useEffect, useState } from 'react';
import { StatusBar, SafeAreaView, TouchableOpacity, YellowBox } from 'react-native';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import UserAvatar from '../components/UserAvatar';
import ViewSelector from '../components/ViewSelector';
import PersonalOverview from '../components/PersonalOverview';
import Summary from '../components/Summary';
import { Context as BlogContext } from '../context/BlogContext';
import { Context as UserContext } from '../context/AuthContext';
import { Context as UserList } from '../context/UserContext';
import modalStyle from '../style/modalStyle';

const OverviewScreen = ({ navigation }) => {
  const { state, getBlogPosts } = useContext(BlogContext);
  const { getUser, state: user } = useContext(UserContext);
  // true for Personal, false for Team
  const [view, setView] = useState(true);
  const buttons = ['My Summary', 'Team Summary'];
  const { getAllUser } = useContext(UserList);
  const [userId, setUserId] = useState("");
  const [userRole, setUserRole] = useState("")

  useEffect(() => {
    getBlogPosts();
    // getUser();
    Array.isArray(user) && setUserId(user[0]._id)
    Array.isArray(user) && setUserRole(user[0].role)
    getAllUser()

    if (userRole === 'Manager') {

    }

    const listener = navigation.addListener('didFocus', () => {
      getBlogPosts();
      Array.isArray(user) && setUserId(user[0]._id)
      Array.isArray(user) && setUserRole(user[0].role)
    });
    return () => {
      listener.remove();
    };
  }, []);

  YellowBox.ignoreWarnings([
    'VirtualizedLists should never be nested', //Remove when expo fixed
    'Possible Unhandled Promise Rejection'
  ])

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.screen}>
        <View style={styles.overviewContainer}>
          <PersonalOverview blogPosts={state} userId={userId} />
        </View>
        {userRole === "Manager" &&
          <ViewSelector buttons={buttons} setView={v => setView(v)} src='overview' />
        }
        <View style={styles.overviewContainer}>
          <Summary blogPosts={state} userId={userId} view={view} />
        </View>
      </ScrollView>
    </SafeAreaView>
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
  switchView: {
    ...modalStyle.shadowContainer3,
    alignSelf: 'flex-end',
    marginHorizontal: 15,
    width: 140,
    borderRadius: 16,
  },
  switch: {
    paddingVertical: 2,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
  }
});

export default OverviewScreen;
