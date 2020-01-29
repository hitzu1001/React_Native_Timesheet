import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Context } from '../context/BlogContext';
import { FontAwesome } from '@expo/vector-icons';

const ShowScreen = ({ navigation }) => {
  const { state, deleteBlogPost } = useContext(Context);

  useEffect(() => {
    const callDeleteFromNav = () => {
      deleteBlogPost(navigation.getParam('id'), () => {
        navigation.navigate("Timesheet");
      });
    };
    navigation.setParams({ callDeleteFromNav: callDeleteFromNav });
  }, [])

  const blogPost = state.find(
    blogPost => blogPost.id === navigation.getParam('id')
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{blogPost.title}</Text>
      <Text>{blogPost.notes}</Text>
    </View>
  );
};

ShowScreen.navigationOptions = ({ navigation }) => {
  // console.log(navigation.state.params)
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
        <TouchableOpacity onPress={() => {
          navigation.state.params.callDeleteFromNav()}}
        >
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