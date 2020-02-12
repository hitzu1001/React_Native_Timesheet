import React, { useContext, useEffect, useState } from 'react';
import { StatusBar, SafeAreaView, YellowBox } from 'react-native';
import { View, ScrollView, StyleSheet } from 'react-native';
import UserAvatar from '../components/UserAvatar';
import ViewSelector from '../components/ViewSelector';
import PersonalOverview from '../components/PersonalOverview';
import Summary from '../components/Summary';
import { Context as TimesheetContext } from '../context/TimesheetContext';
import { Context as UserContext } from '../context/AuthContext';
import { Context as UserList } from '../context/UserContext';
import modalStyle from '../style/modalStyle';

const OverviewScreen = ({ navigation }) => {
  const { state, getTimesheets } = useContext(TimesheetContext);
  const { state: user } = useContext(UserContext);
  // true for Personal, false for Team
  const [view, setView] = useState(true);
  const buttons = ['My Summary', 'Team Summary'];
  const { getAllUser } = useContext(UserList);
  const [userId, setUserId] = useState('');
  const [userRole, setUserRole] = useState('')

  useEffect(() => {
    getTimesheets();
    getAllUser()
    Array.isArray(user) && setUserId(user[0]._id)
    Array.isArray(user) && setUserRole(user[0].role)

    const listener = navigation.addListener('didFocus', () => {
      getTimesheets();
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
      <StatusBar barStyle='dark-content' />
      <ScrollView style={styles.screen}>
        <View style={styles.overviewContainer}>
          <PersonalOverview timesheets={state} userId={userId} />
        </View>
        {userRole === 'Manager' &&
          <ViewSelector buttons={buttons} setView={v => setView(v)} src='overview' />
        }
        <View style={styles.overviewContainer}>
          <Summary timesheets={state} userId={userId} view={view} />
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
    marginVertical: 15,
    marginHorizontal: 15,
    paddingBottom: 15,
  },
});

export default OverviewScreen;
