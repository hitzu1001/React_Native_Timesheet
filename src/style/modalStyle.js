import { StyleSheet } from 'react-native';

const modalStyle = StyleSheet.create({
  screenHearder: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 15,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: '#dcdcdc',
    // borderColor: 'red',
    // borderWidth: 2,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    
  },
  screenCenter: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  screenLeft: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 30,
    backgroundColor: '#f3f3f3',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },

  shadowContainer8: {
    borderWidth: 1,
    borderRadius: 12,
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
    // borderColor: 'pink',
    // borderWidth: 2,
  },
  shadowContainer3: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#fff',
    borderRadius: 5,
    backgroundColor: 'white',
    
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  }

});

//https://ethercreative.github.io/react-native-shadow-generator/
module.exports = modalStyle;