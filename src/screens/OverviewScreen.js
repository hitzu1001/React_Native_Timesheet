import React, { useContext, useEffect, useState } from 'react';
import { StatusBar, SafeAreaView, TouchableOpacity } from 'react-native';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import UserAvatar from '../components/UserAvatar';
import PersonalOverview from '../components/PersonalOverview';
import Summary from '../components/Summary';
import { Context as BlogContext } from '../context/BlogContext';
import { Context as UserContext } from '../context/AuthContext';
import modalStyle from '../style/modalStyle';

const OverviewScreen = ({ navigation }) => {
  const { state, getBlogPosts } = useContext(BlogContext);
  // true for Personal, false for Team
  const [summaryView, setsummaryView] = useState(true);
  const { getUser, state: user } = useContext(UserContext);
  const [userId, setUserId]  = useState("");

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
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.screen}>
        <View style={styles.overviewContainer}>
          <PersonalOverview blogPosts={state} userId={userId} />
        </View>
        <TouchableOpacity
          style={{ ...styles.switchView, backgroundColor: summaryView ? '#fff' : '#20b2aa' }}
          onPress={() => setsummaryView(!summaryView)}
        >
          {summaryView
            ? <Text style={{ ...styles.switch, color: summaryView ? '#20b2aa' : '#fff' }}>
              Personal Summary
              </Text>
            : <Text style={{ ...styles.switch, color: summaryView ? '#20b2aa' : '#fff' }}>
              Team Summary
              </Text>
          }
        </TouchableOpacity>
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
    fontWeight: '600',
  }
});

export default OverviewScreen;
