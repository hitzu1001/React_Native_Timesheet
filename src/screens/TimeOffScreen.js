import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, Switch } from 'react-native';
import moment from 'moment';
import TimeForm from "../components/TimeForm";
import TimeOffTaskModal from '../components/TimeOffTaskModal';
import TimeOffNoteModal from '../components/TimeOffNoteModal';
import { Context as BlogContext } from '../context/BlogContext';
import { Entypo } from '@expo/vector-icons';
import containerStyle from '../style/containerStyle';
import iconStyle from '../style/iconStyle';

const TimeOffScreen = ({ navigation }) => {
  const { addBlogPost } = useContext(BlogContext);
  const nineAM = moment.utc(new Date()).local().set('hour', 9).set('minute', 0);
  const fivePM = moment.utc(new Date()).local().set('hour', 17).set('minute', 0);
  const [allDay, setAllDay] = useState(true);
  const [startTime, setStartTime] = useState(nineAM);
  const [endTime, setEndTime] = useState(fivePM);
  const [task, setTask] = useState('Select time off reason');
  const [notes, setNotes] = useState('');
  const [isChange, setIsChange] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  let change;

  const timeDiff = parseInt(
    moment(endTime).diff(startTime, "minutes"), 10
  );

  let message = '';
  if (timeDiff < 0) { message += '\nStart time needs to be before end time.'; }
  if (timeDiff > 480) { message += `\nCan't input more than 8 hours.`; }
  if (task === 'Select time off reason') { message += '\nPlease select a leave reason.'; }

  useEffect(() => {
    change = ((allDay !== true)
    // || (startTime !== nineAM) || (endTime !== fivePM)
    || (task !== 'Select time off reason') || (notes !== ''));
  }, []);

  useEffect(() => {
    change = ((allDay !== true)
    // || (startTime !== nineAM) || (endTime !== fivePM)
    || (task !== 'Select time off reason') || (notes !== ''));
    console.log('allDay is ' + (allDay === false));
    // console.log('startTime is ' + (startTime !== nineAM));
    // console.log('endTime is ' + (endTime !== fivePM));
    console.log('notes is ' + (notes !== '')); 
    console.log('change is ' + change); 
    setIsChange(change);
    setErrorMsg(message);
    navigation.setParams({ isChange });
    console.log(isChange);
  }, [allDay, startTime, endTime, task, notes]);
  
  return (
    <ScrollView>
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>All-Day</Text>
        <Switch
          style={styles.switch}
          value={allDay}
          onValueChange={v => setAllDay(v)}
          trackColor={{ true: '#20b2aa' }}
        />
      </View>
      <View style={{ ...styles.subContainer, marginTop: 5 }}>
        <TimeForm
          startTime={startTime} endTime={endTime}
          setStartTime={setStartTime} setEndTime={setEndTime}
          disabled={allDay} setDuration={(h, m) => setDuration([h, m])}
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
            Alert.alert(`Can't send request`, errorMsg,
              [{ text: 'Close', style: 'cancel' },],
              { cancelable: false },
            )
          } else {
            addBlogPost(startTime, endTime, task, notes, [], 'PENDING', true);
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
  return {
    title: 'Request Time Off',
    headerLeft: <TouchableOpacity
      style={iconStyle.iconTouchLeft}
      onPress={() => {
        (navigation.state.params.isChange)
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
    ...containerStyle.rowFECenter,
    marginTop: 10,
    marginBottom: -20,
    marginHorizontal: 20,
  },
  switchLabel: {
    fontSize: 12,
    fontWeight: "600",
    marginRight: 5,
  },
  switch: {
    transform: [{ scaleX: .8 }, { scaleY: .8 }],
  },
  subContainer: {
    marginHorizontal: 20,
    marginTop: 20
  },
  lable: {
    fontSize: 12,
    fontWeight: "bold",
    color: '#333',
    marginBottom: 10
  },
  sendBtn: {
    marginTop: 30,
    alignItems: "center"
  },
  sendText: {
    fontSize: 18,
    color: "#20b2aa"
  },
  totalContainer: {
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});

export default TimeOffScreen;
