import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const MoreScreen = () => {
  const { signout } = useContext(AuthContext);

  return (
    <SafeAreaView>
      <Text style={styles.header}>MoreScreen</Text>
      <Spacer>
        <TouchableOpacity style={styles.logoutContainer} onPress={signout}>
          {/* <MaterialCommunityIcons name='logout' size={30} color='gray' /> */}
          <MaterialCommunityIcons style={styles.logoutIcon} name='logout' />
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </Spacer>
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
  },
  logoutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutIcon: {
    fontSize: 30,
    color: 'gray',
    alignSelf: 'center'
  },
  logoutText: {
    margin: 20,
    fontSize: 18,
    alignSelf: 'center'
  }
});

export default MoreScreen;