import React from 'react'
import { View } from 'react-native'
import { BarChart, Grid, YAxis } from 'react-native-svg-charts'
import { Defs, LinearGradient, Stop, Text } from 'react-native-svg'
import * as scale from 'd3-scale'

class BarComponent extends React.PureComponent {
    render() {
        const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)
        const data = [
            {
                value: 50,
                label: 'task1',
            },
            {
                value: 10,
                label: 'task2',
                svg: {
                    // fill: 'rgba(134, 65, 244, 0.5)',
                    fill: randomColor()
                },
            },
            {
                value: 95,
                label: 'task3',
                svg: {
                    fill: 'url(#gradient)',
                },
            },
            {
                value: 85,
                label: 'task4',
                svg: {
                    fill: 'green',
                },
            },
        ]

        const Gradient = () => (
            <Defs key={'gradient'}>
                <LinearGradient id={'gradient'} x1={'0'} y={'0%'} x2={'100%'} y2={'0%'}>
                    <Stop offset={'0%'} stopColor={randomColor()} />
                    <Stop offset={'100%'} stopColor={randomColor()} />
                </LinearGradient>
            </Defs>
        )

        const CUT_OFF = 50
        const Labels = ({ x, y, bandwidth, data }) =>
            data.map((item, index) => (
                <Text
                    key={item.label}
                    x={item.value > CUT_OFF ? x(0) + 10 : x(item.value) + 10}
                    y={y(index) + bandwidth / 2}
                    fontSize={14}
                    fill={item.value > CUT_OFF ? 'white' : 'black'}
                    alignmentBaseline={'middle'}

                >
                    5 hrs 40 mins
                </Text>
            ))

        return (
            <View style={{ flexDirection: 'row', height: 200, paddingVertical: 16 }}>
                <YAxis
                    data={data}
                    yAccessor={({ index }) => index}
                    scale={scale.scaleBand}
                    contentInset={{ top: 10, bottom: 10 }}
                    spacingInner={0.2}
                    formatLabel={(_, index) => data[index].label}
                />
                <BarChart
                    style={{ flex: 0.85, marginLeft: 8 }}
                    data={data}
                    horizontal={true}
                    yAccessor={({ item }) => item.value}
                    svg={{
                        fill: 'blue',
                        fillOpacity:0.5
                    }}
                    contentInset={{ top: 10, bottom: 10 }}
                    spacingInner={0.2}
                    gridMin={0}
                >
                    {/* <Grid direction={Grid.Direction.VERTICAL} /> */}
                    <Gradient />
                    <Labels />
                </BarChart>
            </View>
        )
    }
}

export default BarComponent