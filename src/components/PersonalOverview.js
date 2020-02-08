import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';
import ButtonSelector from '../components/ButtonSelector';
import ProgressChart from '../components/ProgressChart';

const PersonalOverview = ({ blogPosts }) => {
  const [option, setOption] = useState(0)
  const from_date = moment().startOf('week').format('DD-MMM');
  const to_date = moment().endOf('week').format('DD-MMM');
  const buttons = ['DAY TOTAL', 'WEEK TOTAL'];

  return (
    <View>
      <ButtonSelector buttons={buttons} setOption={option => setOption(option)} />
      {option === 0 && <ProgressChart percentage={0.6} title={"of 8 hrs"} />}
      {option === 1 && <ProgressChart percentage={0.4} title={"of 40 hrs"} />}
      {option === 0 &&
        <View style={styles.optionContainer}>
          <View style={styles.dateContainer}>
            <Text style={styles.label}>Today</Text>
            <Text style={styles.date}>{moment().format('DD-MMM')}</Text>
          </View>
        </View>
      }
      {option === 1 &&
        <View style={styles.optionContainer}>
          <View style={styles.dateContainer}>
            <Text style={styles.label}>Start Week</Text>
            <Text style={styles.date}>{from_date}</Text>
          </View>
          <View style={styles.line}></View>
          <View style={styles.dateContainer}>
            <Text style={styles.label}>End Week</Text>
            <Text style={styles.date}>{to_date}</Text>
          </View>
        </View>
      }
    </View>
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
