import React, { useEffect, useContext, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Alert, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import iconStyle from '../style/iconStyle';
import { Calendar } from 'react-native-calendars';
import UserAvatar from '../components/UserAvatar';
import { Context as BlogContext } from '../context/BlogContext';
import { Context as UserContext } from '../context/AuthContext';
import modalStyle from '../style/modalStyle';
import moment from 'moment';

const ScheduleScreen = ({ navigation }) => {
  const { state, getBlogPosts } = useContext(BlogContext);
  const { state: user, getUser } = useContext(UserContext);
  const today = moment(new Date()).format('YYYY-MM-DD')
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTask, setSelectedTask] = useState([]);
  const [markedTask, setMarkedTask] = useState({});
  const [markedDate, setMarkedDate] = useState({})
  const [summaryView, setsummaryView] = useState(true);
  const [userRole, setUserRole] = useState('Employee')
  let personalTasks = []
  let filteredTasks = []
  

  useEffect(() => {
    getBlogPosts();
    getUser()
    Array.isArray(user) && setUserRole(user[0].role)
    personalTasks = state.filter(task => task.userId === user[0]._id)
    filteredTasks = selectTasks(summaryView)
    let initialDates = {};

    for (let i = 0; i < filteredTasks.length; i++) {
      let date = moment(filteredTasks[i].startTime).format('YYYY-MM-DD')
      initialDates = { ...initialDates, [date]: { marked: true, selectedColor: '#FF7F50', } }
    }

    setMarkedTask(initialDates);
  }, [summaryView]);

  useEffect(() => {
    getBlogPosts();
    getUser()
    Array.isArray(user) && setUserRole(user[0].role)
    let dayTasks = []
    personalTasks = state.filter(task => task.userId === user[0]._id)
    filteredTasks = selectTasks(summaryView)

    for (let i = 0; i < filteredTasks.length; i++) {
      if (moment(filteredTasks[i].startTime).isSame(selectedDate, 'day')) {
        dayTasks.push(state[i])
      }
    }
    
    setSelectedTask(dayTasks)
    let selectedColor = (selectedDate === today) ? '#FF7F50' : '#20b2aa';
    let labeledDate = {
      ...markedTask, [selectedDate]: {
        selected: true,
        selectedColor: selectedColor,
        disableTouchEvent: true,
        selectedDotColor: 'orange',
      }
    }
    setMarkedDate(labeledDate)
  }, [markedTask, selectedDate])

  
  function selectTasks(summaryView) {
    if (summaryView) {
      return personalTasks
    } else {
      return state
    }
  }

  return (
    <View>
      {userRole === "Manager" && <TouchableOpacity
        style={{
          ...styles.switchView,
          backgroundColor: summaryView ? '#fff' : '#20b2aa',
          borderColor: summaryView ? '#fff' : '#20b2aa'
        }}
        onPress={() => setsummaryView(!summaryView)}
      >
        <Text style={{ ...styles.switch, color: summaryView ? '#20b2aa' : '#fff' }}>
          {summaryView ? 'Personal Summary' : 'Team Summary'}
        </Text>
      </TouchableOpacity>}
      <ScrollView>
        <View style={styles.calendar}>
          <Calendar
            onDayPress={(day) => {
              setSelectedDate(day.dateString);
            }}
            markedDates={markedDate}
            theme={themeStyle}
          />
        </View>
      </ScrollView>
      <View>
        <Text style={styles.selectedDate}>{moment(selectedDate).format('DD-MM-YYYY')}</Text>
        <FlatList
          data={selectedTask}
          keyExtractor={(blogPost) => blogPost._id}
          renderItem={({ item }) => {
            var timeDiff = parseInt(moment(item.endTime).diff(moment(item.startTime), 'minutes'));
            var hours = (timeDiff - timeDiff % 60) / 60;
            var minutes = timeDiff % 60;
            return (
              <View style={styles.row}>
                <TouchableOpacity
                  style={styles.taskContainer}
                  onPress={() => navigation.navigate('Show', { id: item._id })}
                >
                  <Text style={styles.task}>{item.task}</Text>
                  <Text style={styles.time}>
                    {moment(item.startTime).format('LT')} - {moment(item.endTime).format('LT')}
                  </Text>
                  {/* <Text style={styles.timeDiff}>{hours} hours {minutes} minutes</Text> */}
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

ScheduleScreen.navigationOptions = () => {
  return {
    title: 'Schedule',
    headerLeft: <UserAvatar />,
    headerRight: (
      <TouchableOpacity style={iconStyle.iconTouchRight} onPress={() => { }}>
        <Ionicons style={iconStyle.searchIcon} name='ios-search' />
      </TouchableOpacity>
    )
  };
};

const themeStyle = {
  calendarBackground: '#ffffff',
  todayTextColor: '#ff7f50',
  arrowColor: '#20b2aa',
  dotColor: '#20b2aa',
  textDayFontWeight: '500',
  textMonthFontWeight: '500',
  textDayHeaderFontWeight: '500',
  textDayFontSize: 18,
  textMonthFontSize: 18,
  textDayHeaderFontSize: 14,
}

const styles = StyleSheet.create({
  calendar: {
    ...modalStyle.shadowContainer3,
    margin: 15,
    paddingBottom: 5,
  },
  selectedDate: {
    marginBottom: 5,
    paddingHorizontal: 25,
    color: '#808080',
    fontSize: 12,
    fontWeight: '500'
  },
  row: {
  },
  taskContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#909090',
    backgroundColor: '#909090',
    alignSelf: 'stretch',
  },
  task: {
    paddingBottom: 5,
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  time: {
    fontSize: 12,
    color: '#ffffff',
  },
  switchView: {
    ...modalStyle.shadowContainer3,
    alignSelf: 'flex-end',
    marginHorizontal: 15,
    width: 140,
    borderRadius: 16,
  },
  // timeDiff: {
  //   fontSize: 12,
  //   alignSelf: 'flex-end',
  //   // fontWeight: 'bold',
  //   color: '#a9a9a9'
  // },
});

export default ScheduleScreen;
