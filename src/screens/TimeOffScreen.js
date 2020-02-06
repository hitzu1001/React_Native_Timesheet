import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, Switch } from 'react-native';
import moment from 'moment';
import TimeForm from "../components/TimeForm";
import { Context as BlogContext } from '../context/BlogContext';
import TimeOffTaskModal from '../components/TimeOffTaskModal';
import TimeOffNoteModal from '../components/TimeOffNoteModal';
import { Entypo } from '@expo/vector-icons';
import iconStyle from '../style/iconStyle';

const TimeOffScreen = ({ navigation }) => {
  const { addBlogPost } = useContext(BlogContext);
  const [allDay, setAllDay] = useState(false);
  const [startTime, setStartTime] =
    useState(moment.utc(new Date()).local().set('hour', 9).set('minute', 0));
  const [endTime, setEndTime] =
    useState(moment.utc(new Date()).local().set('hour', 17).set('minute', 0));
  const [task, setTask] = useState('Select leave reason');
  const [notes, setNotes] = useState('');
  const [isChange, setIsChange] = useState(false);
  const [errorMsg, setErrorMsg] = useState([]);

  // switch (hours, minutes) {
  //   case (hours < 0 || minutes < 0):
  //     setError([...errorMsg, 'Start time needs to be before end time.']);
  //   case (hours > 8 || (hours === 8 && minutes > 0)):
  //     setError([...errorMsg, `Can't input more than 8 hours.`]);
  // }

  
  useEffect(() => {
    navigation.setParams({ isChange });
    setIsChange(true);
    (task === 'Select leave reason') && setErrorMsg('Please select a leave reason.');
  }, [allDay, startTime, endTime, task, notes]);

  return (
    <ScrollView>
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>All-Day</Text>
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
          setStartTime={setStartTime} setEndTime={setEndTime}
          disabled={allDay} errorMsg={errorMsg} setErrorMsg={e => setErrorMsg(e)}
        />
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.lable}>PURPOSE OF LEAVE</Text>
        <TimeOffTaskModal task={task} setTask={t => setTask(t)} />
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.lable}>NOTES</Text>
        <TimeOffNoteModal notes={notes} setNotes={n => setNotes(n)} />
      </View>
      <TouchableOpacity
        style={styles.sendBtn}
        onPress={() => {
          if (errorMsg !== '') {
            console.log(errorMsg.toString());
            Alert.alert(`Can't save timesheet`, '',
              [{ text: 'Close', style: 'cancel' },],
              { cancelable: false },
            )
          } else {
            addBlogPost(startTime, endTime, task, notes, []);
            navigation.pop();
          }
        }}
      >
        <Text style={styles.sendText}>Send Leave Request</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

TimeOffScreen.navigationOptions = ({ navigation }) => {
  // const { isChange } = navigation.state.params;
  return {
    title: 'Request Time Off',
    headerLeft: <TouchableOpacity
      style={iconStyle.iconTouchLeft}
      onPress={() => {
        (false || navigation.state.params.isChange)
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
