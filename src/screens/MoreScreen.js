import React, { useContext } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Context as AuthContext } from '../context/AuthContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'


const MoreScreen = () => {
  const { signout } = useContext(AuthContext);

  return (
    <SafeAreaView>
      <Text style={styles.header}>MoreScreen</Text>
        <TouchableOpacity style={styles.Container}>
          <FontAwesome style={styles.Icon} name='gear' />
          <Text style={styles.Text}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Container}>
          <MaterialCommunityIcons style={styles.Icon} name='timer-off' />
          <Text style={styles.Text}>Time Off</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Container}>
          <MaterialCommunityIcons style={styles.Icon} name='bell-outline' />
          <Text style={styles.Text}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Container} onPress={signout}>
          <MaterialCommunityIcons style={styles.Icon} name='logout' />
          <Text style={styles.Text}>Log out</Text>
        </TouchableOpacity>


    </SafeAreaView>
  );
};

MoreScreen.navigationOptions = {
  title: 'More',
  tabBarIcon: <MaterialCommunityIcons name='dots-horizontal' size={22} color='gray' />
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: 'lightgray',
    marginBottom: 20
  },
  Container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginBottom: 40
  },
  Icon: {
    fontSize: 20,
    color: 'gray',
  },
  Text: {
    marginLeft: 20,
    fontSize: 16,
  }
});

export default MoreScreen;