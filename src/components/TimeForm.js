import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import DatePicker from "./DatePicker";
import moment from "moment";
moment.utc(new Date()).local().format()
export class TimeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    this.props.setStartTime(moment.utc(date).local().format());
    this.setState({
      startTime: moment.utc(date).local().format()
    });
  }

  setEndTime(date) {
    this.props.setEndTime(moment.utc(date).local().format());
    this.setState({
      endTime: moment.utc(date).local().format()
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
        <DatePicker
          title="START TIME"
          setTime={this.setStartTime}
          time={this.props.startTime}
          disabled={this.props.disabled}
        />
        <DatePicker
          title="END TIME"
          setTime={this.setEndTime}
          time={this.props.endTime}
          disabled={this.props.disabled}
        />
        <View style={styles.totalContainer}>
          <Text>Total</Text>
          <Text> {hours} hours {minutes} minutes</Text>
        </View>
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
