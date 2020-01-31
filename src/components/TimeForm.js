import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import DatePicker from "./DatePicker";
import moment from "moment";

export class TimeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // moment.utc().startOf('day').add(27, 'hours').toDate()
      // startTime: new Date(moment.utc().startOf('day').add(27, 'hours').toDate()),
      startTime: this.props.startTime,
      endTime: this.props.endTime
    };
    this.setStartTime = this.setStartTime.bind(this);
    this.setEndTime = this.setEndTime.bind(this);
  }

  componentDidMount() {
    this.props.setStartTime(this.state.startTime);
    this.props.setEndTime(this.state.endTime);
    // console.log(moment.utc(this.state.startTime).local())
  }
  // moment.utc(this.state.startTime).local().format()
  setStartTime(date) {
    this.props.setStartTime(date);
    this.setState({
      startTime: date
    });
  }

  setEndTime(date) {
    this.props.setEndTime(date);
    this.setState({
      endTime: date
    });
  }

  render() {
    var timeDiff = parseInt(
      moment(this.state.endTime).diff(this.state.startTime, "minutes"),
      10
    );

    var hours = (timeDiff - (timeDiff % 60)) / 60;
    var minutes = timeDiff % 60;

    return (
      <View>
        <DatePicker title="START TIME" setTime={this.setStartTime} time={this.props.startTime}/>
        <DatePicker title="END TIME" setTime={this.setEndTime} time={this.props.endTime} />
        <View style={styles.totalContainer}>
          <Text>Total</Text>
          <Text>
            {hours} hours {minutes} minutes
          </Text>
        </View>
        {/* <DatePicker title="End Time"/> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  totalContainer: {
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});

export default TimeForm;
