import React, { Component } from 'react'
import { Text, View } from 'react-native'
// import DatePicker from '../components/DatePicker'

export class TimeSheetForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: new Date(
        moment
          .utc()
          .startOf("day")
          .add(27, "hours")
          .toDate()
      ),
      endTime: new Date(
        moment
          .utc()
          .startOf("day")
          .add(27, "hours")
          .toDate()
      )
    };
    this.setStartTime = this.setStartTime.bind(this);
    this.setEndTime = this.setEndTime.bind(this);
  }

  setStartTime(date) {
    this.setState({
      startTime: date
    });
    console.log("Time in TimeForm:");
    console.log(this.state.startTime);
  }

  setEndTime(date) {
    this.setState({
      endTime: date
    });
  }

  render() {
    var timeDiff = parseInt(
      moment(this.state.endTime).diff(this.state.startTime, "minutes"),
      10
    );
    console.log(timeDiff)
    var hours = (timeDiff - (timeDiff % 60))/60;
    var minutes = (timeDiff % 60);

    return (
      <View>
        <Text> Add TimeSheet </Text>
        <Text>
          StartTime:
          {moment(this.state.startTime)
            .utc()
            .format("YYYY-MM-DD HH:mm")}{" "}
        </Text>
        <Text>
          EndTime:
          {moment(this.state.endTime)
            .utc()
            .format("YYYY-MM-DD HH:mm")}{" "}
        </Text>
        <Text>
          Total Time: {hours} hours {minutes} minutes
        </Text>
        <DatePicker title="Start Time" setTime={this.setStartTime} />
        <DatePicker title="End Time" setTime={this.setEndTime} />
        {/* <DatePicker title="End Time"/> */}
      </View>
    );
  }
}

export default TimeSheetForm;
