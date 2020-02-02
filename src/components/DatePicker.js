import { SafeAreaView, ScrollView, StyleSheet, View, Text, StatusBar, Button, Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import React, { Fragment, Component } from 'react';
import moment from 'moment';


// type Props = {};
export default class App extends Component {
  state = {
    // date: new Date(moment('2020-01-01T19:00:00').toDate()),
    date: new Date(moment(this.props.time).local().toDate()),
    mode: 'time',
    show: false,
  }

  setDate = (event, date) => {
    date = date || this.state.date;
    this.setState({
      show: Platform.OS === 'ios' ? true : false,
      date
    });
    this.props.setTime(date)
  }

  show = mode => {
    this.setState({
      show: true,
      mode,
    });
  }

  datepicker = () => {
    this.show('date');
    this.setState({
      show: !this.state.show,
    });
  }

  timepicker = () => {
    this.show('time');
    this.setState({
      show: !this.state.show,
    });
  }
  
  picker = () => {
    this.setState({
      show: !this.state.show,
    });
  }

  render() {
    const { show, date, mode } = this.state;

    // console.log(`datePicker: ${date}`)

    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.body}>
              <Text style={styles.task}>{this.props.title}</Text>
              <View testID="appRootView" style={styles.container}>
                <TouchableOpacity onPress={this.datepicker} >
                  <Text style={styles.btn}>Date</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.timepicker} >
                  <Text style={styles.btn}>Time</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dateTime} onPress={this.picker}>
                  <Text testID="dateTimeText" style={styles.dateTimeText}>
                    {moment(date).utc().local().format('YYYY-MM-DD HH:mm')}
                  </Text>
                </TouchableOpacity>
              </View>
              {show && <DateTimePicker timeZoneOffsetInMinutes={660} value={new Date(date)} mode={mode} is24Hour={true} display="default" onChange={this.setDate} />}
            </View>
          </ScrollView>
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
  task: {
    fontSize: 12,
    fontWeight: 'bold'
  },
  container: {
    marginVertical: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 3,
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  btn: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: "#20B2AA",
    fontSize: 15,
    // borderColor: 'red',
    // borderWidth: 2,
  },
  dateTime: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  dateTimeText: {
    paddingVertical: 5,
    fontSize: 15,
    marginRight: 5,
    // borderColor: 'red',
    // borderWidth: 2,
  },
});