import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';
import UserAvatar from '../components/UserAvatar';
import { Context as UserContext } from '../context/AuthContext';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import iconStyle from '../style/iconStyle';
import modalStyle from '../style/modalStyle';

const ScheduleModal = ({ timesheet, toggleModal, hours, minutes }) => {
  const { state } = useContext(UserContext);
  const user = state[0];

  useEffect(() => {
    console.log();
  }, []);

  return (
    <>
      <TouchableOpacity style={modalStyle.screenCenter} onPress={() => toggleModal()}>
        <View style={styles.modalContent}>
          <View style={styles.container}>
            <MaterialCommunityIcons style={iconStyle.scheduleIcon} name='clock-outline' />
            <View >
              <Text>{moment(timesheet.startTime).format('dddd, DD MMMM YYYY')}</Text>
              <Text style={styles.content}>
                {moment(timesheet.startTime).format('LT')} - {moment(timesheet.endTime).format('LT')} ({hours} hrs {minutes} mins)
              </Text>
            </View>
          </View>
          <View style={styles.container}>
            <MaterialCommunityIcons style={iconStyle.scheduleIcon} name='hammer' />
            <Text style={styles.content}>{timesheet.task}</Text>
          </View>
          <View style={styles.container}>
            <MaterialIcons style={iconStyle.scheduleIcon} name='people' />
            <Text>Employee</Text>
          </View>
          <View style={styles.userContainer}>
            <UserAvatar />
            <Text style={styles.user}>{user.firstName} {user.lastName}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    ...modalStyle.shadowContainer8,
    padding: 15,
    paddingBottom: 10,
    justifyContent: 'flex-start',
    width: 330,
  },
  container: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
    marginBottom: 10,
    borderColor: 'red',
    borderWidth: 2,
  },
  user: {
    marginLeft: 10,
  },
});
export default ScheduleModal;
