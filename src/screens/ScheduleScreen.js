import React, { useEffect, useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import Modal from 'react-native-modal';
import UserAvatar from '../components/UserAvatar';
import ScheduleModal from '../components/ScheduleModal';
import ViewSelector from '../components/ViewSelector';
import { Context as BlogContext } from '../context/BlogContext';
import { Context as UserContext } from '../context/AuthContext';
import { Context as UserList } from '../context/UserContext';
import { Ionicons } from '@expo/vector-icons';
import { SearchBar } from 'react-native-elements';
import containerStyle from '../style/containerStyle';
import iconStyle from '../style/iconStyle';
import modalStyle from '../style/modalStyle';


const ScheduleScreen = ({ navigation }) => {
  const { state, getBlogPosts } = useContext(BlogContext);
  const { state: user } = useContext(UserContext);
  const { state: userList } = useContext(UserList);
  const today = moment(new Date()).format('YYYY-MM-DD')
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTask, setSelectedTask] = useState([]);
  const [markedTask, setMarkedTask] = useState({});
  const [markedDate, setMarkedDate] = useState({})
  const [view, setView] = useState(true);
  const buttons = ['My Schedule', 'Full Schedule'];
  const [userRole, setUserRole] = useState('Employee');
  const [modalVisible, setModalVisible] = useState(false);
  const [item, setItem] = useState({});
  const [search, setSearch] = useState('')
  const [searchButton, setSearchButton] = useState(false)

  let personalTasks = []
  let filteredTasks = []
  let dateList = []

  Array.isArray(user) && (personalTasks = state.filter(task => task.userId === user[0]._id))
  filteredTasks = selectTasks(view)

  useEffect(() => {
    navigation.setParams({ toggleButton });
    const listener = navigation.addListener("didFocus", () => {
      getBlogPosts();
    });
    return () => {
      listener.remove();
    };
  }, [searchButton]);

  useEffect(() => {
    dateList = []
    Array.isArray(user) && setUserRole(user[0].role)
    personalTasks = state.filter(task => task.userId === user[0]._id)
    filteredTasks = selectTasks(view)

    let initialDates = {};
    for (let i = 0; i < filteredTasks.length; i++) {
      let date = moment(filteredTasks[i].startTime).format('YYYY-MM-DD')
      initialDates = { ...initialDates, [date]: { marked: true, selectedColor: '#fb8d62', } }
    }
    setMarkedTask(initialDates);
  }, [view]);

  useEffect(() => {
    dateList = []
  }, [state, search])

  useEffect(() => {
    Array.isArray(user) && setUserRole(user[0].role)
    let dayTasks = []
    personalTasks = state.filter(task => task.userId === user[0]._id)
    filteredTasks = selectTasks(view)

    for (let i = 0; i < filteredTasks.length; i++) {
      if (moment(filteredTasks[i].startTime).isSame(selectedDate, 'day')) {
        dayTasks.push(filteredTasks[i])
      }
    }

    setSelectedTask(dayTasks)
    let selectedColor = (selectedDate === today) ? '#fb8d62' : '#20b2aa';
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
    setModalVisible(!modalVisible);
  };

  function selectTasks(view) {
    if (view) {
      return personalTasks
    } else {
      return state
    }
  }

  function toggleButton() {
    setSearchButton(!searchButton);
  }

  function searchTask(inputTimesheets) {
    let searchTasks = []
    searchTasks = inputTimesheets.filter(item => item.task.includes(search))
    return searchTasks
  }

  return (
    <>
      {searchButton && <SearchBar
        placeholder="Type Here..."
        onChangeText={setSearch}
        value={search}
        lightTheme={true}
        autoCapitalize='none'
      />}
      {userRole === "Manager" && !searchButton &&
        <ViewSelector buttons={buttons} setView={v => setView(v)} src='Schedule' />
      }

      <View style={styles.calendarContainer}>
        <Calendar
          onDayPress={day => setSelectedDate(day.dateString)}
          markedDates={markedDate}
          style={styles.calendar}
          theme={themeStyle}
        />
      </View>

      <ScrollView>
        <FlatList
          data={searchTask(selectedTask)}
          keyExtractor={(blogPost) => blogPost._id}
          renderItem={({ item }) => {
            var timeDiff = parseInt(moment(item.endTime).diff(moment(item.startTime), 'minutes'));
            var hours = (timeDiff - timeDiff % 60) / 60;
            var minutes = timeDiff % 60;
            var userData = userList.find(user => user._id === item.userId);
            return (
              <View style={styles.row}>
                <TouchableOpacity
                  style={styles.taskContainer}
                  onPress={() => {
                    setItem(item);
                    toggleModal();
                  }}
                >
                  <View style={containerStyle.rowSBCenter} >
                    <View>
                      <Text style={styles.task}>{item.task}</Text>
                      <Text style={styles.time}>
                        {moment(item.startTime).format('LT')} - {moment(item.endTime).format('LT')}
                        <Text style={styles.time}> ({hours} hrs {minutes} mins)</Text>
                      </Text>
                    </View>
                    <UserAvatar firstName={userData.firstName} lastName={userData.lastName} />
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </ScrollView>
      <Modal style={{ margin: 0 }} isVisible={modalVisible} backdropOpacity={0.7}>
        <ScheduleModal timesheet={item} toggleModal={toggleModal} />
      </Modal>
    </>
  );
};

ScheduleScreen.navigationOptions = ({ navigation }) => {
  return {
    title: 'Schedule',
    headerLeft: <UserAvatar />,
    headerRight: (
      <TouchableOpacity style={iconStyle.iconTouchRight} onPress={() => navigation.state.params.toggleButton()}>
        <Ionicons style={iconStyle.searchIcon} name='ios-search' />
      </TouchableOpacity>
    )
  };
};

const themeStyle = {
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
  calendarContainer: {
    ...modalStyle.shadowContainer3,
    margin: 15,
    marginBottom: 20,
    paddingBottom: 5,
  },
  calendar: {
    borderRadius: 8,
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
    fontSize: 11,
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
