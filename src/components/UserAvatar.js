import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Context as UserContext } from '../context/AuthContext'


const UserAvatar = ({ firstName, lastName }) => {
  const { state } = useContext(UserContext);
  let title = 'AA';
  let username = 'first last';
  let type = 'photo';

  if (firstName) {
    title = (firstName[0] + lastName[0]);
    username = (`${firstName} ${lastName}`);
  } else {
    title = (state[0].firstName[0] + state[0].lastName[0]);
    username = (`${state[0].firstName} ${state[0].lastName}`)
  }

  (getUri(username) !== null) ? (type = 'photo') : (type = 'title');

  function getUri(username) {
    switch (username) {
      case 'Charlie Brown':
        return require('../../assets/images/CharlieBrown.png');
      case 'Lucy van Pelt':
        return require('../../assets/images/LucyvanPelt.png');
      case 'Sally Brown':
        return require('../../assets/images/SallyBrown.png');
      case 'Snoopy Peanuts':
        return require('../../assets/images/SnoopyPeanuts.png');
      default:
        return null;
    }
  }

  return (
    <>
      {type === 'photo'
        ? <Avatar
          rounded
          source={getUri(username)}
          imageProps={{resizeMode: 'contain'}}
          containerStyle={styles.containerStyle}
          titleStyle={{ fontSize: 14 }}
          onPress={() => console.log('hi')}
        />
        : <Avatar
          rounded title={title}
          containerStyle={styles.containerStyle}
          titleStyle={{ fontSize: 14 }}
          onPress={() => console.log('hi')}
        />
      }

    </>
  );
}
const styles = StyleSheet.create({
  containerStyle: {
    marginLeft: 20,
  },
});
export default UserAvatar;