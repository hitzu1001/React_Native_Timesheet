import { StyleSheet } from 'react-native';

const containerStyle = StyleSheet.create({
  rowCenterCenter: {
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  rowFENull: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  rowFECenter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center', 
  },
  rowSANull: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  rowSBNull: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowSBCenter: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
  },
  rowNullCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});

module.exports = containerStyle;