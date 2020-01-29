import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Context } from '../context/BlogContext';
import { FontAwesome } from '@expo/vector-icons';

const ShowScreen = ({ navigation }) => {
  const { state, deleteBlogPost } = useContext(Context);

  const callDeleteFromNav = () => {
    deleteBlogPost('6');
  };
  navigation.setParams(callDeleteFromNav);

  console.log(navigation.params);

  const blogPost = state.find(
    blogPost => blogPost.id === navigation.getParam('id')
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{blogPost.title}</Text>
      <Text>{blogPost.content}</Text>
    </View>
  );
};

ShowScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight:
      <>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Edit', { id: navigation.getParam('id') })
          }
        >
          <FontAwesome style={styles.editIcon} name='pencil' />
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => navigation.state.params.callDeleteFromNav()}> */}
        <TouchableOpacity onPress={() => {}}>
          <FontAwesome style={styles.deleteIcon} name='trash' />
        </TouchableOpacity>
      </>
  };
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
    marginVertical: 20,
  },
  title: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  editIcon: {
    fontSize: 24,
    marginRight: 20,
  },
  deleteIcon: {
    fontSize: 24,
    marginRight: 20,
  },
});
export default ShowScreen;

