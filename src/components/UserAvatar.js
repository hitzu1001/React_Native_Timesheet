import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, AsyncStorage } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Context as UserContext } from '../context/AuthContext'


const UserAvatar = ({firstName, lastName}) => {
  const { state, getUser } = useContext(UserContext);
  const [username, setUserName] = useState("AA")

  useEffect(() => {
    state[0] && setUserName(state[0].firstName[0] + state[0].lastName[0])
    firstName && setUserName(firstName[0] + lastName[0])
  }, [])

  return (
    <Avatar
      rounded title={username}
      containerStyle={styles.containerStyle}
      titleStyle={{ fontSize: 14 }}
      onPress={() => console.log("hi")}
    />
  );
}
const styles = StyleSheet.create({
  containerStyle: {
    marginLeft: 20,
  },
});
export default UserAvatar;