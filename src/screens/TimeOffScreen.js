import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, Switch } from 'react-native';
import moment from 'moment';
import TimeForm from "../components/TimeForm";
import TimeOffTaskModal from '../components/TimeOffTaskModal';
import TimeOffNoteModal from '../components/TimeOffNoteModal';
import { Context as TimesheetContext } from '../context/TimesheetContext';
import { Entypo } from '@expo/vector-icons';
import containerStyle from '../style/containerStyle';
import iconStyle from '../style/iconStyle';

const TimeOffScreen = ({ navigation, screenProps }) => {
  const { setTOIsChange } = screenProps;
  const { addTimesheet } = useContext(TimesheetContext);
  const nineAM = moment.utc(new Date()).local().set('hour', 9).set('minute', 0);
  const fivePM = moment.utc(new Date()).local().set('hour', 17).set('minute', 0);
  const [allDay, setAllDay] = useState(true);
  const [startTime, setStartTime] = useState(nineAM);
  const [endTime, setEndTime] = useState(fivePM);
  const [task, setTask] = useState('Select time off reason');
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const change = ((allDay !== true)
    || !(moment(startTime).isSame(moment(nineAM))) || !(moment(endTime).isSame(moment(fivePM)))
    || (task !== 'Select time off reason') || (notes !== ''));

  const timeDiff = parseInt(
    moment(endTime).diff(startTime, "minutes"), 10
  );

  let message = '';
  if (timeDiff < 0) { message += '\nStart time must be earlier than end time.'; }
  if (timeDiff > 480) { message += `\nCannot input more than 8 hours.`; }
  if (task === 'Select time off reason') { message += '\nPlease select a leave reason.'; }

  useEffect(() => {
    setTOIsChange(change);
    setErrorMsg(message);
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
            addTimesheet(startTime, endTime, task, notes, [], 'PENDING', true);
            navigation.pop();
          }
        }}
      >
        <Text style={styles.sendText}>Send Leave Request</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

TimeOffScreen.navigationOptions = ({ navigation, screenProps }) => {
  const { TOisChange, setTOIsChange } = screenProps;
  return {
    title: 'Request Time Off',
    headerLeft: <TouchableOpacity
      style={iconStyle.iconTouchLeft}
      onPress={() => {
        if (TOisChange){
          Alert.alert('Discard?', '',
            [
              { text: 'Keep Editing', style: 'cancel' },
              { text: 'Discard', onPress: () => { 
                setTOIsChange(false)
                navigation.pop(); 
              } }
            ],
            { cancelable: false },
          )
        } else {
          setTOIsChange(false);
          navigation.pop();
        }
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
