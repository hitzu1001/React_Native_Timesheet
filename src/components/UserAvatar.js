import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';

const UserAvatar = () => {
  const [username, setUsername] = useState('TS')

  return (
      <Avatar
      rounded title={username}
      containerStyle={styles.containerStyle}
      titleStyle={{ fontSize: 14 }}
    />
  );
}
const styles = StyleSheet.create({
  containerStyle: {
    marginLeft: 20,
  },
});
export default UserAvatar;