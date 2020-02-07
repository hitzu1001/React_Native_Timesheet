import React, { useEffect, useContext, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Alert, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import iconStyle from '../style/iconStyle';
import { Calendar } from 'react-native-calendars';
import UserAvatar from '../components/UserAvatar';
import { Context as BlogContext } from '../context/BlogContext';
import moment from 'moment';

const ScheduleScreen = ({ navigation }) => {
  const { state, getBlogPosts } = useContext(BlogContext);
  const today = moment(new Date()).format('YYYY-MM-DD')
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTask, setSelectedTask] = useState([]);
  const [markedTask, setMarkedTask] = useState({});
  const [markedDate, setMarkedDate] = useState({})

  useEffect(() => {
    getBlogPosts();

    let initialDates = {};
    for (let i = 0; i < state.length; i++) {
      let date = moment(state[i].startTime).format('YYYY-MM-DD')
      initialDates = { ...initialDates, [date]: { marked: true, selectedColor: '#FF7F50', } }
    }
    
    setMarkedTask(initialDates);
  }, []);

  useEffect(() => {
    let filteredTask = []
    for (let i = 0; i < state.length; i++) {
      if (moment(state[i].startTime).isSame(selectedDate, 'day')) {
        filteredTask.push(state[i])
      }
    }
    setSelectedTask(filteredTask)
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

  return (
    <View>
      <ScrollView>
        <View style={styles.calendar}>
          <Calendar
            onDayPress={(day) => {
              setSelectedDate(day.dateString);
            }}
            markedDates={markedDate}
            theme={{
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
            }}
          />
        </View>
      </ScrollView>
      <View>
        <Text style={styles.selectedDate}>{moment(selectedDate).format('DD-MM-YYYY')}</Text>
        <FlatList
          // style={{ marginTop: 10, borderTopWidth: 1, borderColor: '#d3d3d3' }}
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

const styles = StyleSheet.create({
  calendar: {
    // margin: 5,
    // borderWidth: 3,
    // borderColor: 'pink'
  },
  selectedDate: {
    marginTop: 10,
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
  // timeDiff: {
  //   fontSize: 12,
  //   alignSelf: 'flex-end',
  //   // fontWeight: 'bold',
  //   color: '#a9a9a9'
  // },
});

export default ScheduleScreen;
