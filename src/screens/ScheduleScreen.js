import React, { useEffect, useContext, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Alert, FlatList } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import iconStyle from '../style/iconStyle';
import { Calendar } from 'react-native-calendars';
import { Context as BlogContext } from '../context/BlogContext';
import Card from '../components/Card';
import moment from 'moment';

const ScheduleScreen = ({ navigation }) => {
  const { state, getBlogPosts } = useContext(BlogContext);
  const [selectedDate, setSelectedDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [selectedTask, setSelectedTask] = useState([]);
  const [markedTask, setMarkedTask] = useState({});
  const [markedDate, setMarkedDate] = useState({})

  console.log("state:" + state)

  useEffect(() => {
    getBlogPosts();
    const listener = navigation.addListener('didFocus', () => {
      getBlogPosts();
    });
    return () => {
      listener.remove();
    };
  }, []);

  useEffect(() => {
    let markedDates = {}
    console.log("state:" + state)
    for (let i = 0; i < state.length; i++) {
      let date = moment(state[i].startTime).format("YYYY-MM-DD")
      markedDates = { ...markedDates, [date]: { marked: true } }
    }
    // console.log("markedDates" + markedDates)
    setMarkedTask(markedDates)

    let filteredTask = []
    for (let i = 0; i < state.length; i++) {
      if (moment(state[i].startTime).isSame(selectedDate, 'day')) {
        filteredTask.push(state[i])
      }
    }
    setSelectedTask(filteredTask)

    // console.log(markedTask)

    let labeledDate = {
      ...markedTask, [selectedDate]: {
        selected: true,
        disableTouchEvent: true,
        selectedDotColor: 'orange',
      }
    }

    setMarkedDate(labeledDate)
  }, [selectedDate])

  console.log(markedDate)


  return (
    <View>
      <ScrollView>
        <View style={styles.container}>
          <Calendar
            onDayPress={(day) => {
              setSelectedDate(day.dateString);
            }}
            markedDates={markedDate}
          />
        </View>
      </ScrollView>
      <View>
        <Text>{selectedDate}</Text>
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
                  style={styles.titleContainer}
                  onPress={() => navigation.navigate('Show', { id: item._id })}
                >
                  <Text style={styles.task}>{item.task}</Text>
                  <Text style={styles.time}>
                    {moment(item.startTime).format('lll')} ~ {moment(item.endTime).format('lll')}
                  </Text>
                  <Text style={styles.timeDiff}>
                    {hours} hours {minutes} minutes
									</Text>
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
    headerLeft: <Avatar rounded title="TS" containerStyle={styles.avatar} />,
    headerRight: (
      <TouchableOpacity style={iconStyle.iconTouchRight} onPress={() => { }}>
        <Ionicons style={iconStyle.searchIcon} name="ios-search" />
      </TouchableOpacity>
    )
  };
};

const styles = StyleSheet.create({
  header: {
    padding: 20
  },
  avatar: {
    marginLeft: 20
  },
  container: {
    margin: 5,
    padding: 5,
    borderWidth: 3,
    borderColor: 'pink'
  },
  addIcon: {
    fontSize: 26,
    color: '#20b2aa'
    // marginHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    borderTopWidth: 1
  },
  titleContainer: {
    flex: 1,
    borderWidth: 3,
    borderColor: 'pink'
  },
  title: {
    fontSize: 18,
    padding: 5,
    fontWeight: 'bold'
  },
  time: {
    fontSize: 12,
    padding: 3,
    alignSelf: 'flex-end',
    fontWeight: 'bold'
  },
  timeDiff: {
    fontSize: 12,
    padding: 3,
    alignSelf: 'flex-end',
    fontWeight: 'bold',
    color: 'grey'
  }
});

export default ScheduleScreen;
