import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Context } from '../context/BlogContext';
import BlogPostForm from '../components/BlogPostForm';
import { Feather } from '@expo/vector-icons';
import moment from 'moment';

const EditScreen = ({ navigation }) => {
  const id = navigation.getParam("id");
  const { state, editBlogPost } = useContext(Context);
  const [change, setChange] = useState(false);
  const blogPost = state.find(blogPost => blogPost._id === id);


  useEffect(() => {
    navigation.setParams({ change });
  }, [change]);

  var startTime = moment.utc(new Date()).local().format();
  var endTime = moment.utc(new Date()).local().format();

  return (
    <BlogPostForm
      id={id}
      initialValues={{
        title: blogPost.title,
        notes: blogPost.notes,
        startTime: blogPost.startTime,
        endTime: blogPost.endTime
      }}
      onSubmit={(title, notes, startTime, endTime) => {
        editBlogPost(id, title, notes, startTime, endTime, () => {
          navigation.pop();
          navigation.pop();
        });
      }}
      isChange={setChange}
      isCreate={false}
    />
  );
};

EditScreen.navigationOptions = ({ navigation }) => {
  return {
    title: 'Edit Timesheet',
    headerLeft: <TouchableOpacity onPress={() => {
      (navigation.state.params.change === true)
        ? Alert.alert('Discard changes?', '',
          [
            {
              text: 'Keep Editing',
              style: 'cancel'
            },
            {
              text: 'Discard',
              onPress: () => {
                navigation.pop();
              }
            }
          ],
          { cancelable: false },
        )
        : navigation.pop();
    }}>
      <Feather style={styles.backIcon} name='arrow-left' />
    </TouchableOpacity>
  };
};

const styles = StyleSheet.create({
  backIcon: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#20b2aa',
    marginLeft: 20,
  },
});

export default EditScreen;
