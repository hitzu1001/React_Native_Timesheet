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
  const { setImages } = useContext(ImageContext)

  const id = navigation.getParam("id");
  const blogPost = state.find(blogPost => blogPost._id === id);
  const imageState = blogPost.images;
  const imgChange = (blogPost.images !== imageState);
  const [change, setChange] = useState(imgChange);

  useEffect(() => {
    navigation.setParams({ change, imgChange });
    // setImages(state.images)
  }, [change, imgChange, blogPost]);

  // var startTime = moment
  //   .utc(new Date())
  //   .local()
  //   .format();

  // var endTime = moment
  //   .utc(new Date())
  //   .local()
  //   .format();

  return (
    <BlogPostForm
      id={id}
      initialValues={{
        startTime: blogPost.startTime,
        endTime: blogPost.endTime,
        task: blogPost.task,
        notes: blogPost.notes,
        images: blogPost.images
      }}
      onSubmit={(startTime, endTime, task, notes, images) => {
        editBlogPost(id, startTime, endTime, task, notes, images, false, () => {
          navigation.pop();
        });
        setImages(images)
      }}
      isChange={setChange}
      isCreate={false}
    />

  );
};

EditScreen.navigationOptions = ({ navigation }) => {
  const { change, imgChange } = navigation.state.params;
  return {
    title: 'Edit Timesheet',
    headerLeft: <TouchableOpacity
      style={iconStyle.iconTouchLeft}
      onPress={() => {
        (change || imgChange)
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
