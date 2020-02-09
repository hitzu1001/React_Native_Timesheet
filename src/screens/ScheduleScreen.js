import React, { useEffect, useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import Modal from 'react-native-modal';
import UserAvatar from '../components/UserAvatar';
import ScheduleModal from '../components/ScheduleModal';
import { Context as BlogContext } from '../context/BlogContext';
import { Ionicons } from '@expo/vector-icons';
import iconStyle from '../style/iconStyle';
import modalStyle from '../style/modalStyle';

const ScheduleScreen = ({ navigation }) => {
  const { state, getBlogPosts } = useContext(BlogContext);
  const today = moment(new Date()).format('YYYY-MM-DD')
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTask, setSelectedTask] = useState([]);
  const [markedTask, setMarkedTask] = useState({});
  const [markedDate, setMarkedDate] = useState({})
  const [modalVisible, setmodalVisible] = useState(false);

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

  const toggleModal = () => {
    setmodalVisible(!modalVisible);
  };

  return (
    <>
      <View style={styles.calendar}>
        <Calendar
          onDayPress={day => setSelectedDate(day.dateString)}
          markedDates={markedDate}
          theme={themeStyle}
        />
      </View>
      <View>
        <Text style={styles.selectedDate}>{moment(selectedDate).format('dddd, DD MMMM YYYY')}</Text>
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
                  // onPress={() => navigation.navigate('Show', { id: item._id })}
                  onPress={() => toggleModal()}
                >
                  <Modal style={{ margin: 0 }} isVisible={modalVisible} backdropOpacity={0.7}>
                    <ScheduleModal
                      timesheet={item}
                      toggleModal={toggleModal}
                      hours={hours}
                      minutes={minutes}
                    />
                  </Modal>
                  <Text style={styles.task}>{item.task}</Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                    <Text style={styles.time}>
                      {moment(item.startTime).format('LT')} - {moment(item.endTime).format('LT')}
                    </Text>
                    <Text style={styles.time}>{hours} hrs {minutes} mins</Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </>
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
  // timeDiff: {
  //   fontSize: 12,
  //   alignSelf: 'flex-end',
  //   // fontWeight: 'bold',
  //   color: '#a9a9a9'
  // },
});

export default ScheduleScreen;
