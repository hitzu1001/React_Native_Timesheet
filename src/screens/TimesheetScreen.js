import React, { useEffect, useContext, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import UserAvatar from '../components/UserAvatar';
import { Context as BlogContext } from '../context/BlogContext';
import { Context as ImageContext } from '../context/ImageContext';
import { Ionicons } from '@expo/vector-icons'
import iconStyle from '../style/iconStyle';
import moment from "moment";

const TimesheetScreen = ({ navigation }) => {
  const { state, getBlogPosts } = useContext(BlogContext);
  const { setImages } = useContext(ImageContext);
  // const [dateList, setDateList] = useState([])
  let sortedTimesheets = state.sort(futureToPast)
  let dateList = []

  function futureToPast(dateA, dateB) {
    return (moment(dateB.startTime).valueOf() - moment(dateA.startTime).valueOf());
  }

  // futureToPast = (dateA, dateB) => {
  //   return (moment(dateB.startTime).valueOf() - moment(dateA.startTime).valueOf());
  // }
  
  useEffect(() => {
    navigation.setParams({ getBlogPosts })
    // navigation.setParams({ setDateList })
    const listener = navigation.addListener("didFocus", () => {
      dateList = []
      getBlogPosts();
      setImages([]);
      sortedTimesheets = state.sort(futureToPast)
    });

    return () => {
      listener.remove();
    };
  }, [state]);

  return (
    <View style={styles.screen}>
      <FlatList
        data={sortedTimesheets}
        keyExtractor={blogPost => blogPost._id}
        renderItem={({ item }) => {
          var sameDate = false
          dateList.includes(moment(item.startTime).format('L')) ? sameDate = true : dateList.push(moment(item.startTime).format('L'))
          var timeDiff = parseInt(
            moment(item.endTime).diff(moment(item.startTime), "minutes")
          );
          var hours = (timeDiff - (timeDiff % 60)) / 60;
          var minutes = timeDiff % 60;
          return (
            <>
              {!sameDate &&
                <Text style={styles.time}>
                  {moment(item.startTime).format("dddd")}, {moment(item.startTime).format("LL")}
                </Text>
              }
              <TouchableOpacity
                style={styles.taskContainer}
                onPress={() => navigation.navigate("Show", { id: item._id, startTime: item.startTime })}
              >
                <Text style={styles.task}>{item.task}</Text>
                <Text style={styles.timeDiff}>
                  {hours} hours {minutes} minutes
                </Text>
              </TouchableOpacity>
            </>
          );
        }}
      />
    </View>
  );
};

TimesheetScreen.navigationOptions = ({ navigation }) => {

  return {
    title: "Timesheets",
    headerLeft: <UserAvatar />,
    headerRight:
      <TouchableOpacity style={iconStyle.iconTouchRight} onPress={() => navigation.navigate('Create')}>
        {/* , { setDateList: navigation.state.params.setDateList } */}
        <Ionicons style={styles.addIcon} name='ios-add' />
      </TouchableOpacity>
  };
};

const styles = StyleSheet.create({
  addIcon: {
    fontSize: 26,
    color: '#20b2aa',
  },
  screen: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  },
  time: {
    fontSize: 12,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignSelf: 'stretch',
  },
  taskContainer: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#dcdcdc"
  },
  task: {
    fontSize: 12,
    fontWeight: "bold"
  },
  timeDiff: {
    fontSize: 12,
    alignSelf: "flex-end",
    // fontWeight: "bold",
    color: "#a9a9a9"
  },
});

export default TimesheetScreen;
