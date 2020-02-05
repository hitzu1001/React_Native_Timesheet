import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, Switch } from 'react-native';
import moment from 'moment';
import Modal from 'react-native-modal';
import TimeForm from "../components/TimeForm";
import { Context as BlogContext } from '../context/BlogContext';
import TimeOffModal from '../components/TimeOffModal';
import { Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';
import iconStyle from '../style/iconStyle';

const TimeOffScreen = ({ navigation }) => {
  const { addBlogPost } = useContext(BlogContext);
  const [allDay, setAllDay] = useState(false);
  const [startTime, setStartTime] =
    useState(moment.utc(new Date()).local().format());
  const [endTime, setEndTime] =
    useState(moment.utc(new Date()).local().format());
  const [task, setTask] = useState('Select leave reason');
  const [notes, setNotes] = useState('');
  const [isChange, setIsChange] = useState(false);
  // const [modalVisible, setmodalVisible] = useState(false);

  useEffect(() => {
    navigation.setParams({ isChange });
    setIsChange(true);
  }, [allDay, startTime, endTime, task, notes]);

  const toggleTimeForm = () => {
    if (allDay) {
      setStartTime(moment.utc());
      setEndTime(moment.utc());
    } else {
      setStartTime(moment.utc(new Date()).local().format())
      setEndTime(moment.utc(new Date()).local().format())
    }
  };

  return (
    <ScrollView>
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>All Day</Text>
        <Switch
          value={allDay}
          onValueChange={v => { setAllDay(v); }}
          trackColor={{ true: '#20b2aa' }}
          style={styles.switch}
        />
      </View>
      <View style={styles.subContainer}>
        <TimeForm
          startTime={startTime} endTime={endTime}
          setStartTime={setStartTime} setEndTime={setEndTime} disabled={allDay}
        />
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.lable}>PURPOSE OF LEAVE</Text>
        <TimeOffModal task={task} setTask={t => setTask(t)} />
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.lable}>NOTES</Text>
        <TouchableOpacity
          onPress={() => { navigate("NoteEdit", { notes, setNotes }); }}
        >
          {notes === "" ? (
            <View style={styles.emptyNote}>
              <Ionicons style={styles.addIcon} name="ios-add" />
              <Text style={styles.emptyNoteText}>Add timesheet note</Text>
            </View>
          ) : (
              <Text
                style={styles.noteContent}
                numberOfLines={3}
                ellipsizeMode="tail"
              >
                {notes}
              </Text>
            )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.sendBtn}
        onPress={() => addBlogPost(startTime, endTime, task, notes, state)}
      >
        <Text style={styles.sendText}>Send Leave Request</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

TimeOffScreen.navigationOptions = ({ navigation }) => {
  const { change, isChange } = navigation.state.params;
  return {
    title: 'Request Time Off',
    headerLeft: <TouchableOpacity
      style={iconStyle.iconTouchLeft}
      onPress={() => {
        (change || isChange)
          ? Alert.alert('Discard?', '',
            [
              { text: 'Keep Editing', style: 'cancel' },
              { text: 'Discard', onPress: () => { navigation.pop(); } }
            ],
            { cancelable: false },
          )
          : navigation.pop();
      }}>
      <Entypo style={iconStyle.crossIcon} name='cross' />
    </TouchableOpacity>
  };
};

const styles = StyleSheet.create({
  switchContainer: {
    marginTop: 10,
    marginBottom: -20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginHorizontal: 20,
    // borderColor: 'red',
    // borderWidth: 2,
  },
  switchLabel: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 5,
  },
  switch: {
    transform: [{ scaleX: .8 }, { scaleY: .8 }]
    // borderColor: 'red',
    // borderWidth: 2,
  },
  subContainer: {
    marginHorizontal: 20,
    marginTop: 20
  },
  lable: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 10
  },
  // input: {
  //   paddingVertical: 10,
  //   paddingHorizontal: 5,
  //   borderColor: "#d3d3d3",
  //   borderWidth: 1,
  //   borderRadius: 3,
  //   flexDirection: 'row', 
  //   alignItems: 'center', 
  // },
  // taskInput:{
  //   marginLeft: 5,
  // },
  // modalContainer: {
  //   flex: 1,
  //   flexDirection: 'column',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderColor: 'green',
  //   borderWidth: 2,
  // },
  // modalOptions: {
  //   width: 200,
  //   height: 150,
  //   borderWidth: 1,
  //   borderColor: 'white',
  //   borderRadius: 10,
  //   backgroundColor: 'white',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // option: {
  //   paddingVertical: 10,
  //   paddingHorizontal: 20,
  //   fontSize: 18,
  //   color: "#20b2aa",
  //   borderColor: 'green',
  //   borderWidth: 1,
  // },
  emptyNote: {
    flexDirection: "row",
    alignItems: "center"
  },
  addIcon: {
    fontSize: 22,
    color: "#20b2aa",
    marginRight: 5
  },
  emptyNoteText: {
    color: "#20b2aa"
  },
  noteContent: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderColor: "#d3d3d3",
    borderWidth: 1,
    borderRadius: 3
  },
  sendBtn: {
    marginTop: 30,
    alignItems: "center"
  },
  sendText: {
    fontSize: 18,
    color: "#20b2aa"
  }
});

export default TimeOffScreen;
