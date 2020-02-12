import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import moment from 'moment';
import { navigate } from '../navigationRef';
import PhotoPicker from './PhotoPicker';
import TimeForm from './TimeForm';
import TaskPickModal from './TaskPickModal';
import { Context as ImageContext } from '../context/ImageContext';
import { Ionicons } from '@expo/vector-icons';
import containerStyle from '../style/containerStyle';

const TimesheetForm = ({ id, initialValues, onSubmit, isChange, isCreate }) => {
  const { state: imgState } = useContext(ImageContext);
  const [startTime, setStartTime] = useState(initialValues.startTime);
  const [endTime, setEndTime] = useState(initialValues.endTime);
  const [task, setTask] = useState(initialValues.task);
  const [notes, setNotes] = useState(initialValues.notes);
  const [errorMsg, setErrorMsg] = useState('');

  const change =
    !(moment(startTime).isSame(moment(initialValues.startTime))) ||
    !(moment(endTime).isSame(moment(initialValues.endTime))) ||
    (task !== initialValues.task) ||
    (notes !== initialValues.notes)
    || (JSON.stringify(imgState) !== JSON.stringify(initialValues.images))

  const timeDiff = parseInt(
    moment(endTime).diff(startTime, 'minutes'), 10
  );
  let message = '';
  if (timeDiff < 0) { message += '\nStart time needs to be before end time.'; }
  if (timeDiff > 480) { message += `\nCan't input more than 8 hours.`; }
  if (task === '') { message += '\nPlease select a task'; }

  useEffect(() => {
    setErrorMsg(message);
    isChange(change);
  }, [startTime, endTime, task, notes, change]);

  return (
    <ScrollView>
      <View style={{ ...styles.subContainer, marginTop: 10 }}>
        <TimeForm
          startTime={startTime}
          endTime={endTime}
          setStartTime={setStartTime}
          setEndTime={setEndTime}
        />
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.lable}>TASK</Text>
        <TaskPickModal task={task} setTask={t => setTask(t)} />
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.lable}>NOTES</Text>
        <TouchableOpacity
          onPress={() => { navigate('NoteEdit', { notes, setNotes }); }}
        >
          {notes === '' ? (
            <View style={containerStyle.rowNullCenter}>
              <Ionicons style={styles.addIcon} name='ios-add' />
              <Text style={styles.emptyNoteText}>Add timesheet note</Text>
            </View>
          ) : (
              <Text
                style={styles.noteContent}
                numberOfLines={3}
                ellipsizeMode='tail'
              >
                {notes}
              </Text>
            )}
        </TouchableOpacity>
      </View>
      {!isCreate && <PhotoPicker id={id} images={imgState} />}
      <TouchableOpacity
        style={styles.saveBtn}
        onPress={() => {
          if (errorMsg !== '') {
            Alert.alert(`Can't save timesheet`, errorMsg,
              [{ text: 'Close', style: 'cancel' },],
              { cancelable: false },
            )
          } else {
            onSubmit(startTime, endTime, task, notes, imgState, 'PENDING');
          }
        }}
      >
        <Text style={styles.saveText}>Save Timesheet</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};


TimesheetForm.defaultProps = {
  initialValues: {
    task: '',
    notes:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \n\nFaucibus pulvinar elementum integer enim neque volutpat. Ut lectus arcu bibendum at varius. Lorem donec massa sapien faucibus et molestie.',
  }
};

const styles = StyleSheet.create({
  subContainer: {
    marginHorizontal: 20,
    marginTop: 20
  },
  lable: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10
  },
  addIcon: {
    fontSize: 24,
    color: '#20b2aa',
    marginTop: 1,
    marginRight: 6,
  },
  emptyNoteText: {
    color: '#20b2aa',
  },
  noteContent: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 3
  },
  saveBtn: {
    marginTop: 30,
    alignItems: 'center'
  },
  saveText: {
    fontSize: 18,
    color: '#20b2aa'
  }
});

export default TimesheetForm;
