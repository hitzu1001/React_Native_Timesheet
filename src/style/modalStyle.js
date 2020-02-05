import { StyleSheet } from 'react-native';

const modalStyle = StyleSheet.create({
  screenCenter: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  container: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,
    elevation: 17,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    // borderColor: 'pink',
    // borderWidth: 2,
  },
});
module.exports = modalStyle;