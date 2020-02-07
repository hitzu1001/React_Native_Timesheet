import React from 'react'
import { View, StyleSheet } from 'react-native';
import { Text, G } from 'react-native-svg'
import { ProgressCircle } from 'react-native-svg-charts'

class PregressChart extends React.PureComponent {
  render() {
    let fillColor = '#20b2aa'
    let time = 0
    if (this.props.percentage > 1) {
      fillColor = '#ff0000'
    }
    if (this.props.title === 'of 8 hrs') {
      time = this.props.percentage * 480
    } else {
      time = this.props.percentage * 2400
    }
    var hours = (time - (time % 60)) / 60;
    var minutes = time % 60;

    const TextGroup = () => (
      <G key='title'>
        <Text style={styles.titleText} y={5} x={-60} alignmentBaseline='text-bottom'>
          {hours} h {minutes} m
        </Text>
        <Text
          key='subtitle'
          textAnchor='middle'
          alignmentBaseline='text-top' 
          y={16}
          fill="#a9a9a9"
          style={styles.subtitleText}>
          {this.props.title}
        </Text>
      </G>
    )

    return (
      <View style={styles.progressChart}>
        <ProgressCircle
          style={styles.progressCircle}
          progress={this.props.percentage}
          progressColor={fillColor}
          strokeWidth={12} >
          <TextGroup />
        </ProgressCircle>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  progressChart: {
    marginVertical: 30,
  },
  progressCircle: {
    height: 180,
  },
  titleText: {
    fontSize: 32,
    fontWeight: 'bold'
  },
  subtitleText: {
    fontSize: 18,
    fontWeight: '500'
  }
})

export default PregressChart;