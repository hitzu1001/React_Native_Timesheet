import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Context as TimesheetContext } from '../context/TimesheetContext';
import TimesheetForm from '../components/TimesheetForm';
import moment from 'moment';
import { Entypo } from '@expo/vector-icons';
import iconStyle from '../style/iconStyle'

const CreateScreen = ({ navigation }) => {
  const { addTimesheet, getTimesheets } = useContext(TimesheetContext);
  var startTime = moment.utc(new Date()).local().format();
  var endTime = moment.utc(new Date()).local().format();
  const [isChange, setIsChange] = useState(false);

  useEffect(() => {
    navigation.setParams({ isChange });
  }, [isChange]);

  return (
    <TimesheetForm
      id={0}
      initialValues={{
        startTime: startTime,
        endTime: endTime,
        task: 'Select a task',
        notes: '',
        images: []
      }}
      onSubmit={(startTime, endTime, task, notes, images) => {
        addTimesheet(startTime, endTime, task, notes, images, "PENDING", false, () => {
          // ensure the page is navigated to Index after the post has been added

          navigation.navigate('Timesheet');
        });
      }}
      isChange={change => setIsChange(change)}
      isCreate={true}
    />
  );
};

CreateScreen.navigationOptions = ({ navigation }) => {
  return {
    title: 'Add Timesheet',
    headerLeft: (
      <TouchableOpacity
        style={iconStyle.iconTouchLeft}
        onPress={() => 
          (navigation.state.params.isChange)
          ? Alert.alert('Discard changes?', '',
            [
              { text: 'Keep Editing', style: 'cancel' },
              { text: 'Discard', onPress: () => { navigation.pop(); } }
            ],
            { cancelable: false },
          )
          : navigation.pop()
        }
      >
        <Entypo style={iconStyle.crossIcon} name='cross' />
      </TouchableOpacity>
    )
  };
};

const styles = StyleSheet.create({
});

export default CreateScreen;
