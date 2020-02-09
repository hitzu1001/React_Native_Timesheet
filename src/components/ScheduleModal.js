import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';
import UserAvatar from '../components/UserAvatar';
import { Context as UserContext } from '../context/AuthContext';
import { Context as UserList } from '../context/UserContext';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import iconStyle from '../style/iconStyle';
import modalStyle from '../style/modalStyle';

const ScheduleModal = ({ timesheet, toggleModal }) => {
  const { state } = useContext(UserContext);
  const { state: userList } = useContext(UserList);
  const timeDiff = parseInt(moment(timesheet.endTime).diff(moment(timesheet.startTime), 'minutes'));
  const hours = (timeDiff - timeDiff % 60) / 60;
  const minutes = timeDiff % 60;
  const userData = userList.find(user => user._id === timesheet.userId)

  return (
    <>
      {console.log(userList)}
      <TouchableOpacity style={modalStyle.screenCenter} onPress={() => toggleModal()}>
        <View style={styles.modalContent}>
          <View style={styles.container}>
            <MaterialCommunityIcons style={iconStyle.scheduleIcon} name='clock-outline' />
            <View >
              <Text style={styles.content}>
                {moment(timesheet.startTime).format('dddd, DD MMMM YYYY')}
              </Text>
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
            <Text style={styles.content}>{userData.role}</Text>
          </View>
          <View style={styles.userContainer}>
            <UserAvatar firstName={userData.firstName} lastName={userData.lastName} />
            <Text style={styles.user}>{userData.firstName} {userData.lastName}</Text>
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
  content: {
    fontSize: 13,
    color: '#333',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
    marginBottom: 10,
  },
  user: {
    marginLeft: 10,
    fontSize: 13,
    color: '#333',
  },
});
export default ScheduleModal;
