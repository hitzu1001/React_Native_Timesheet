import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Context as TimesheetContext } from '../context/TimesheetContext';
import { Context as ImageContext } from '../context/ImageContext';
import TimesheetForm from '../components/TimesheetForm';
import moment from 'moment';
import { Entypo } from '@expo/vector-icons';
import iconStyle from '../style/iconStyle'

const EditScreen = ({ navigation }) => {
  const { state, editTimesheet } = useContext(TimesheetContext);
  const { state: imgState, setImages } = useContext(ImageContext)
  const id = navigation.getParam("id");
  const timesheet = state.find(timesheet => timesheet._id === id);
  const [change, setChange] = useState(false);

  useEffect(() => {
    setImages(timesheet.images);
  }, []);

  useEffect(() => {
    navigation.setParams({ change });
    console.log('EditScreen change: ' + change);
  }, [change, timesheet]);

  return (
    <TimesheetForm
      id={id}
      initialValues={{
        startTime: timesheet.startTime,
        endTime: timesheet.endTime,
        task: timesheet.task,
        notes: timesheet.notes,
        images: timesheet.images,
        status: timesheet.status
      }}
      onSubmit={(startTime, endTime, task, notes, images, status) => {
        editTimesheet(id, startTime, endTime, task, notes, images, status, () => {
          navigation.pop();
        });
      }}
      isChange={change => setChange(change)}
      isCreate={false}
    />

  );
};

EditScreen.navigationOptions = ({ navigation }) => {
  const { change } = navigation.state.params;
  return {
    title: 'Edit Timesheet',
    headerLeft: <TouchableOpacity
      style={iconStyle.iconTouchLeft}
      onPress={() => {
        (change)
          ? Alert.alert('Discard changes?', '',
            [
              { text: 'Keep Editing', style: 'cancel' },
              { text: 'Discard', onPress: () => { navigation.pop(); } }
            ],
            { cancelable: false },
          )
          : navigation.pop();
      }}
    >
      <Entypo style={iconStyle.crossIcon} name='cross' />
    </TouchableOpacity>
  };
};

const styles = StyleSheet.create({
});

export default EditScreen;
