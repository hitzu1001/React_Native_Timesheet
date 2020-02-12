import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Context as BlogContext } from '../context/BlogContext';
import { Context as ImageContext } from '../context/ImageContext';
import BlogPostForm from '../components/BlogPostForm';
import moment from 'moment';
import { Entypo } from '@expo/vector-icons';
import iconStyle from '../style/iconStyle'

const EditScreen = ({ navigation }) => {
  const { state, editBlogPost } = useContext(BlogContext);
  const { state: imgState, setImages } = useContext(ImageContext)
  const id = navigation.getParam("id");
  const blogPost = state.find(blogPost => blogPost._id === id);
  const [change, setChange] = useState(false);

  useEffect(() => {
    setImages(blogPost.images);
  }, []);

  useEffect(() => {
    navigation.setParams({ change });
    console.log('EditScreen change: ' + change);
  }, [change, blogPost]);

  return (
    <BlogPostForm
      id={id}
      initialValues={{
        startTime: blogPost.startTime,
        endTime: blogPost.endTime,
        task: blogPost.task,
        notes: blogPost.notes,
        images: blogPost.images,
        status: blogPost.status
      }}
      onSubmit={(startTime, endTime, task, notes, images, status) => {
        editBlogPost(id, startTime, endTime, task, notes, images, status, () => {
          navigation.pop();
        });
      }}
      isChange={change => setChange(change)}
      isCreate={false}
    />

  );
};

EditScreen.navigationOptions = ({ navigation }) => {
  const { change } = navigation.state.params;
  return {
    title: 'Edit Timesheet',
    headerLeft: <TouchableOpacity
      style={iconStyle.iconTouchLeft}
      onPress={() => {
        (change)
          ? Alert.alert('Discard changes?', '',
            [
              { text: 'Keep Editing', style: 'cancel' },
              { text: 'Discard', onPress: () => { navigation.pop(); } }
            ],
            { cancelable: false },
          )
          : navigation.pop();
      }}
    >
      <Entypo style={iconStyle.crossIcon} name='cross' />
    </TouchableOpacity>
  };
};

const styles = StyleSheet.create({
});

export default EditScreen;
