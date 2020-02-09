import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { ButtonGroup } from 'react-native-elements';

const ViewSelector = ({ buttons, setView, src }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <View style={{
      ...styles.buttonGroup,
      borderBottomColor: src === 'timesheets' ? '#dcdcdc' : '#fff',
      borderWidth: src === 'timesheets' ? 1 : 0,
      marginBottom: src === 'timesheets' ? 0 : -15,
      backgroundColor: src === 'overview' ? null : '#fff',
    }}>
      <ButtonGroup
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
    borderColor: '#fff',
  },
  containerStyle: {
    alignSelf: 'center',
    width: 220,
    height: 30,
    borderRadius: 6,
    backgroundColor: '#e3e3e3',
  },
  textStyle: {
    color: '#444',
    fontSize: 12,
    // fontWeight: '400',
  },
  innerBorderStyle: {
    width: 0,
  },
  selectedTextStyle: {
    color: '#444',
    fontWeight: '600',
  },
  selectedButtonStyle: {
    margin: 1.5,
    backgroundColor: '#fff',
    borderRadius: 4,
  }
});

export default ViewSelector;