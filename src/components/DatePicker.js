import React, { Component } from "react";
import { View, Button, Platform, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default class App extends Component {
  state = {
    // "2020-06-12T14:42:42"
    date: new Date(),
    mode: "date",
    show: false
  };

  setDate = (event, date) => {
    date = date || this.state.date;

    this.setState({
      show: Platform.OS === "ios" ? true : false,
      date
    });
  };

  show = mode => {
    this.setState({
      show: true,
      mode
    });
  };

  datepicker = () => {
    Platform.OS === "ios" ? this.show("datetime") : this.show("date")
  };

  timepicker = () => {
    this.show("datetime");
  };

  render() {
    const { show, date, mode } = this.state;

    return (
      <View>
        <View styles={styles.container}>
          <Button onPress={this.datepicker} title={this.props.title} />
        </View>
        {show && (
          <DateTimePicker
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={this.setDate}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 250
  }
})