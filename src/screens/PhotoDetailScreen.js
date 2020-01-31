import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';

const PhotoDetailScreen = ({ navigation }) => {
  const [comment, setComment] = useState('');
  const uri = navigation.state.params.uri;

  useEffect(() => {
    navigation.setParams({ uri, comment, setComment });
  }, [comment]);

  return (
    <>
      <Image key={uri} source={{ uri: uri }} style={styles.image} resizeMode="contain" />
      <View style={styles.authContainer}>
        <Text style={styles.title}>WHO CAN SEE THIS</Text>
        <View style={styles.authContent}>
          <FontAwesome style={styles.lockIcon} name='lock' />
          <Text style={styles.auth}>Seen only by you and your admin</Text>
        </View>
      </View>
      <View style={styles.line}></View>
      <View style={styles.commentContainer}>
        <Text style={styles.title}>COMMENT</Text>
        <TextInput
          style={styles.comment}
          value={comment}
          onChangeText={comment => {
            setComment(comment);
            // navigation.state.params.setComment(comment);
          }}
          multiline={true}
          autoFocus={true}
        />
      </View>
    </>
  );
};

PhotoDetailScreen.navigationOptions = ({ navigation }) => {
  const { id, uri, deletePhoto, isNew, comment, setComment } = navigation.state.params;
  return {
    title: 'Photo details',
    headerLeft: <TouchableOpacity onPress={() => {
      (comment === '123') // fix this !!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 
        ? navigation.navigate('Edit', { id })
        : Alert.alert('Discard changes?', '',
          [
            {
              text: 'Keep Editing',
              style: 'cancel'
            },
            {
              text: 'Discard',
              onPress: () => {
                // setComment('comment in db');
                navigation.navigate('Edit', { id })
              }
            }
          ],
          { cancelable: false },
        )
    }}>
      <Entypo style={styles.crossIcon} name='cross' />
    </TouchableOpacity>,
    headerRight: <>
      <TouchableOpacity onPress={() =>
        navigation.navigate('Edit', { id })
      }>
        <FontAwesome style={styles.searchIcon} name='save' />
      </TouchableOpacity>
      {!isNew && <TouchableOpacity onPress={() => {
        deletePhoto(uri);
        navigation.navigate('Edit', { id });
      }}>
        <FontAwesome style={styles.searchIcon} name='trash' />
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
    fontSize: 24,
    color: '#20b2aa',
    marginLeft: 20,
  },
  searchIcon: {
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

export default PhotoDetailScreen;