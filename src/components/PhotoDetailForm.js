import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PhotoDetailForm = ({ uri, initialComment, updateComment, isChange }) => {
  const [comment, setComment] = useState(initialComment);
  const changed = (comment !== initialComment);

  useEffect(() => {
    isChange(changed);
    updateComment(uri, comment);
  }, [comment]);

  return (
    <>
      <Image source={{ uri: uri }} style={styles.image} resizeMode="contain" />
      <View style={styles.authContainer}>
        <Text style={styles.task}>WHO CAN SEE THIS</Text>
        <View style={styles.authContent}>
          <Ionicons style={styles.lockIcon} name='ios-lock' />
          <Text style={styles.auth}>Seen only by you and your admin</Text>
        </View>
      </View>
      <View style={styles.line}></View>
      <View style={styles.commentContainer}>
        <Text style={styles.task}>COMMENT</Text>
        <TextInput
          style={styles.comment}
          value={comment}
          placeholder='Enter comments'
          onChangeText={comment => setComment(comment)}
          multiline={true}
          autoFocus={true}
        />
      </View>
    </>
  );
};

PhotoDetailForm.defaultProps = {
  initialComment: ''
};

const styles = StyleSheet.create({
  lockIcon: {
    fontSize: 20,
    color: 'dimgray',
    marginRight: 15,
  },
  image: {
    height: 220,
    backgroundColor: '#000',
  },
  authContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  task: {
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

export default PhotoDetailForm;