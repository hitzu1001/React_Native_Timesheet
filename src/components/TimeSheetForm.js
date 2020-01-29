import React, { Component } from 'react'
import { Text, View } from 'react-native'
// import DatePicker from '../components/DatePicker'

export class TimeSheetForm extends Component {
  render() {
    return (
      <View>
        <Text> Add TimeSheet </Text>
        <DatePicker title="Start Time"/>
        <DatePicker title="End Time"/>
        <Text>Total: </Text>
      </View>
    )
  }
}

export default TimeSheetForm
