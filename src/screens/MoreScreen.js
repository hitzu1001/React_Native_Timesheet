import React, { useContext, useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Context as AuthContext } from '../context/AuthContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const MoreScreen = ({ navigation }) => {
  const { signout } = useContext(AuthContext);
  const [fontLoaded, setfontLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      'lato-regular': require('../../assets/fonts/Lato-Regular.ttf'),
      'lato-bold': require('../../assets/fonts/Lato-Bold.ttf'),
      'lato-black': require('../../assets/fonts/Lato-Black.ttf'),
    }).then(() => {
      setfontLoaded(true);
    })
  }, [])

  return (
    <View style={styles.container}>
      {fontLoaded && <View>
        <TouchableOpacity style={styles.subContainer} >
          <MaterialCommunityIcons style={styles.icon} name='settings' />
          <Text style={styles.Text}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.subContainer}>
          <MaterialCommunityIcons style={styles.icon} name='timer-off' />
          <Text style={styles.Text}>Time Off</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.subContainer}>
          <MaterialCommunityIcons style={styles.icon} name='bell-outline' />
          <Text style={styles.Text}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.subContainer} onPress={signout}>
          <MaterialCommunityIcons style={styles.icon} name='logout' />
          <Text style={styles.Text}>Log out</Text>
        </TouchableOpacity>
        {/* <Button title='Modal Example' onPress={() => { navigation.navigate('ModalExample') }} /> */}
      </View>}
    </View >
  );
};

MoreScreen.navigationOptions = ({ navigation }) => {
  return {
    title: 'More',
    headerLeft: <Avatar rounded title="TS" containerStyle={styles.avatar} />,
  };
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  icon: {
    fontSize: 22,
    color: 'gray',
  },
  Text: {
    fontFamily: 'lato-regular',
    marginLeft: 30,
    fontSize: 15,
  },
  avatar: {
    marginLeft: 20
  }
});

export default MoreScreen;