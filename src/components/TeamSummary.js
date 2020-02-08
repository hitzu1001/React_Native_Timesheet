import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ButtonSelector from './ButtonSelector';

const TeamSummary = ({ blogPosts }) => {
  const [option, setOption] = useState(0)
  const buttons = ['DAILY', 'WEEKLY', 'MONTHLY', 'TOTAL'];
  const colorCode= ['#617be3', '#61d4b3', '#fdd365', '#fb8d62', '#f54291']
  const teamTasks = [
    { task: 'Task1', ratio: 0.13, color: '#617be3' },
    { task: 'Task2', ratio: 0.26, color: '#61d4b3' },
    { task: 'Task3', ratio: 0.07, color: '#fdd365' },
    { task: 'Task4', ratio: 0.32, color: '#fb8d62' },
    { task: 'Task5', ratio: 0.22, color: '#f54291' },
  ];
  const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7);

  return (
    <>
      <ButtonSelector buttons={buttons} setOption={option => setOption(option)} />
      {
        // option === 1 &&
        <View style={styles.container}>
          <Text style={styles.title}>Team Summary</Text>
          <Text style={styles.subtitle}>{buttons[`${option}`]} Jobs</Text>
          <FlatList
            data={teamTasks}
            keyExtractor={teamTasks => teamTasks.task}
            renderItem={({ item }) => {
              return (
                <View style={styles.taskContainer}>
                  <View style={styles.bar}></View>
                  <View style={{ flexDirection: 'row', marginTop: -16 }}>
                    <View style={{ ...styles.colorBar, flex: item.ratio, backgroundColor: item.color, }}></View>
                    <View style={styles.stuff}></View>
                  </View>
                  <View style={styles.taskContent}>
                    <Text style={styles.label}>{item.task}</Text>
                    <Text style={styles.label}>{item.ratio}</Text>
                  </View>
                </View>
              );
            }}
          />
        </View>}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginHorizontal: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    marginBottom: 15,
    fontSize: 13,
    color: '#696969',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  taskContainer: {
    marginTop: 30,
  },
  bar: {
    flex: 1,
    height: 16,
    backgroundColor: '#d3d3d3',
    borderRadius: 8,
  },
  colorBar: {
    height: 16,
    borderRadius: 8,
  },
  stuff: {

  },
  taskContent: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
  }
});

export default TeamSummary;
