import { SafeAreaView, ScrollView, StyleSheet, View, Text, StatusBar, Button, Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import React, { Fragment, Component } from 'react';
import moment from 'moment';

export default class App extends Component {
  state = {
    date1: new Date(moment(this.props.startTime).local().toDate()),
    date2: new Date(moment(this.props.endTime).local().toDate()),
    mode1: 'time',
    mode2: 'time',
    show1: false,
    show2: false,
  }

  setDate1 = (event, date1) => {
    date1 = date1 || this.state.date1;
    this.setState({
      show1: Platform.OS === 'ios' ? true : false,
      date1,
      date2: date1
    });
    this.props.setStartTime(date1)
    this.props.setEndTime(date1)
  }

  setDate2 = (event, date2) => {
    date2 = date2 || this.state.date2;
    this.setState({
      show2: Platform.OS === 'ios' ? true : false,
      date2
    });
    this.props.setEndTime(date2)
  }

  show1 = mode1 => {
    this.setState({
      show1: true,
      mode1,
    });
  }

  datepicker1 = () => {
    this.show1('date');
    this.state.mode1 === "date" && this.setState({ show1: !this.state.show1 })
  }

  timepicker1 = () => {
    this.show1('time');
    this.state.mode1 === "time" && this.setState({ show1: !this.state.show1 })
  }

  picker1 = () => {
    this.setState({
      show1: !this.state.show1,
    });
  }

  show2 = mode2 => {
    this.setState({
      show2: true,
      mode2,
    });
  }

  datepicker2 = () => {
    this.show2('date');
    this.state.mode2 === "date" && this.setState({ show2: !this.state.show2 })
  }

  timepicker2 = () => {
    this.show2('time');
    this.state.mode2 === "time" && this.setState({ show2: !this.state.show2 })
  }

  picker2 = () => {
    this.setState({
      show2: !this.state.show2,
    });
  }

  render() {
    const { show1, date1, mode1, show2, date2, mode2 } = this.state;

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
                <TouchableOpacity onPress={this.datepicker1} >
                  <Text style={styles.btn}>Date</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.timepicker1} disabled={this.props.disabled}>
                  <Text style={styles.btn}>Time</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dateTimeBtn} onPress={this.picker1} disabled={this.props.disabled}>
                  <Text testID="dateTimeText" style={styles.dateTimeText}>
                    {moment(date1).utc().local().format('YYYY-MM-DD HH:mm')}
                  </Text>
                </TouchableOpacity>
              </View>
              {show1 &&
                <DateTimePicker timeZoneOffsetInMinutes={660} value={new Date(date1)}
                  mode={mode1} is24Hour={false} display="default" onChange={this.setDate1}
                />
              }
              <Text style={styles.task}>END TIME</Text>
              <View testID="appRootView" style={styles.container}>
                <TouchableOpacity disabled={true}>
                  <Text style={{...styles.btn, opacity: 0}}>Date</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.timepicker2} disabled={this.props.disabled}>
                  <Text style={styles.btn}>Time</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dateTimeBtn} onPress={this.picker2} disabled={this.props.disabled}>
                  <Text testID="dateTimeText" style={styles.dateTimeText}>
                    {moment(date2).utc().local().format('YYYY-MM-DD HH:mm')}
                  </Text>
                </TouchableOpacity>
              </View>
              {!this.props.disabled && show2 &&
                <DateTimePicker timeZoneOffsetInMinutes={660} value={new Date(date2)}
                  mode={mode2} is24Hour={false} display="default" onChange={this.setDate2}
                />
              }
            </View>
          </ScrollView>
        </SafeAreaView>
      </Fragment >
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
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 3,
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btn: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    color: "#20B2AA",
    fontSize: 15,
    // borderColor: 'blue',
    // borderWidth: 2,
  },
  dateTimeBtn: {
    flex: 1,
    marginLeft: 40,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    // borderColor: 'red',
    // borderWidth: 2,
  },
  dateTimeText: {
    paddingVertical: 5,
    // marginHorizontal: 5,
    fontSize: 15,
    // borderColor: 'green',
    // borderWidth: 2,
  },
});