import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import UserAvatar from '../components/UserAvatar';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as UserContext } from '../context/AuthContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import containerStyle from '../style/containerStyle';

const MoreScreen = ({ navigation }) => {
  const { signout } = useContext(AuthContext);
  const { state: user } = useContext(UserContext);
  const [userRole, setUserRole] = useState('Employee');

  useEffect(() => {
    Array.isArray(user) && setUserRole(user[0].role)
  }, [])

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity style={styles.subContainer} >
          <MaterialCommunityIcons style={styles.icon} name='settings' />
          <Text style={styles.Text}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.subContainer}
          onPress={() => navigation.navigate('TimeOff')}
        >
          <MaterialCommunityIcons style={styles.icon} name='timer-off' />
          <Text style={styles.Text}>Time Off</Text>
        </TouchableOpacity>

        {userRole === "Manager" &&
          <TouchableOpacity
            style={styles.subContainer}
            onPress={() => navigation.navigate('TaskList')}
          >
            <MaterialCommunityIcons style={styles.icon} name='playlist-plus' />
            <Text style={styles.Text}>Manage Tasks</Text>
          </TouchableOpacity>
        }

        <TouchableOpacity style={styles.subContainer}>
          <MaterialCommunityIcons style={styles.icon} name='bell-outline' />
          <Text style={styles.Text}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.subContainer} onPress={signout}>
          <MaterialCommunityIcons style={styles.icon} name='logout' />
          <Text style={styles.Text}>Log out</Text>
        </TouchableOpacity>
      </View>
    </View >
  );
};

MoreScreen.navigationOptions = () => {
  return {
    title: 'More',
    headerLeft: <UserAvatar />,
  };
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 30,
    marginHorizontal: 30,
  },
  subContainer: {
    ...containerStyle.rowNullCenter,
    marginBottom: 40,
  },
  icon: {
    fontSize: 22,
    color: '#999',
  },
  Text: {
    marginLeft: 30,
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },
});

export default MoreScreen;