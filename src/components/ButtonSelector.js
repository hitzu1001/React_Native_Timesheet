import React, { useState } from 'react'
import { ButtonGroup } from 'react-native-elements';
import { StyleSheet } from 'react-native'

const ButtonSelector = ({ setOption }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const buttons = ['DAY TOTAL', 'WEEK TOTAL']

  return (
    <ButtonGroup
      // title="Clear button"
      buttons={buttons}
      selectedIndex={selectedIndex}
      onPress={i => {
        setSelectedIndex(i);
        setOption(i);
      }}
      containerStyle={styles.containerStyle}
      textStyle={styles.textStyle}
      buttonStyle={styles.buttonStyle}
      innerBorderStyle={styles.innerBorderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      selectedButtonStyle={styles.selectedButtonStyle}
    />
  )

}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#fff',
  },
  textStyle: {
    color: '#a9a9a9',
    fontSize: 12,
    fontWeight: '500',
  },
  buttonStyle: {
    // title: "Clear button",
    borderColor: 'white',
    backgroundColor: '#fff',
  },
  innerBorderStyle: {
    width: 0,
  },
  selectedTextStyle: {
    // fontSize: 12,
    color: '#20b2aa',
  },
  selectedButtonStyle: {
    backgroundColor: '#fff',
    borderBottomWidth: 2,
    borderBottomColor: '#20b2aa',
  }
});

export default ButtonSelector;