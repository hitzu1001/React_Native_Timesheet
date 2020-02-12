import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert, FlatList } from 'react-native';
import moment from 'moment';
import { Context as TimesheetContext } from '../context/TimesheetContext';
import { Context as UserContext } from '../context/AuthContext';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import containerStyle from '../style/containerStyle';
import iconStyle from '../style/iconStyle';
import modalStyle from '../style/modalStyle';
import uuid from 'uuid/v4';

const ShowScreen = ({ navigation }) => {
  const { state, deleteTimesheet, getTimesheets, editTimesheet } = useContext(TimesheetContext);
  const { state: user } = useContext(UserContext);
  const [userRole, setUserRole] = useState('Employee');
  const timesheet = state.find(timesheet =>
    timesheet._id === navigation.getParam('id')
  )
  const timeDiff = parseInt(
    moment(timesheet.endTime).diff(moment(timesheet.startTime), "minutes")
  );
  const hours = (timeDiff - (timeDiff % 60)) / 60;
  const minutes = timeDiff % 60;

  useEffect(() => {
    Array.isArray(user) && setUserRole(user[0].role)
    const callDeleteTimesheet = () => {
      deleteTimesheet(navigation.getParam('id'), () => {
        navigation.navigate('Timesheet');
      });
    };
    navigation.setParams({ callDeleteTimesheet, status: timesheet.status });

    const listener = navigation.addListener("didFocus", () => {
      getTimesheets();
    });

    return () => {
      listener.remove();
    };
  }, []);

  return (
    <ScrollView>
      <View style={styles.timeContainer}>
        <View style={containerStyle.rowCenterCenter}>
          <Text style={styles.time}>
            {moment(timesheet.startTime).format('LT')}
          </Text>
          <Ionicons style={iconStyle.forwardIcon} name='ios-arrow-forward' />
          <Text style={styles.time}>
            {moment(timesheet.endTime).format('LT')}
          </Text>
        </View>
        <Text style={styles.timeDiff}> {hours} hrs {minutes} mins</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>TASK</Text>
        <Text style={styles.content}>
          {timesheet.task}
        </Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>NOTES</Text>
        <Text style={styles.content} numberOfLines={3} ellipsizeMode='tail'>
          {timesheet.notes}
        </Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>ATTACHMENTS</Text>
        <View style={containerStyle.rowWrap}>
          {timesheet.images.length > 0
            ? timesheet.images.map(i =>
              <TouchableOpacity
                key={uuid()}
                onPress={() => {
                  navigation.navigate('PhotoShow', {
                    uri: i.uri,
                    initialComment: i.comment,
                  });
                }}
              >
                <Image style={styles.image} source={{ uri: i.uri }} />
              </TouchableOpacity>)
            : <Text style={styles.none}>None</Text>}
        </View>
      </View>
      {userRole === "Manager" && (timesheet.status === "PENDING") &&
        <>
          <View style={styles.auditContainer}>
            <TouchableOpacity
              style={{ ...styles.auditBtn, backgroundColor: '#5cb85c' }}
              onPress={() => {
                editTimesheet(timesheet._id, timesheet.startTime, timesheet.endTime,
                  timesheet.task, timesheet.notes, timesheet.images, "APPROVED", () => {
                    navigation.pop();
                  })
              }}>
              <View style={containerStyle.rowCenterCenter}>
                <FontAwesome style={iconStyle.auditIcon} name='check' />
                <Text style={styles.buttonText}>Approve</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.auditBtn, backgroundColor: '#d9534f' }}
              onPress={() => {
                editTimesheet(timesheet._id, timesheet.startTime, timesheet.endTime,
                  timesheet.task, timesheet.notes, timesheet.images, "DECLINED", () => {
                    navigation.pop();
                  })
              }}>
              <View style={containerStyle.rowCenterCenter}>
                <FontAwesome style={iconStyle.auditIcon} name='times' />
                <Text style={styles.buttonText}>Decline</Text>
              </View>
            </TouchableOpacity>
          </View>
        </>
      }
    </ScrollView >
  );
};

ShowScreen.navigationOptions = ({ navigation }) => {
  const { startTime } = navigation.state.params;
  let thisDay = moment(startTime);
  return {
    title:
      `${thisDay.format('ddd')}, ${thisDay.format('DD MMM YYYY')}`,
    headerLeft: <TouchableOpacity style={iconStyle.iconTouchLeft}
      onPress={() => navigation.navigate('Timesheet')}
    >
      <Ionicons style={iconStyle.backIcon} name='ios-arrow-back' />
    </TouchableOpacity>,
    headerRight:
      <>
        {navigation.state.params.status === "PENDING" && <TouchableOpacity style={iconStyle.iconTouchRight}
          onPress={() =>
            navigation.navigate('Edit', { id: navigation.getParam('id') })
          }
        >
          <FontAwesome style={iconStyle.editIcon} name='pencil' />
        </TouchableOpacity>}
        <TouchableOpacity style={iconStyle.iconTouchRight}
          onPress={() => {
            Alert.alert('Delete timesheet?', '',
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Delete', onPress: () => {
                    navigation.state.params.callDeleteTimesheet()
                  }
                }
              ],
              { cancelable: false },
            )
          }}
        >
          <Ionicons style={iconStyle.trashIcon} name='md-trash' />
        </TouchableOpacity>
      </>
  };
};

const styles = StyleSheet.create({
  timeContainer: {
    ...modalStyle.shadowContainer3,
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 15,
    alignItems: 'center',
  },
  time: {
    fontSize: 22,
    fontWeight: '500',
    color: '#333'
  },
  timeDiff: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
    color: '#999'
  },
  container: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 3,
  },
  image: {
    width: 65,
    height: 65,
    marginRight: 8,
    marginTop: 5,
    borderWidth: 0.5,
    borderColor: '#d3d3d3'
  },
  none: {
    color: 'dimgray'
  },
  auditContainer: {
    ...containerStyle.rowSANull,
    marginHorizontal: 50,
  },
  auditBtn: {
    ...modalStyle.shadowContainer1,
    marginTop: 20,
    marginBottom: 20,
    width: 120,
    borderRadius: 8,
    borderWidth: 0.1,
  },
  buttonText: {
    paddingVertical: 8,
    fontSize: 16,
    fontWeight: '500',
    color: '#fff'
  },
});
export default ShowScreen;