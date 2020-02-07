import { SafeAreaView, ScrollView, StyleSheet, View, Text, StatusBar, Button, Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import React, { Fragment, Component } from 'react';
import moment from 'moment';

export default class App extends Component {
  state = {
    date1: new Date(moment(this.props.startTime).local().toDate()),
    date2: new Date(moment(this.props.endTime).local().toDate()),
    mode: 'date',
    show1: false,
    show2: false,
  }

  setDate1 = (event, date1, date2) => {
    date1 = date1 || this.state.date1;
    date2 = date2 || this.state.date2;
    this.setState({
      show1: Platform.OS === 'ios' ? true : false,
      date1,
      date2: date1
    });
    if (this.props.disabled === true) {
      this.setState({
        date1: moment(date1).local().set('hour', 9).set('minute', 0),
        date2: moment(date1).local().set('hour', 17).set('minute', 0)
      })
    }
    this.props.setStartTime(date1)
    this.props.setEndTime(date2)
  }

  setDate2 = (event, date2) => {
    date2 = date2 || this.state.date2;
    this.setState({
      show2: Platform.OS === 'ios' ? true : false,
      date2
    });
    this.props.setEndTime(date2)
  }

  changeMode = mode => {
    if ((mode === 'date') || (mode === 'time1')) {
      if (mode === this.state.mode) {
        this.setState({ show1: !this.state.show1, show2: false });
      } else {
        this.setState({ show1: true, show2: false, mode });
      }
    } else if (mode === 'picker1') {
      this.setState({ show1: !this.state.show1, show2: false });
    } else {
      this.setState({ show1: false, show2: !this.state.show2, mode });
    }
  }

  render() {
    const { mode, show1, show2, date1, date2 } = this.state;
    var timeDiff = parseInt(
      moment(this.state.date2).diff(this.state.date1, "minutes"), 10
    );
    var hours = (timeDiff - (timeDiff % 60)) / 60;
    var minutes = timeDiff % 60;

    return (
      <Fragment>
        <StatusBar barStyle='dark-content' />
        <SafeAreaView>
          <ScrollView
            style={styles.scrollView}
            contentInsetAdjustmentBehavior='automatic'
          >
            <View style={styles.body}>
              <Text style={styles.task}>START TIME</Text>
              <View testID='appRootView' style={styles.container}>
                <TouchableOpacity onPress={() => this.changeMode('date')} >
                  <Text style={styles.btn}>Date</Text>
                </TouchableOpacity>
                {!this.props.disabled &&
                  <TouchableOpacity onPress={() => this.changeMode('time1')} disabled={this.props.disabled}>
                    <Text style={styles.btn}>Time</Text>
                  </TouchableOpacity>}
                <TouchableOpacity style={styles.dateTimeBtn} onPress={() => this.changeMode('picker1')}>
                  <Text testID='dateTimeText' style={styles.dateTimeText}>
                    {moment(date1).utc().local().format('YYYY-MM-DD HH:mm')}
                  </Text>
                </TouchableOpacity>
              </View>
              {show1 &&
                <DateTimePicker timeZoneOffsetInMinutes={660} value={new Date(date1)}
                  mode={mode} is24Hour={false} display='default' onChange={this.setDate1}
                />
              }

              <Text style={styles.task}>END TIME</Text>
              <View testID='appRootView' style={styles.container}>
                <TouchableOpacity disabled={true}>
                  <Text style={{ ...styles.btn, opacity: 0 }}>Date</Text>
                </TouchableOpacity>
                {!this.props.disabled &&
                  <TouchableOpacity onPress={() => this.changeMode('time2')} disabled={this.props.disabled}>
                    <Text style={styles.btn}>Time</Text>
                  </TouchableOpacity>}
                {!this.props.disabled &&
                  <TouchableOpacity
                    style={styles.dateTimeBtn}
                    onPress={() => this.changeMode('picker2')}
                    disabled={this.props.disabled}
                  >
                    <Text testID='dateTimeText' style={styles.dateTimeText}>
                      {moment(date2).utc().local().format('YYYY-MM-DD HH:mm')}
                    </Text>
                  </TouchableOpacity>}
                {this.props.disabled &&
                  <Text testID='dateTimeText' style={styles.dateTimeText}>
                    {moment(date2).utc().local().format('YYYY-MM-DD HH:mm')}
                  </Text>}

              </View>
              {!this.props.disabled && show2 &&
                <DateTimePicker timeZoneOffsetInMinutes={660} value={new Date(date2)}
                  mode={mode} is24Hour={false} display='default' onChange={this.setDate2}
                />
              }
            </View>
          </ScrollView>
          <View style={styles.totalContainer}>
            <Text>Total</Text>
            <Text> {hours} hours {minutes} minutes</Text>
          </View>
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
    color: '#20B2AA',
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
  totalContainer: {
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white"
  }
});