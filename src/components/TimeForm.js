import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import DatePicker from "./DatePicker";
import moment from "moment";
export class TimeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: this.props.startTime,
      endTime: this.props.endTime,
      // allDay: this.props.disabled,
    };
    this.setStartTime = this.setStartTime.bind(this);
    this.setEndTime = this.setEndTime.bind(this);
  }


  componentDidUpdate() {
    this.props.setStartTime(this.state.startTime);
    this.props.setEndTime(this.state.endTime);
  }

  setStartTime(date) {
    this.props.setStartTime(moment.utc(date).local().format());
    this.setState({
      startTime: moment.utc(date).local().format(),
      endTime: moment.utc(date).local().format()
    });
  }

  setEndTime(date) {
    this.props.setEndTime(moment.utc(date).local().format());
    this.setState({
      endTime: moment.utc(date).local().format()
    });
  }

  render() {
    return (
      <View>
        <DatePicker
          setStartTime={this.setStartTime}
          startTime={this.props.startTime}
          setEndTime={this.setEndTime}
          endTime={this.props.endTime}
          setDate={this.setEndTime}
          disabled={this.props.disabled}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default TimeForm;
