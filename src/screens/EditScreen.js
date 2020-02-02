import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Context as BlogContext } from '../context/BlogContext';
import BlogPostForm from '../components/BlogPostForm';
import moment from 'moment';
import { Entypo } from '@expo/vector-icons';
import iconStyle from '../style/iconStyle'

const EditScreen = ({ navigation }) => {
  const id = navigation.getParam("id");
  const { state, editBlogPost } = useContext(BlogContext);
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
        endTime: blogPost.endTime,
        images: blogPost.images,
      }}
      onSubmit={(title, notes, startTime, endTime, images) => {
        editBlogPost(id, title, notes, startTime, endTime, images, () => {
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
    headerLeft: <TouchableOpacity
      style={iconStyle.iconTouchLeft}
      onPress={() => {
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
      <Entypo style={iconStyle.crossIcon} name='cross' />
    </TouchableOpacity>
  };
};

const styles = StyleSheet.create({

});

export default EditScreen;
