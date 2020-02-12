import React, { useEffect, useContext, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import UserAvatar from '../components/UserAvatar';
import ViewSelector from '../components/ViewSelector';
import { Context as BlogContext } from '../context/BlogContext';
import { Context as ImageContext } from '../context/ImageContext';
import { Context as UserContext } from '../context/AuthContext';
import { Context as UserList } from '../context/UserContext';
import { Ionicons } from '@expo/vector-icons'
import { SearchBar } from 'react-native-elements';
import iconStyle from '../style/iconStyle';
import containerStyle from '../style/containerStyle';
import moment from 'moment';


const TimesheetScreen = ({ navigation }) => {
  const { state, getBlogPosts } = useContext(BlogContext);
  const { setImages } = useContext(ImageContext);
  const { state: user } = useContext(UserContext);
  const { state: userList } = useContext(UserList);
  // true for My, false for Full
  const [view, setView] = useState(true);
  const buttons = ['My Timesheet', 'Full Timesheet'];
  const [userRole, setUserRole] = useState('Employee')
  const [search, setSearch] = useState('')
  const [searchButton, setSearchButton] = useState(false)
  let personalTasks = []
  let filteredTasks = []
  let dateList = []

  Array.isArray(user) && (personalTasks = state.filter(task => task.userId === user[0]._id))
  filteredTasks = selectTasks(view)


  useEffect(() => {
    setSearchButton(false)
    getBlogPosts();
    Array.isArray(user) && setUserRole(user[0].role)
    dateList = []
    Array.isArray(user) && (personalTasks = state.filter(task => task.userId === user[0]._id))
    filteredTasks = selectTasks(view)

    const listener = navigation.addListener('didFocus', () => {
      getBlogPosts();
      dateList = []
      setImages([]);
      filteredTasks = selectTasks(view)
    });
    return () => {
      listener.remove();
    };
  }, [view]);

  useEffect(() => {
    // setSearchButton(false)
    dateList = []
  }, [state,search])

  useEffect(() => {
    navigation.setParams({ toggleButton });
  }, [searchButton])

  function selectTasks(view) {
    if (view) {
      return personalTasks
    } else {
      return state
    }
  }

  function searchTask(inputTimesheets) {
    let searchTasks = []
    searchTasks = inputTimesheets.filter(item => item.task.includes(search))
    return searchTasks
  }

  function futureToPast(dateA, dateB) {
    return (moment(dateB.startTime).valueOf() - moment(dateA.startTime).valueOf());
  }

  function toggleButton() {
    setSearchButton(!searchButton);
  }

  return (
    <View style={styles.screen}>
      {searchButton && <SearchBar
        placeholder="Type Here..."
        onChangeText={setSearch}
        value={search}
        lightTheme={true}
        autoCapitalize='none'
      />}

      {userRole === 'Manager' &&
        <ViewSelector buttons={buttons} setView={v => setView(v)} src='timesheets' />
      }
      <FlatList
        data={searchTask(filteredTasks.sort(futureToPast))}
        keyExtractor={blogPost => blogPost._id}
        renderItem={({ item }) => {
          var sameDate = false
          dateList.includes(moment(item.startTime).format('L')) ? sameDate = true : dateList.push(moment(item.startTime).format('L'))
          var timeDiff = parseInt(
            moment(item.endTime).diff(moment(item.startTime), 'minutes')
          );
          var hours = (timeDiff - (timeDiff % 60)) / 60;
          var minutes = timeDiff % 60;
          var userData = userList.find(user => user._id === item.userId);
          var owner = `${userData.firstName.toUpperCase()} ${userData.lastName.toUpperCase()}`;
          return (
            <>
              {!sameDate &&
                <Text style={styles.time}>
                  {moment(item.startTime).format('ddd')}, {moment(item.startTime).format('DD MMMM YYYY')}
                </Text>
              }
              <TouchableOpacity
                style={{ ...styles.itemContainer, borderTopWidth: sameDate ? 0 : 1 }}
                onPress={() => navigation.navigate('Show', { id: item._id, startTime: item.startTime, status: item.status })}
              >
                <View style={containerStyle.rowSBCenter}>
                  <Text style={styles.item}>{item.task}</Text>
                  <Text style={styles.itemtime}>
                    {moment(item.startTime).format('LT')} - {moment(item.endTime).format('LT')}
                  </Text>
                </View>
                <View style={containerStyle.rowSBCenter}>
                  <Text style={{ marginTop: 10 }}>
                    {!view && <Text style={styles.owner}>{owner} </Text>}
                    {item.status === 'APPROVED' &&
                      <Text style={{ ...styles.status, color: '#008000' }}>({item.status})</Text>
                    }
                    {item.status === 'DECLINED' &&
                      <Text style={{ ...styles.status, color: '#ff0000' }}>({item.status})</Text>
                    }
                    {item.status === 'PENDING' &&
                      <Text style={{ ...styles.status, color: '#ffa500' }}>({item.status})</Text>
                    }
                  </Text>
                  <Text style={styles.timeDiff}>{hours} hrs {minutes} mins</Text>
                </View>
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
    title: 'Timesheets',
    headerLeft: <UserAvatar />,
    headerRight:
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={iconStyle.iconTouchRight} onPress={() => navigation.state.params.toggleButton()}>
          <Ionicons style={iconStyle.searchIcon} name='ios-search' />
        </TouchableOpacity>
        <TouchableOpacity style={iconStyle.iconTouchRight} onPress={() => navigation.navigate('Create')}>
          {/* , { setDateList: navigation.state.params.setDateList } */}
          <Ionicons style={styles.addIcon} name='ios-add' />
        </TouchableOpacity>
      </View>

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
    fontSize: 11,
    paddingVertical: 6,
    paddingHorizontal: 15,
    alignSelf: 'stretch',
  },
  itemContainer: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#dcdcdc'
  },
  item: {
    fontSize: 13,
    fontWeight: '600',
    color: '#444',
  },
  itemtime: {
    fontSize: 11,
    fontWeight: '500',
    color: '#444',
  },
  timeDiff: {
    fontSize: 10,
    alignSelf: 'flex-end',
    fontWeight: '500',
    color: '#999'
  },
  owner: {
    color: '#808080',
    fontSize: 9,
    fontWeight: '600',
  },
  status: {
    fontSize: 9,
    fontWeight: '600',
  }
});

export default TimesheetScreen;
