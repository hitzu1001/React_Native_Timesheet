import React, { useState } from 'react';
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
import NoteEditScreen from './src/screens/NoteEditScreen';
import ScheduleScreen from './src/screens/ScheduleScreen';
import MoreScreen from './src/screens/MoreScreen';
import PhotoEditScreen from './src/screens/PhotoEditScreen';
import PhotoShowScreen from './src/screens/PhotoShowScreen';
import TimeOffScreen from './src/screens/TimeOffScreen';
import TaskListScreen from './src/screens/TaskListScreen';
import CreateTaskScreen from './src/screens/CreateTaskScreen';
import EditTaskScreen from './src/screens/EditTaskScreen';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as BlogProvider } from './src/context/BlogContext';
import { Provider as ImageProvider } from './src/context/ImageContext';
import { Provider as TaskProvider } from './src/context/TaskContext';
import { Provider as UserProvider } from './src/context/UserContext';
import { setNavigator } from './src/navigationRef';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const overviewFlow = createStackNavigator({
  Overview: OverviewScreen,
})
overviewFlow.navigationOptions = {
  title: 'Overview',
  tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='view-dashboard-outline'
    size={22} color={tintColor} />,
  tabBarOptions: {
    labelStyle: { fontWeight: '500', },
    activeTintColor: '#20b2aa',
  }
}

const timesheetFlow = createStackNavigator({
  Timesheet: TimesheetScreen,
  Show: ShowScreen,
  Create: CreateScreen,
  Edit: EditScreen,
  NoteEdit: NoteEditScreen,
  PhotoEdit: PhotoEditScreen,
  PhotoShow: PhotoShowScreen,
})
timesheetFlow.navigationOptions = {
  title: 'Timesheets',
  tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='format-list-bulleted'
    size={22} color={tintColor} />,
  tabBarOptions: {
    labelStyle: { fontWeight: '500', },
    activeTintColor: '#20b2aa',
  }
}

const scheduleFlow = createStackNavigator({
  Schedule: ScheduleScreen,
})
scheduleFlow.navigationOptions = {
  title: 'Schedule',
  tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='calendar-multiselect'
    size={22} color={tintColor} />,
  tabBarOptions: {
    labelStyle: { fontWeight: '500', },
    activeTintColor: '#20b2aa',
  }
}

const moreFlow = createStackNavigator({
  More: MoreScreen,
  TimeOff: TimeOffScreen,
  TaskList: TaskListScreen,
  CreateTask: CreateTaskScreen,
  EditTask: EditTaskScreen,
})
moreFlow.navigationOptions = {
  title: 'More',
  tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='dots-horizontal'
    size={24} color={tintColor} />,
  tabBarOptions: {
    labelStyle: { fontWeight: '500', },
    activeTintColor: '#20b2aa',
  }
}

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Signin: SigninScreen,
    Signup: SignupScreen
  }),
  mainFlow: createBottomTabNavigator({
    overviewFlow,
    timesheetFlow,
    scheduleFlow,
    moreFlow
  })
});

const App = createAppContainer(switchNavigator);

export default () => {
  const [screenState, setScreenState] = useState(true);
  return (
    <UserProvider>
      <BlogProvider>
        <TaskProvider>
          <ImageProvider>
            <AuthProvider>
              <App
                ref={navigator => { setNavigator(navigator) }}
                screenProps={{
                  screenState,
                  setScreenState: (st) => setScreenState(st)
                }}
              />
            </AuthProvider>
          </ImageProvider>
        </TaskProvider>
      </BlogProvider>
    </UserProvider>
  );
}
