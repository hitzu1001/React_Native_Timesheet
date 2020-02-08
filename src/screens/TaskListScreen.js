import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Context as TaskContext } from '../context/TaskContext';
import { Ionicons } from '@expo/vector-icons'
import iconStyle from '../style/iconStyle';

const TaskListScreen = ({ navigation }) => {
  const { state, getTaskList } = useContext(TaskContext);
  let sortedTasks = state.sort(sortTask);
  let prefixList = [];

  function sortTask(taskA, taskB) {
    let a = taskA.name.toUpperCase();
    let b = taskB.name.toUpperCase();
    return (a < b) ? -1 : ((a > b) ? 1 : 0);
  }

  useEffect(() => {
    const listener = navigation.addListener("didFocus", () => {
      getTaskList();
      sortedTasks = state.sort(sortTask);
    });
    return () => {
      listener.remove();
    };
  }, [state]);

  return (
    <View style={styles.screen}>
      <FlatList
        data={sortedTasks}
        keyExtractor={t => t._id}
        renderItem={({ item }) => {
          let sameCap = false;
          prefixList.includes(item.name[0]) ? sameCap = true : prefixList.push(item.name[0]);
          return (
            <>
              {!sameCap && <Text style={styles.cap}>{item.name[0]}</Text>}
              <TouchableOpacity
                style={{...styles.taskContainer, borderTopWidth: sameCap ? 0 : 1}}
                onPress={() => navigation.navigate("EditTask", { item })}
              >
                <Text style={styles.task}>{item.name}</Text>
              </TouchableOpacity>
            </>
          );
        }}
      />
    </View>
  );
};

TaskListScreen.navigationOptions = ({ navigation }) => {
  return {
    title: "Task List",
    headerLeft:
      <TouchableOpacity style={iconStyle.iconTouchLeft}
        onPress={() => { navigation.pop() }}
      >
        <Ionicons style={iconStyle.backIcon} name='ios-arrow-back' />
      </TouchableOpacity>,
    headerRight:
      <TouchableOpacity style={iconStyle.iconTouchRight} onPress={() => navigation.navigate('CreateTask')}>
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
  cap: {
    paddingVertical: 6,
    paddingHorizontal: 20,
    fontSize: 13,
    fontWeight: '500',
    alignSelf: 'stretch',
  },
  taskContainer: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#dcdcdc"
  },
  task: {
    fontSize: 15,
    fontWeight: "500",
    color: '#444',
  },
});
export default TaskListScreen;
