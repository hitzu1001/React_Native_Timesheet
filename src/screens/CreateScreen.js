import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Context } from '../context/BlogContext';
import BlogPostForm from '../components/BlogPostForm';
import { Entypo } from '@expo/vector-icons';

const CreateScreen = ({ navigation }) => {
  const { addBlogPost } = useContext(Context);
  return <BlogPostForm onSubmit={(title, notes) => {
    addBlogPost(title, notes, () => {
      // ensure the page is navigated to Index after the post has been added
      navigation.navigate('Timesheet');
    });
  }} />
};

CreateScreen.navigationOptions = ({ navigation }) => {
  return {
    title: 'Add Timesheet',
    headerLeft: <TouchableOpacity onPress={() => navigation.navigate('Timesheet')}>
      <Entypo style={styles.crossIcon} name='cross' />
    </TouchableOpacity>
  };
};

const styles = StyleSheet.create({
  crossIcon: {
    fontSize: 24,
    color: '#20b2aa',
    marginLeft: 20,
  },
});

export default CreateScreen;

