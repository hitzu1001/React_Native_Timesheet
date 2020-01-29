import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import SignupScreen from './src/screens/SignupScreen';
import SigninScreen from './src/screens/SigninScreen';
import OverviewScreen from './src/screens/OverviewScreen';
import TimesheetScreen from './src/screens/TimesheetScreen';
import ShowScreen from './src/screens/ShowScreen';
import CreateScreen from './src/screens/CreateScreen';
import EditScreen from './src/screens/EditScreen';
import ScheduleScreen from './src/screens/ScheduleScreen';
import MoreScreen from './src/screens/MoreScreen';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as BlogProvider } from './src/context/BlogContext';
import { setNavigator } from './src/navigationRef';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const timesheetFlow = createStackNavigator({
  Timesheet: TimesheetScreen,
  Show: ShowScreen,
  Create: CreateScreen,
  Edit: EditScreen,
})

timesheetFlow.navigationOptions = {
  title: 'Timesheets',
  tabBarIcon: <MaterialCommunityIcons name='playlist-edit' size={26} color='gray' />
}

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen
  }),
  mainFlow: createBottomTabNavigator({
    Overview: OverviewScreen,
    timesheetFlow,
    Schedule: ScheduleScreen,
    More: MoreScreen,
  })

});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <BlogProvider>
      <AuthProvider>
        <App ref={navigator => { setNavigator(navigator) }} />
      </AuthProvider>
    </BlogProvider>
  );
}
