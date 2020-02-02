import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Entypo, Ionicons } from '@expo/vector-icons';
import PhotoDetailForm from '../components/PhotoDetailForm';

const PhotoEditScreen = ({ navigation }) => {
  const [change, setChange] = useState(false);

  const { uri, images, updateComment } = navigation.state.params;
  const photo = images.filter(i => i.uri === uri);

  useEffect(() => {
    navigation.setParams({ change });
  }, [change]);

  return (
    <PhotoDetailForm
      uri={photo[0].uri}
      initialComment={photo[0].comment}
      updateComment={(uri, newComment) => updateComment(uri, newComment)}
      isChange={setChange}
    />
  );
};

PhotoEditScreen.navigationOptions = ({ navigation }) => {
  const { id, uri, deletePhoto, initialComment, updateComment, isNew, change } = navigation.state.params;
  return {
    title: 'Photo details',
    headerLeft: <TouchableOpacity onPress={() => {
      if (isNew && change) {
        Alert.alert('Discard changes?', '',
          [
            { text: 'Keep Editing', style: 'cancel' },
            {
              text: 'Discard', onPress: () => {
                deletePhoto(uri);
                navigation.navigate('Edit', { id })
              }
            }
          ],
          { cancelable: false },
        )
      } else if (isNew) {
        deletePhoto(uri);
        navigation.navigate('Edit', { id })
      } else if (change) {
        Alert.alert('Discard changes?', '',
          [
            { text: 'Keep Editing', style: 'cancel' },
            {
              text: 'Discard',
              onPress: () => {
                updateComment(uri, initialComment);
                navigation.navigate('Edit', { id })
              }
            }
          ],
          { cancelable: false },
        )
      } else {
        navigation.navigate('Edit', { id })
      }
    }}>
      <Entypo style={styles.crossIcon} name='cross' />
    </TouchableOpacity>,
    headerRight: <>
      <TouchableOpacity onPress={() =>
        navigation.navigate('Edit', { id })
      }>
        <Ionicons style={styles.saveIcon} name='ios-save' />
      </TouchableOpacity>
      {!isNew && <TouchableOpacity onPress={() => {
        deletePhoto(uri);
        navigation.navigate('Edit', { id });
      }}>
        <Ionicons style={styles.saveIcon} name='ios-trash' />
      </TouchableOpacity>}
    </>,
  };
};

const styles = StyleSheet.create({
  lockIcon: {
    fontSize: 20,
    color: 'dimgray',
    marginRight: 15,
  },
  crossIcon: {
    fontSize: 26,
    color: '#20b2aa',
    marginHorizontal: 20,
  },
  saveIcon: {
    fontSize: 20,
    color: '#20b2aa',
    marginRight: 20,
  },
  image: {
    height: 220,
    backgroundColor: '#000',
  },
  authContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  authContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  auth: {
    color: 'dimgray'
  },
  commentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    height: 100,
  },
  comment: {
    fontSize: 15,
  },
  line: {
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  }
});

export default PhotoEditScreen;