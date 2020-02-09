import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { ProgressCircle } from 'react-native-svg-charts'

class PregressChart extends React.PureComponent {
  render() {
    let fillColor = '#20b2aa'
    let time = 0
    if (this.props.percentage > 1) {
      fillColor = '#ff0000'
    }
    if (this.props.title === 'of 8 hrs') {
      time = Number((this.props.percentage * 480).toFixed(0))
    } else {
      time = Number((this.props.percentage * 2400).toFixed(0))
    }
    var hours = (time - (time % 60)) / 60;
    var minutes = time % 60;

    return (
      <View style={styles.progressChart}>
        <ProgressCircle
          style={styles.progressCircle}
          progress={this.props.percentage}
          progressColor={fillColor}
          strokeWidth={12} >
        </ProgressCircle>
        <View style={{ marginTop: -115, marginBottom: 80, }}>
          <Text style={styles.titleText}>{hours} h {minutes} m</Text>
          <Text style={styles.subtitleText}>{this.props.title}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  progressChart: {
    marginTop: 30,
  },
  progressCircle: {
    height: 180,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitleText: {
    marginTop: 10,
    fontWeight: '500',
    color: '#a9a9a9',
    textAlign: 'center',
  }
})

export default PregressChart;