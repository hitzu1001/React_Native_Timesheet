import { StyleSheet } from 'react-native';

const iconStyle = StyleSheet.create({
  iconTouchLeft: {
    marginLeft: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconTouchRight: {
    marginLeft: -10,
    marginRight: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  crossIcon: {
    fontSize: 22,
    color: "#20b2aa",
  },
  backIcon: {
    fontSize: 22,
    color: '#20b2aa',
  },
  forwardIcon: {
    fontSize: 32,
    color: '#20b2aa',
    marginHorizontal: 25,
    marginTop: 5,
  },
  saveIcon: {
    fontSize: 22,
    color: '#20b2aa',
  },
  trashIcon: {
    fontSize: 22,
    color: '#20b2aa',
  },
  editIcon: {
    fontSize: 20,
    color: '#20b2aa',
    marginBottom: 4,
  },
  searchIcon: {
    fontSize: 22,
    color: '#20b2aa',
  },
  lockIcon: {
    fontSize: 20,
    color: '#696969',
    marginRight: 10,
  },
  cafeIcon: {
    fontSize: 17,
    color: '#20b2aa',
    marginTop: 1,
    marginHorizontal: 5,
  },
  scheduleIcon:{
    fontSize: 20,
    color: '#999',
    marginRight: 15,
  },
  signIcon: {
    fontSize: 56,
    color: '#617be3',
    transform: [{ rotate: '-10 deg' }],
    marginRight: 5,
    marginTop: 5,
  },
  eyeIcon: {
    fontSize: 22,
    color: '#20b2aa',
    marginTop: 5,
  },
  arrowDownIcon: {
    fontSize: 22,
    color: '#20b2aa',
    bottom: 2,
  },
  auditIcon:{
    fontSize: 20,
    color: '#fff',
    marginRight: 10,
  },
});

module.exports = iconStyle;
