import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';
import UserAvatar from '../components/UserAvatar';
import { Context as UserContext } from '../context/AuthContext';
import { Context as UserList } from '../context/UserContext';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import containerStyle from '../style/containerStyle';
import iconStyle from '../style/iconStyle';
import modalStyle from '../style/modalStyle';

const ScheduleModal = ({ timesheet, toggleModal }) => {
  const { state: userList } = useContext(UserList);
  const timeDiff = parseInt(moment(timesheet.endTime).diff(moment(timesheet.startTime), 'minutes'));
  const hours = (timeDiff - timeDiff % 60) / 60;
  const minutes = timeDiff % 60;
  const userData = userList.find(user => user._id === timesheet.userId)

  return (
    <>
      <TouchableOpacity style={modalStyle.screenCenter} onPress={() => toggleModal()}>
        <View style={styles.modalContent}>
          <View style={styles.container}>
            <MaterialCommunityIcons style={iconStyle.scheduleIcon} name='clock-outline' />
            <View >
              <Text style={styles.content}>
                {moment(timesheet.startTime).format('dddd, DD MMM YYYY')}
              </Text>
              <Text style={{ ...styles.content, marginTop: 8 }}>
                {moment(timesheet.startTime).format('LT')} - {moment(timesheet.endTime).format('LT')} ({hours} hrs {minutes} mins)
              </Text>
            </View>
          </View>
          <View style={styles.container}>
            <MaterialCommunityIcons style={iconStyle.scheduleIcon} name='clipboard-check-outline' />
            <Text style={styles.content}>{timesheet.task}</Text>
          </View>
          <View style={styles.container}>
            <MaterialIcons style={iconStyle.scheduleIcon} name='people' />
            <Text style={styles.content}>Owner</Text>
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
    marginBottom: 20,
  },
  content: {
    color: '#444',
  },
  userContainer: {
    ...containerStyle.rowNullCenter,
    marginLeft: 15,
    marginTop: -5,
    marginBottom: 10,
  },
  user: {
    marginLeft: 10,
    fontSize: 13,
    color: '#333',
  },
});
export default ScheduleModal;
