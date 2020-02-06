import React, { useContext, useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Text as T } from 'react-native';
import { Avatar } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Context as BlogContext } from '../context/BlogContext';
import ProgressChart from '../components/ProgressChart'
import BarComponent from '../components/BarComponent'
// import { StackedBarChart, ProgressCircle } from 'react-native-svg-charts'
import { Text, G } from 'react-native-svg'
import moment from 'moment'

const OverviewScreen = ({ navigation }) => {
  const { getBlogPosts } = useContext(BlogContext);
  const [option, setOption] = useState("Day")
  const from_date = moment().startOf('week').format('DD-MMM');
  const to_date = moment().endOf('week').format('DD-MMM');

  useEffect(() => {
    getBlogPosts();
    const listener = navigation.addListener('didFocus', () => {
      getBlogPosts();
    });
    return () => {
      listener.remove();
    };
  }, []);


  return (
    <ScrollView style={styles.headerContainer}>
      <Text style={styles.header}>OverviewScreen</Text>
      <View style={styles.scheduleContainer}>
        <View style={styles.optionContainer}>
          <TouchableOpacity onPress={() => { setOption("Day") }}>
            <T style={styles.option}>DAY TOTAL</T>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setOption("Week") }}>
            <T style={styles.option}>WEEK TOTAL</T>
          </TouchableOpacity>
        </View>
        {option === "Day" && <ProgressChart percentage={0.4} title={"of 8hrs"} style={styles.progressChart} />}
        {option === "Week" && <ProgressChart percentage={0.4} title={"of 40hrs"} style={styles.progressChart} />}
        <View style={styles.optionContainer}>
          <View style={styles.dateContainer}>
            <T style={styles.dateDisplay}>Start Week</T>
            <T style={styles.dateDisplay}>{from_date}</T>
          </View>
          <View style={styles.dateContainer}>
            <T style={styles.dateDisplay}>End Week</T>
            <T style={styles.dateDisplay}>{to_date}</T>
          </View>
        </View>
      </View>
      <View style={styles.scheduleContainer}>
        <BarComponent />
      </View>

    </ScrollView>
  );
};

OverviewScreen.navigationOptions = ({ navigation }) => {
  return {
    title: 'Overview',
    // headerStyle: {
    //   backgroundColor: '#20b2aa',
    // },
    // headerTintColor: 'black',
    // headerTitleStyle: {
    //   fontWeight: 'bold',
    // },
    headerLeft: <Avatar rounded title="TS" containerStyle={styles.avatar} />,
  };
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
  },
  avatar: {
    marginLeft: 20
  },
  scheduleContainer: {
    marginBottom: 15,
    marginTop: 15,
    marginHorizontal: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderRadius: 3,
    borderColor: '#909090',
    backgroundColor: 'white',
    alignSelf: 'stretch',
    borderRadius: 20
  },
  progressChart: {
    paddingVertical: 5,
    paddingHorizontal: 10
  }, optionContainer: {
    flexDirection: "row",
    justifyContent: "space-around"
  }, option: {
    marginVertical: 10,
    fontWeight: "bold",
    borderColor: "grey",
    borderRadius: 5,
    borderWidth: 2,
    padding: 5,
    paddingHorizontal: 25
  }, dateDisplay: {
    marginVertical: 5,
    fontWeight: "bold",
    paddingHorizontal: 5
  }, dateContainer: {
    marginHorizontal: 15,
    paddingVertical: 0,
    paddingHorizontal: 10,
    borderColor: '#909090',
    backgroundColor: 'white',
    alignSelf: 'stretch',
    borderRadius: 20,
    alignItems: "center"
  },
});

export default OverviewScreen;
