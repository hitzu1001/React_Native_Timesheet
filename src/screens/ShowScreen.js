import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Context } from '../context/BlogContext';
import Card from '../components/Card';
import { FontAwesome, Feather } from '@expo/vector-icons';

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
    <ScrollView>
      <Card title='START TIME' item={blogPost.startTime} />
      <Card title='END TIME' item={blogPost.endTime} />
      <Card title='TASK' item={blogPost.title} />
      <Card title='NOTES' item={blogPost.notes} />
      <View style={styles.subContainer}>
        <Text style={styles.containerTitle}>ATTACHMENTS</Text>
        <Text style={styles.containerItem}>None</Text>
      </View>
    </ScrollView>
  );
};

ShowScreen.navigationOptions = ({ navigation }) => {
  // console.log(navigation.state.params)
  return {
    title: 'blogPost.startTime',
    headerLeft: <TouchableOpacity onPress={() => navigation.pop()}>
      <Feather style={styles.backIcon} name='arrow-left' />
    </TouchableOpacity>,
    headerRight:
      <>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Edit', { id: navigation.getParam('id') })
          }
        >
          <FontAwesome style={styles.icon} name='pencil' />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          navigation.state.params.callDeleteFromNav()
        }}
        >
          <FontAwesome style={styles.icon} name='trash' />
        </TouchableOpacity>
      </>
  };
};


const styles = StyleSheet.create({
  subContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  containerTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  containerItem: {
    color: 'dimgray'
  },
  backIcon:{
    fontSize: 22,
    color: '#20b2aa',
    marginLeft: 20,
  },
  icon: {
    fontSize: 22,
    color: '#20b2aa',
    marginRight: 20,
  },
});
export default ShowScreen;