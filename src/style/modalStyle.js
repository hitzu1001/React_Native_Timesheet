import { StyleSheet } from 'react-native';

const modalStyle = StyleSheet.create({
  screenHearder: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 12,
    paddingBottom: 7,
    borderBottomWidth: 1,
    borderColor: '#dcdcdc',
    // borderColor: 'red',
    // borderWidth: 2,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,

  },
  screenCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  screenLeft: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 50,
    backgroundColor: '#f3f3f3',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },

  shadowContainer8: {
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
    // borderColor: 'pink',
    // borderWidth: 2,
  },
  shadowContainer3: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
    backgroundColor: 'white',

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  shadowContainer1:
  {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#fff',
    borderRadius: 5,
    backgroundColor: 'white',

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  }

});

module.exports = modalStyle;