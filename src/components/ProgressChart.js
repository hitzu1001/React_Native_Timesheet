import React from 'react'
import { Text, G } from 'react-native-svg'
import { ProgressCircle } from 'react-native-svg-charts'

class PregressChart extends React.PureComponent {
  render() {
    const TextGroup = () => (
      <G key='title'>
        <Text textAnchor='middle' alignmentBaseline='text-bottom' fontSize='42' fontWeight='bold' y={10}>
          60%
            </Text>
        <Text key='subtitle' textAnchor='middle' alignmentBaseline='text-top' y={10} fontSize='18'>
          of 40hrs
            </Text>
      </G>
    )

    return (
      <ProgressCircle style={{ height: 200 }} progress={0.2} progressColor={'rgb(134, 65, 244)'} strokeWidth={15} >
        <TextGroup />
      </ProgressCircle>
    )
  }
}

export default PregressChart