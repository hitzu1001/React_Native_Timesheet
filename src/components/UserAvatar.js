import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, AsyncStorage } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Context as UserContext } from '../context/AuthContext'


const UserAvatar = () => {
  const { state, getUser } = useContext(UserContext);
  const [username, setUserName] = useState("AA")
  // console.log("in avatar " + state[0] + state[1])
  useEffect(() => {
    state[0] && setUserName(state[0].firstName[0] + state[0].lastName[0])
  }, [state])

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