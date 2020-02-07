import React, { useContext, useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Text as T, G } from 'react-native-svg'
import moment from 'moment'
// import SwitchSelector from "react-native-switch-selector";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ProgressChart from '../components/ProgressChart';
import BarComponent from '../components/BarComponent';
import ButtonSelector from '../components/ButtonSelector';
import { Context as BlogContext } from '../context/BlogContext';
import modalStyle from '../style/modalStyle';
// import { StackedBarChart, ProgressCircle } from 'react-native-svg-charts'

const OverviewScreen = ({ navigation }) => {
  const { getBlogPosts } = useContext(BlogContext);
  const [option, setOption] = useState(0)
  const from_date = moment().startOf('week').format('DD-MMM');
  const to_date = moment().endOf('week').format('DD-MMM');

  // const options = [
  //   { label: "DAY TOTAL", value: "Day" },
  //   { label: "WEEK TOTAL", value: "Week" },
  // ];

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
      <View style={styles.personalOverview}>
        <View style={styles.buttonGroup}>
          <ButtonSelector setOption={option => setOption(option)} />
          {option === 0 && <ProgressChart percentage={0.4} title={"of 8hrs"} style={styles.progressChart} />}
          {option === 1 && <ProgressChart percentage={0.4} title={"of 40hrs"} style={styles.progressChart} />}
          <View style={styles.optionContainer}>
            <View style={styles.dateContainer}>
              <Text style={styles.dateDisplay}>Start Week</Text>
              <Text style={styles.dateDisplay}>{from_date}</Text>
            </View>
            <View style={styles.dateContainer}>
              <Text style={styles.dateDisplay}>End Week</Text>
              <Text style={styles.dateDisplay}>{to_date}</Text>
            </View>
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
  headerContainer: {
    backgroundColor: '#f6f6f6',
  },
  personalOverview: {
    ...modalStyle.shadowContainer3,
    marginBottom: 15,
    marginTop: 15,
    marginHorizontal: 15,
    paddingBottom: 15,
  },
  buttonGroup: {
    marginVertical: -6,
    marginHorizontal: -11,
  },



  progressChart: {
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  option: {
    marginVertical: 10,
    fontWeight: "bold",
    borderColor: "grey",
    borderRadius: 5,
    borderWidth: 2,
    padding: 5,
    paddingHorizontal: 25
  },
  dateDisplay: {
    marginVertical: 5,
    fontSize: 12,
    fontWeight: "bold",
    paddingHorizontal: 5
  },
  dateContainer: {
    marginHorizontal: 15,
    paddingVertical: 0,
    paddingHorizontal: 10,
    borderColor: '#909090',
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: "center"
  },
});

export default OverviewScreen;
