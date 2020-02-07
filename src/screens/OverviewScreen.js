import React, { useContext, useEffect, useState } from 'react';
import { StatusBar, SafeAreaView } from 'react-native';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import moment from 'moment'
import UserAvatar from '../components/UserAvatar';
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
    <SafeAreaView >
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.screen}>
        <View style={styles.overviewContainer}>
          <ButtonSelector setOption={option => setOption(option)} />
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

        <View style={styles.overviewContainer}>
          <Text>Team Week Summary</Text>
          <Text>Weekly Jobs</Text>
          <BarComponent />
        </View>
      </ScrollView>
    </SafeAreaView >
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
    headerLeft: <UserAvatar />,
  };
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
  },
  screen: {
    backgroundColor: '#f6f6f6',
  },
  overviewContainer: {
    ...modalStyle.shadowContainer3,
    marginBottom: 15,
    marginTop: 15,
    marginHorizontal: 15,
    paddingBottom: 15,
  },
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

export default OverviewScreen;
