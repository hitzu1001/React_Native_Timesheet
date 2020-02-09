import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { ButtonGroup } from 'react-native-elements';

const ViewSelector = ({ setView }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const buttons = ['My Timesheet', 'Full Timesheet'];

  return (
    <View style={styles.buttonGroup}>
      <ButtonGroup
        // title="Clear button"
        buttons={buttons}
        selectedIndex={selectedIndex}
        onPress={i => {
          setSelectedIndex(i);
          i === 0 ? setView(true) : setView(false);
        }}
        containerStyle={styles.containerStyle}
        textStyle={styles.textStyle}
        innerBorderStyle={styles.innerBorderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        selectedButtonStyle={styles.selectedButtonStyle}
      />
    </View>
  )

}

const styles = StyleSheet.create({
  buttonGroup: {
    paddingVertical: 5,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
  },
  containerStyle: {
    alignSelf: 'center',
    width: 220,
    height: 30,
    borderRadius: 8,
    backgroundColor: '#e3e3e3',
  },
  textStyle: {
    color: '#000',
    fontSize: 12,
  },
  innerBorderStyle: {
    width: 0,
  },
  selectedTextStyle: {
    color: '#000',
    fontWeight: '600',
  },
  selectedButtonStyle: {
    margin: 1.5,
    backgroundColor: '#fff',
    borderRadius: 6, 
  }
});

export default ViewSelector;