import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';
import ButtonSelector from '../components/ButtonSelector';
import ProgressChart from '../components/ProgressChart';

const PersonalOverview = ({ timesheets: tasks, userId }) => {
  const [option, setOption] = useState(0)
  const from_date = moment().startOf('week').format('DD-MMM');
  const to_date = moment().endOf('week').format('DD-MMM');
  const buttons = ['DAY TOTAL', 'WEEK TOTAL'];
  let filteredTasks =[]
  tasks? filteredTasks = tasks.filter(task => task.userId === userId) : null
  let dayRatio = 0
  let weekRatio = 0

  for (let i = 0; i < filteredTasks.length; i++) {
    if (moment(filteredTasks[i].startTime).isSame(moment(), 'day')) {
      dayRatio = dayRatio + parseInt(moment(filteredTasks[i].endTime).diff(filteredTasks[i].startTime, 'minutes'), 10) / 480;
      // filteredTasks.push(tasks[i])
    }
  }

  for (let i = 0; i < filteredTasks.length; i++) {
    if ((moment(filteredTasks[i].startTime).isAfter(moment().startOf('week'))) && (moment(filteredTasks[i].startTime).isBefore(moment().endOf('week')))) {
      weekRatio = weekRatio + parseInt(moment(filteredTasks[i].endTime).diff(filteredTasks[i].startTime, 'minutes'), 10) / 2400;
    }
  }

  return (
    <View>
      <ButtonSelector buttons={buttons} setOption={option => setOption(option)} />
      {option === 0 &&
        <>
          <ProgressChart percentage={Number((dayRatio).toFixed(6))} title={"of 8 hrs"} />
          <View style={styles.optionContainer}>
            <View style={styles.dateContainer}>
              <Text style={styles.label}>Today</Text>
              <Text style={styles.date}>{moment().format('DD-MMM')}</Text>
            </View>
          </View>
        </>
      }
      {option === 1 &&
        <>
          <ProgressChart percentage={Number((weekRatio).toFixed(6))} title={"of 40 hrs"} />
          <View style={styles.optionContainer}>
            <View style={styles.dateContainer}>
              <Text style={styles.label}>Week Start</Text>
              <Text style={styles.date}>{from_date}</Text>
            </View>
            <View style={styles.line}></View>
            <View style={styles.dateContainer}>
              <Text style={styles.label}>Week End</Text>
              <Text style={styles.date}>{to_date}</Text>
            </View>
          </View>
        </>
      }
    </View >
  )
}

const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  dateContainer: {
    paddingVertical: 0,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    alignItems: "center",
  },
  line: {
    width: 1,
    height: 40,
    backgroundColor: 'lightgray',
    alignSelf: 'flex-end',
  },
  label: {
    marginBottom: 8,
    color: '#a9a9a9',
    fontSize: 12,
    fontWeight: '500',
    paddingHorizontal: 25
  },
  date: {
    color: '#555',
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default PersonalOverview;
