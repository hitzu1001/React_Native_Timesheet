import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import Modal from 'react-native-modal'
import { Context as TaskContext } from '../context/TaskContext';
import { Entypo } from '@expo/vector-icons';
import containerStyle from '../style/containerStyle';
import iconStyle from '../style/iconStyle';
import modalStyle from '../style/modalStyle';

const TaskPickModal = ({ task, setTask }) => {
  const { state, getTaskList } = useContext(TaskContext);
  const [modalVisible, setModalVisible] = useState(false);
  let sortedTasks = state.sort(sortTask);
  let prefixList = [];

  function sortTask(taskA, taskB) {
    let a = taskA.name.toUpperCase();
    let b = taskB.name.toUpperCase();
    return (a < b) ? -1 : ((a > b) ? 1 : 0);
  }

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    getTaskList();
    sortedTasks = state.sort(sortTask);
    prefixList = [];
  }, [modalVisible]);

  return (
    <>
      <TouchableOpacity onPress={() => toggleModal()}>
        <View style={styles.input}>
          <Text style={{
            ...styles.taskInput,
            color: task === 'Select a task' ? '#8e8e8e' : '#000',
          }}>
            {task}
          </Text>
        </View>
      </TouchableOpacity>
      <Modal
        style={{ margin: 0 }}
        isVisible={modalVisible}
        backdropOpacity={0.5}
        transparent={false}
      >
        <ScrollView>
          <View style={modalStyle.screenLeft} >
            <View style={modalStyle.screenHearder}>
              <TouchableOpacity
                style={iconStyle.iconTouchLeft}
                onPress={() => toggleModal()}>
                <Entypo style={iconStyle.crossIcon} name='cross' />
              </TouchableOpacity>
              <Text style={styles.header}>Select a Task</Text>
              <TouchableOpacity
                style={iconStyle.iconTouchLeft}
                disabled={true}
              >
              </TouchableOpacity>
            </View>
            <View style={{ alignSelf: 'stretch', }}>
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
                        style={{ ...styles.taskContainer, borderTopWidth: sameCap ? 0 : 1 }}
                        onPress={() => {
                          setTask(item.name);
                          toggleModal();
                        }}
                      >
                        <Text style={styles.task}>{item.name}</Text>
                      </TouchableOpacity>
                    </>
                  );
                }}
              />
            </View>
          </View>
        </ScrollView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  addIcon: {
    fontSize: 26,
    color: '#20b2aa',
  },
  input: {
    ...containerStyle.rowNullCenter,
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderColor: "#d3d3d3",
    borderWidth: 1,
    borderRadius: 3,
  },
  taskInput: {
    marginLeft: 5,
  },
  header: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    paddingTop: 2,
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
export default TaskPickModal;
