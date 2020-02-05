import React, { useEffect, useContext, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
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


  useEffect(() => {
    
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
  }, []);

  function futureToPast(dateA, dateB) {
    return (moment(dateB.startTime).valueOf() - moment(dateA.startTime).valueOf());
  }

  return (
    <View>
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
            <View style={styles.row}>
              {/* {console.log(sameDate)} */}
              {!sameDate &&
                <Text style={styles.time}>
                  {moment(item.startTime).format("dddd")}, {moment(item.startTime).format("LL")}
                </Text>}

              <TouchableOpacity
                style={styles.taskContainer}
                onPress={() => navigation.navigate("Show", { id: item._id, startTime: item.startTime })}
              >
                <Text style={styles.task}>{item.task}</Text>
                <Text style={styles.timeDiff}>
                  {hours} hours {minutes} minutes
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      ></FlatList>
    </View>
  );
};

TimesheetScreen.navigationOptions = ({ navigation }) => {
  return {
    title: "Timesheets",
    headerLeft: <Avatar rounded title="TS" containerStyle={styles.avatar} />,
    headerRight: <TouchableOpacity style={iconStyle.iconTouchRight} onPress={() => navigation.navigate('Create')}>
      {/* , { setDateList: navigation.state.params.setDateList } */}
      <Ionicons style={styles.addIcon} name='ios-add' />
    </TouchableOpacity>,
  };
};

const styles = StyleSheet.create({
  addIcon: {
    fontSize: 26,
    color: '#20b2aa',
    // marginHorizontal: 20,
  },
  row: {
  },
  time: {
    backgroundColor: '#e9e9e9',
    fontSize: 12,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignSelf: 'stretch',
  },
  taskContainer: {
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
  avatar: {
    marginLeft: 20
  }
});

export default TimesheetScreen;
