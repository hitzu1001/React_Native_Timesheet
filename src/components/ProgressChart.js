import React from 'react'
import { StyleSheet } from 'react-native';
import { Text, G } from 'react-native-svg'
import { ProgressCircle } from 'react-native-svg-charts'
import moment from 'moment'

class PregressChart extends React.PureComponent {
  render() {
    let textColor = '#20b2aa'
    let time = 0
    if (this.props.percentage > 1) {
      textColor = 'red'
    }
    if (this.props.title === 'of 8hrs') {
      time = this.props.percentage * 480
    } else {
      time = this.props.percentage * 2400
    }
    var hours = (time - (time % 60)) / 60;
    var minutes = time % 60;

    const TextGroup = () => (
      <G key='title'>
        <Text alignmentBaseline='text-bottom' fontSize='32' fontWeight='bold' y={5} x={-60}>
          {hours} h {minutes} m
            </Text>
        <Text key='subtitle' textAnchor='middle' alignmentBaseline='text-top' y={8} fontSize='18'>
          {this.props.title}
        </Text>
      </G>
    )

    return (
      <ProgressCircle style={styles.progressChart} progress={this.props.percentage} progressColor={textColor} strokeWidth={14} >
        <TextGroup />
      </ProgressCircle>
    )
  }
}

const styles = StyleSheet.create({
  progressChart: {
    marginVertical: 15,
    marginHorizontal: 15,
    height: 180
  },
  progressText: {

  }
})

export default PregressChart