import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Context as BlogContext} from '../context/BlogContext';
import BlogPostForm from '../components/BlogPostForm';
import moment from 'moment';
import { Entypo } from '@expo/vector-icons';

const EditScreen = ({ navigation }) => {
  const id = navigation.getParam("id");
  const { state, editBlogPost } = useContext(BlogContext);
  const [change, setChange] = useState(false);
  const blogPost = state.find(blogPost => blogPost.id === id);

  useEffect(() => {
    navigation.setParams({ change });
  }, [change]);

  var startTime = new Date(moment(blogPost.startTime).format('LLLL'));
  var endTime = new Date(moment(blogPost.endTime).format('LLLL'));

  return (
    <BlogPostForm
      id={id}
      initialValues={{
        title: blogPost.title,
        notes: blogPost.notes,
        startTime: startTime,
        endTime: endTime,
        images: blogPost.images,
      }}
      onSubmit={(title, notes, startTime, endTime, images) => {
        editBlogPost(id, title, notes, startTime, endTime, images, () => {
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
      <Entypo style={styles.crossIcon} name='cross' />
    </TouchableOpacity>
  };
};

const styles = StyleSheet.create({
  crossIcon: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#20b2aa',
    marginHorizontal: 20,
  },
});

export default EditScreen;
