import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { ButtonGroup } from 'react-native-elements';

const ButtonSelector = ({ buttons, setOption }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <View style={styles.buttonGroup}>
      <ButtonGroup
        buttons={buttons}
        selectedIndex={selectedIndex}
        onPress={i => {
          setSelectedIndex(i);
          setOption(i);
        }}
        containerStyle={{ ...styles.containerStyle, height: 40, }}
        textStyle={styles.textStyle}
        // buttonStyle={styles.buttonStyle}
        innerBorderStyle={styles.innerBorderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        selectedButtonStyle={styles.selectedButtonStyle}
      />
    </View>
  )

}

const styles = StyleSheet.create({
  buttonGroup: {
    marginTop: -6,
    marginHorizontal: -11,
  },
  containerStyle: {
    flex: 1,
    borderWidth: 0,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  textStyle: {
    color: '#a9a9a9',
    fontSize: 12,
    fontWeight: '500',
  },
  // buttonStyle: {
  //   backgroundColor: 'blue',
  //   borderColor: '#ff0000',
  //   borderWidth: 0.5,
  // },
  innerBorderStyle: {
    width: 0,
  },
  selectedTextStyle: {
    color: '#20b2aa',
  },
  selectedButtonStyle: {
    backgroundColor: '#fff',
    borderBottomWidth: 2,
    borderBottomColor: '#20b2aa',
  }
});

export default ButtonSelector;