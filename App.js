import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import SignupScreen from './src/screens/SignupScreen';
import SigninScreen from './src/screens/SigninScreen';
import OverviewScreen from './src/screens/OverviewScreen';
import TimesheetScreen from './src/screens/TimesheetScreen';
import ScheduleScreen from './src/screens/ScheduleScreen';
import MoreScreen from './src/screens/MoreScreen';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { setNavigator } from './src/navigationRef';

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen
  }),
  mainFlow: createBottomTabNavigator({
    Overview: OverviewScreen,
    Timesheet: TimesheetScreen,
    Schedule: ScheduleScreen,
    More: MoreScreen,
  })
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <AuthProvider>
      <App ref={navigator => { setNavigator(navigator) }} />
    </AuthProvider>
  );
}
