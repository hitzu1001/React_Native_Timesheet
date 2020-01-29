import React, { Component } from 'react'
import { Text, View } from 'react-native'
import DatePicker from '../components/DatePicker'

export class TimeSheetForm extends Component {
  constructor(props) {
    super(props);
  }
  

  render() {
    return (
      <View>
        <Text> Add TimeSheet </Text>
        <DatePicker title="Start Time" setTime={this.props.setStart}/>
        {/* <DatePicker title="End Time"/> */}
        <Text>Total: </Text>
      </View>
    )
  }
}

export default TimeSheetForm
