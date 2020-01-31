import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Context as AuthContext } from '../context/AuthContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'


const MoreScreen = () => {
  const { signout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.subContainer}>
        <FontAwesome style={styles.Icon} name='gear' />
        <Text style={styles.Text}>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.subContainer}>
        <MaterialCommunityIcons style={styles.Icon} name='timer-off' />
        <Text style={styles.Text}>Time Off</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.subContainer}>
        <MaterialCommunityIcons style={styles.Icon} name='bell-outline' />
        <Text style={styles.Text}>Notifications</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.subContainer} onPress={signout}>
        <MaterialCommunityIcons style={styles.Icon} name='logout' />
        <Text style={styles.Text}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

MoreScreen.navigationOptions = ({ navigation }) => {
  return {
    title: 'More',
    headerLeft: <Avatar rounded title="TS" containerStyle={styles.avatar} />,
  };
};

const styles = StyleSheet.create({
  container:{
    margin: 20,    
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  Icon: {
    fontSize: 22,
    color: 'gray',
  },
  Text: {
    marginLeft: 30,
    fontSize: 15,
  },
  avatar: {
    marginLeft: 20
  }
});

export default MoreScreen;